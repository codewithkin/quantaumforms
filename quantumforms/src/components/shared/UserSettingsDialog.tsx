"use client";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { updateProfile, updateAccountSettings } from "@/lib/actions";
import Image from "next/image";
import { ImageUpload } from "@/components/shared/ImageUpload";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  User,
  Settings,
  CreditCard,
  Mail,
  MapPin,
  Link as LinkIcon,
  Bell,
  Shield,
  Globe,
  Loader2,
} from "lucide-react";

interface UserSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TABS = [
  {
    id: "profile",
    label: "Profile",
    icon: User,
  },
  {
    id: "billing",
    label: "Billing",
    icon: CreditCard,
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
  },
] as const;

export const UserSettingsDialog = ({
  open,
  onOpenChange,
}: UserSettingsDialogProps) => {
  const { data: session, update } = useSession();
  const [activeTab, setActiveTab] =
    useState<(typeof TABS)[number]["id"]>("profile");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    image: session?.user?.image || "",
    username: session?.user?.username || "",
    bio: session?.user?.bio || "",
    location: session?.user?.location || "",
    website: session?.user?.website || "",
  });

  const [settings, setSettings] = useState({
    emailNotifications: true,
    marketingEmails: false,
    twoFactorAuth: false,
  });

  const handleProfileUpdate = async () => {
    try {
      setIsSubmitting(true);
      await updateProfile(formData);
      await update(formData);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSettingChange = async (key: string, value: boolean) => {
    try {
      await updateAccountSettings({ [key]: value });
      setSettings((prev) => ({ ...prev, [key]: value }));
      toast.success("Settings updated successfully");
    } catch (error) {
      toast.error("Failed to update settings");
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt="Profile"
                  width={80}
                  height={80}
                  className="rounded-full"
                />
              ) : null}
              <ImageUpload
                onUpload={(url) => setFormData({ ...formData, image: url })}
              />
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Username</Label>
                <Input
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className="border-gray-200"
                />
              </div>

              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="border-gray-200"
                />
              </div>

              <div className="space-y-2">
                <Label>Bio</Label>
                <Textarea
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  className="border-gray-200"
                  placeholder="Tell us about yourself"
                />
              </div>

              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="border-gray-200"
                  placeholder="City, Country"
                />
              </div>

              <div className="space-y-2">
                <Label>Website</Label>
                <Input
                  value={formData.website}
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
                  }
                  className="border-gray-200"
                  placeholder="https://example.com"
                />
              </div>

              <Button
                onClick={handleProfileUpdate}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </div>
          </div>
        );

      case "billing":
        return (
          <div className="space-y-6">
            <div className="rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Free Plan</h3>
                  <p className="text-sm text-gray-500">Current Plan</p>
                </div>
                <Badge variant="secondary">Free</Badge>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Available Plans</h3>

              <div className="rounded-lg border border-gray-200 p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Starter</h4>
                    <p className="text-sm text-gray-500">
                      Perfect for small teams
                    </p>
                  </div>
                  <Button variant="outline">$10/month</Button>
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Ultimate</h4>
                    <p className="text-sm text-gray-500">
                      For larger organizations
                    </p>
                  </div>
                  <Button variant="outline">$29/month</Button>
                </div>
              </div>
            </div>
          </div>
        );

      case "settings":
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-gray-500">
                    Receive notifications about your form responses
                  </p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) =>
                    handleSettingChange("emailNotifications", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Marketing Emails</Label>
                  <p className="text-sm text-gray-500">
                    Receive updates about new features
                  </p>
                </div>
                <Switch
                  checked={settings.marketingEmails}
                  onCheckedChange={(checked) =>
                    handleSettingChange("marketingEmails", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-500">
                    Add an extra layer of security
                  </p>
                </div>
                <Switch
                  checked={settings.twoFactorAuth}
                  onCheckedChange={(checked) =>
                    handleSettingChange("twoFactorAuth", checked)
                  }
                />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden">
        <DialogTitle className="sr-only">User Settings</DialogTitle>
        <div className="grid grid-cols-[220px,1fr]">
          {/* Sidebar */}
          <div className="border-r border-gray-100 p-6 space-y-2 bg-gray-50/50">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={cn(
                  "flex items-center gap-2 w-full px-4 py-2 rounded-md text-sm transition-colors",
                  activeTab === id
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-6">
              {TABS.find((tab) => tab.id === activeTab)?.label}
            </h2>
            {renderContent()}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
