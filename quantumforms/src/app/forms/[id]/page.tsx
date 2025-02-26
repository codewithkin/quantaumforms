"use client";
import { Form } from "@/types";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { Loader2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function FormPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [formData, setFormData] = useState<Record<string, any>>({});

  // Fetch form data using shareableLink
  const { data: form, isLoading } = useQuery<Form>({
    queryKey: ["form", params.id],
    queryFn: async () => {
      // Here we use the shareableLink since this is the public view
      const res = await axios.get(`/api/forms/public/${params.id}`);
      return res.data;
    },
  });

  // Submit form response mutation using form.id
  const submitMutation = useMutation({
    mutationFn: async (data: Record<string, any>) => {
      const res = await axios.post(`/api/forms/${form?.id}/submit`, data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Form submitted successfully!");
      setFormData({});
    },
    onError: () => {
      toast.error("Failed to submit form");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate(formData);
  };

  const handleInputChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!form) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Form not found</p>
      </div>
    );
  }

  const isCreator = session?.user?.id === form.userId;
  const defaultStyle = {
    primaryColor: "#4F46E5",
    secondaryColor: "#6B7280",
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-white">
      <Card
        className={`md:max- ${
          form.settings?.theme === "dark"
            ? "bg-gray-900 text-white"
            : "bg-white"
        }`}
      >
        <CardHeader>
          {form.settings?.style?.logo && (
            <Image
              src={form.settings.style.logo}
              alt="Form Logo"
              width={100}
              height={100}
              className="mx-auto mb-4"
            />
          )}
          <CardTitle
            className="text-2xl text-center"
            style={{
              color:
                form.settings?.style?.primaryColor || defaultStyle.primaryColor,
            }}
          >
            {form.title}
          </CardTitle>
          <CardDescription
            className="text-center"
            style={{
              color:
                form.settings?.style?.secondaryColor ||
                defaultStyle.secondaryColor,
            }}
          >
            {form.description}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {form.fields.map((field) => (
              <div key={field.id} className="space-y-2">
                <Label>
                  {field.label}
                  {field.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </Label>

                {field.type === "textarea" ? (
                  <Textarea
                    placeholder={field.placeholder}
                    required={field.required}
                    value={formData[field.id] || ""}
                    onChange={(e) =>
                      handleInputChange(field.id, e.target.value)
                    }
                    className="w-full"
                  />
                ) : field.type === "select" ? (
                  <Select
                    value={formData[field.id]}
                    onValueChange={(value) =>
                      handleInputChange(field.id, value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={field.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options.map((option) => (
                        <SelectItem key={option.id} value={option.value}>
                          {option.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    type={field.type}
                    placeholder={field.placeholder}
                    required={field.required}
                    value={formData[field.id] || ""}
                    onChange={(e) =>
                      handleInputChange(field.id, e.target.value)
                    }
                    className="w-full"
                  />
                )}

                {field.helpText && (
                  <p className="text-sm text-gray-500">{field.helpText}</p>
                )}
              </div>
            ))}

            <Button
              type="submit"
              className="w-full"
              disabled={submitMutation.isPending}
              style={{
                backgroundColor:
                  form.settings?.style?.primaryColor ||
                  defaultStyle.primaryColor,
              }}
            >
              {submitMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                form.settings?.submitMessage || "Submit"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Edit button for form creator */}
      {isCreator && (
        <Button
          asChild
          className="fixed bottom-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <Link href={`/user/forms/${form.id}`}>
            <Edit className="mr-2 h-4 w-4" /> Edit Form
          </Link>
        </Button>
      )}
    </div>
  );
}
