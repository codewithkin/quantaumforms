"use client";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { updateProfile } from "@/lib/actions";
import Image from "next/image";
import { ImageUpload } from "@/components/shared/ImageUpload";

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    image: session?.user?.image || "",
    username: session?.user?.username || "",
    bio: session?.user?.bio || "",
    location: session?.user?.location || "",
    website: session?.user?.website || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      await update(formData);
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="container max-w-2xl py-10">
      <Card className="bg-white border-gray-100">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900">Profile Settings</CardTitle>
        </CardHeader>
        <CardContent>
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
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-2xl text-gray-500">
                    {session?.user?.name?.[0]?.toUpperCase()}
                  </span>
                </div>
              )}
              {isEditing && (
                <ImageUpload
                  onUpload={(url) => setFormData({ ...formData, image: url })}
                />
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-gray-700">Username</Label>
                <Input
                  disabled={!isEditing}
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="border-gray-200"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700">Name</Label>
                <Input
                  disabled={!isEditing}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="border-gray-200"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700">Email</Label>
                <Input
                  disabled={!isEditing}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="border-gray-200"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700">Bio</Label>
                <Textarea
                  disabled={!isEditing}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="border-gray-200"
                  placeholder="Tell us about yourself"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700">Location</Label>
                <Input
                  disabled={!isEditing}
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="border-gray-200"
                  placeholder="City, Country"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700">Website</Label>
                <Input
                  disabled={!isEditing}
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="border-gray-200"
                  placeholder="https://example.com"
                />
              </div>

              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <Button 
                      type="submit"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    >
                      Save Changes
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline"
                      className="border-gray-200 text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button 
                    type="button"
                    variant="outline"
                    className="border-gray-200 text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </Button>
                )}
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 