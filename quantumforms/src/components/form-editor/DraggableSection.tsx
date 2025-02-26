import { Form, Field } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useQueryClientProvider } from "@/context/QueryProvider";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Switch,
} from "../ui/switch";
import {
  Settings,
  SettingsIcon,
} from "lucide-react";
import { updateFormSettings } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { Setting } from "@prisma/client";

function DraggableSection({ form }: { form: Form }) {
  const queryClient = useQueryClientProvider((state) => state.queryClient);
  const [showSettings, setShowSettings] = useState(false);
  const [localSettings, setLocalSettings] = useState({
    isPublic: form.settings?.isPublic ?? true,
    allowMultipleResponses: form.settings?.allowMultipleResponses ?? false,
    showProgress: form.settings?.showProgress ?? false,
    theme: form.settings?.theme ?? 'light',
    submitMessage: form.settings?.submitMessage ?? 'Submit',
    notifyOnSubmission: form.settings?.notifyOnSubmission ?? false,
  });
  
  const router = useRouter();

  const deleteMutation = useMutation({
    mutationFn: async (fieldId: string) => {
      const res = await axios.delete(`/api/field/${form.id}?fieldId=${fieldId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["form", form.id] });
    },
  });

  const simulateSubmission = () => {
    toast("This is just an example, form submitted");
  };

  // Settings mutation
  const updateSettingsMutation = useMutation({
    mutationFn: async (settings: Partial<Setting>) => {
      const res = await axios.patch(`/api/forms/${form.id}/settings`, settings);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["form", form.id] });
      toast.success("Settings updated successfully");
    },
  });

  // Default settings if none exist
  const defaultSettings = {
    isPublic: true,
    allowMultipleResponses: false,
    showProgress: false,
    theme: 'light',
    submitMessage: 'Submit',
    style: {
      primaryColor: form.primaryColor || '#4F46E5',
      secondaryColor: form.secondaryColor || '#6B7280',
      font: 'inherit',
    }
  };

  // Safely access settings with fallbacks
  const settings = form?.settings || defaultSettings;

  // Add renderField function
  const renderField = (field: Field) => {
    switch (field.type) {
      case "textarea":
        return (
          <Textarea 
            placeholder={field.placeholder}
            className="w-full"
          />
        );
      
      case "select":
        return (
          <Select>
            <SelectTrigger className="w-full">
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
        );

      case "checkbox":
      case "radio":
        return (
          <Input 
            type={field.type}
            className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
        );

      default:
        return (
          <Input 
            type={field.type} 
            placeholder={field.placeholder}
            className="w-full"
          />
        );
    }
  };

  // Add DeleteFieldButton component
  const DeleteFieldButton = ({ fieldId, deleteMutation }: { 
    fieldId: string;
    deleteMutation: any;
  }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            onClick={() => deleteMutation.mutate(fieldId)}
            disabled={deleteMutation.isPending}
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-md"
            size="icon"
          >
            {deleteMutation.isPending ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <Trash2 size={20} />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-white border-gray-100 text-gray-900 font-medium">
          Delete field
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <article className="w-full h-full flex flex-col items-center justify-center text-center">
      <Card 
        className={cn(
          "w-full md:max-w-lg px-8 py-6",
          "border-gray-100 shadow-sm",
          settings.theme === 'dark' 
            ? 'bg-gray-900 text-white' 
            : 'bg-white'
        )}
      >
        <CardHeader>
          {form.logo && (
            <Image 
              src={form.logo} 
              alt="Form Logo" 
              width={100} 
              height={100} 
              className="mx-auto mb-4"
            />
          )}
          <CardTitle 
            className="text-2xl font-bold"
            style={{ color: form.primaryColor || defaultSettings.style.primaryColor }}
          >
            {form.title}
          </CardTitle>
          <CardDescription 
            style={{ color: form.secondaryColor || defaultSettings.style.secondaryColor }}
          >
            {form.description}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="w-full flex flex-col gap-6">
            {settings.showProgress && (
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full transition-all duration-300"
                  style={{ 
                    width: '0%',
                    backgroundColor: form.primaryColor || defaultSettings.style.primaryColor
                  }}
                />
              </div>
            )}

            {form.fields?.map((field) => (
              <div key={field.id} className="w-full space-y-2">
                <Label 
                  className={cn(
                    "font-medium",
                    settings.theme === 'dark' ? 'text-white' : 'text-gray-700'
                  )}
                >
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </Label>
                
                {field.helpText && (
                  <p className={cn(
                    "text-sm",
                    settings.theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                  )}>
                    {field.helpText}
                  </p>
                )}

                <article className="flex gap-2 items-center">
                  {renderField(field)}
                  <DeleteFieldButton 
                    fieldId={field.id} 
                    deleteMutation={deleteMutation}
                  />
                </article>
              </div>
            ))}

            <Button
              className="w-full text-white"
              style={{
                backgroundColor: form.primaryColor || defaultSettings.style.primaryColor
              }}
              type="button"
              onClick={simulateSubmission}
            >
              {settings.submitMessage}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Settings Button */}
      <Button
        variant="outline"
        className="fixed bottom-4 right-4 border-gray-200 text-gray-700 hover:bg-gray-50"
        onClick={() => setShowSettings(true)}
      >
        <Settings className="w-4 h-4 mr-2" />
        Form Settings
      </Button>

      {/* Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className={cn(
          settings.theme === 'dark' 
            ? 'bg-gray-900 text-white' 
            : 'bg-white border-gray-100'
        )}>
          <DialogHeader>
            <DialogTitle className="text-gray-900">Form Settings</DialogTitle>
          </DialogHeader>
          
          <form 
            action={async (formData: FormData) => {
              formData.append('formId', form.id);
              const result = await updateFormSettings(formData);
              if (result.success) {
                toast.success("Settings updated successfully");
                setShowSettings(false);
                router.refresh();
              } else {
                toast.error(result.error || "Failed to update settings");
              }
            }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <Switch
                name="isPublic"
                checked={localSettings.isPublic}
                onCheckedChange={(checked) => 
                  setLocalSettings(prev => ({ ...prev, isPublic: checked }))
                }
              />
              <input 
                type="hidden" 
                name="isPublic" 
                value={localSettings.isPublic.toString()} 
              />
              <Label>Public Form</Label>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                name="allowMultipleResponses"
                checked={localSettings.allowMultipleResponses}
                onCheckedChange={(checked) => 
                  setLocalSettings(prev => ({ ...prev, allowMultipleResponses: checked }))
                }
              />
              <input 
                type="hidden" 
                name="allowMultipleResponses" 
                value={localSettings.allowMultipleResponses.toString()} 
              />
              <Label>Allow Multiple Responses</Label>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                name="showProgress"
                checked={localSettings.showProgress}
                onCheckedChange={(checked) => 
                  setLocalSettings(prev => ({ ...prev, showProgress: checked }))
                }
              />
              <input 
                type="hidden" 
                name="showProgress" 
                value={localSettings.showProgress.toString()} 
              />
              <Label>Show Progress Bar</Label>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                name="notifyOnSubmission"
                checked={localSettings.notifyOnSubmission}
                onCheckedChange={(checked) => 
                  setLocalSettings(prev => ({ ...prev, notifyOnSubmission: checked }))
                }
              />
              <input 
                type="hidden" 
                name="notifyOnSubmission" 
                value={localSettings.notifyOnSubmission.toString()} 
              />
              <Label>Notify on Submission</Label>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-700">Theme</Label>
              <Select
                name="theme"
                value={localSettings.theme}
                onValueChange={(value) => 
                  setLocalSettings((prev: any) => ({ ...prev, theme: value as "light" | "dark" }))
                }
              >
                <SelectTrigger className="border-gray-200">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-700">Submit Button Text</Label>
              <Input
                name="submitMessage"
                value={localSettings.submitMessage}
                onChange={(e) => 
                  setLocalSettings(prev => ({ ...prev, submitMessage: e.target.value }))
                }
                placeholder="Submit"
                className="border-gray-200"
              />
            </div>

            <Button 
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              Save Changes
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </article>
  );
}

export default DraggableSection;
