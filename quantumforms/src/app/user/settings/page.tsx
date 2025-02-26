"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { updateAccountSettings } from "@/lib/actions";
import { useSession } from "next-auth/react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default function AccountSettings() {
  const { data: session } = useSession();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    marketingEmails: false,
    twoFactorAuth: false,
    theme: "light",
    language: "en",
    timezone: "UTC",
  });

  const handleSettingChange = async (key: string, value: boolean | string) => {
    try {
      await updateAccountSettings({ [key]: value });
      setSettings(prev => ({ ...prev, [key]: value }));
      toast.success("Settings updated successfully");
    } catch (error) {
      toast.error("Failed to update settings");
    }
  };

  const getPlanBadgeColor = (plan: string) => {
    switch (plan) {
      case "ULTIMATE":
        return "bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0";
      case "STARTER":
        return "bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0";
      default:
        return "bg-gray-100 text-gray-900";
    }
  };

  return (
    <div className="container max-w-2xl py-10 space-y-6">
      {/* Subscription Info */}
      <Card className="bg-white border-gray-100">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900">Subscription</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-gray-900">Current Plan</h3>
                <Badge className={getPlanBadgeColor(session?.user?.plan || "FREE")}>
                  {session?.user?.plan || "FREE"}
                </Badge>
              </div>
              {session?.user?.planExpiresAt && (
                <p className="text-sm text-gray-500">
                  Expires: {format(new Date(session.user.planExpiresAt), "PP")}
                </p>
              )}
            </div>
            <Button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              Upgrade Plan
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Account Settings */}
      <Card className="bg-white border-gray-100">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900">Account Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-gray-900">Email Notifications</Label>
                <p className="text-sm text-gray-500">
                  Receive notifications about your form responses
                </p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-gray-900">Marketing Emails</Label>
                <p className="text-sm text-gray-500">
                  Receive updates about new features and announcements
                </p>
              </div>
              <Switch
                checked={settings.marketingEmails}
                onCheckedChange={(checked) => handleSettingChange('marketingEmails', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-gray-900">Two-Factor Authentication</Label>
                <p className="text-sm text-gray-500">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Switch
                checked={settings.twoFactorAuth}
                onCheckedChange={(checked) => handleSettingChange('twoFactorAuth', checked)}
              />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <Button 
              variant="destructive"
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 