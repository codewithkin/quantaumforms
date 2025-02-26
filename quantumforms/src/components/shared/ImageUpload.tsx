"use client";
import { UploadCloud } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "sonner";

interface ImageUploadProps {
  onUpload: (url: string) => void;
}

export function ImageUpload({ onUpload }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.includes("image")) {
      toast.error("Please upload an image file");
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }

    try {
      setIsUploading(true);

      // Create FormData
      const formData = new FormData();
      formData.append("file", file);

      // Upload to your storage service (e.g., S3, Cloudinary)
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      onUpload(data.url);
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="file"
        accept="image/*"
        className="hidden"
        id="imageUpload"
        onChange={handleUpload}
        disabled={isUploading}
      />
      <label htmlFor="imageUpload">
        <Button
          type="button"
          variant="outline"
          className="cursor-pointer border-gray-200 text-gray-700 hover:bg-gray-50"
          disabled={isUploading}
          asChild
        >
          <span>
            <UploadCloud className="mr-2 h-4 w-4" />
            {isUploading ? "Uploading..." : "Upload Image"}
          </span>
        </Button>
      </label>
    </div>
  );
}
