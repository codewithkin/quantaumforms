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

function DraggableSection({ form }: { form: Form }) {
  const queryClient = useQueryClientProvider((state) => state.queryClient);

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

  // Default settings if none exist
  const defaultSettings = {
    isPublic: true,
    theme: 'light',
    submitMessage: 'Submit',
    showProgressBar: false,
    style: {
      primaryColor: '#4F46E5',
      secondaryColor: '#6B7280',
      font: 'inherit',
    }
  };

  // Safely access settings with fallbacks
  const settings = form?.settings || defaultSettings;
  const style = settings?.style || defaultSettings.style;

  // Add renderField function
  const renderField = (field: Field) => {
    switch (field.type) {
      case "textarea":
        return (
          <Textarea 
            className="bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-200 min-h-[100px]"
            placeholder={field.placeholder}
          />
        );
      
      case "select":
        return (
          <Select>
            <SelectTrigger className="bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-200">
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem 
                  key={option.id} 
                  value={option.value}
                  className="hover:bg-blue-50 focus:bg-blue-50"
                >
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
            className="bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-200"
            placeholder={field.placeholder}
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
        <TooltipContent className="bg-white text-red-600 font-medium">
          Delete field
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <article className="w-full h-full flex flex-col items-center justify-center text-center">
      <Card 
        className={cn(
          "px-8 py-4 md:min-w-[400px]",
          "border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300",
          settings?.theme === 'dark' 
            ? 'bg-gray-900 text-white' 
            : 'bg-gradient-to-br from-white to-gray-50'
        )}
        style={{
          fontFamily: style?.font || 'inherit',
          ...(style?.backgroundImage && {
            backgroundImage: `url(${style.backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }),
        }}
      >
        <CardHeader>
          {style?.logo && (
            <Image 
              src={style.logo} 
              alt="Form Logo" 
              width={100} 
              height={100} 
              className="mx-auto mb-4"
            />
          )}
          <CardTitle 
            className="text-2xl"
            style={{ color: style?.primaryColor || defaultSettings.style.primaryColor }}
          >
            {form.title}
          </CardTitle>
          <CardDescription style={{ color: style?.secondaryColor || defaultSettings.style.secondaryColor }}>
            {form.description}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={simulateSubmission}
            className="w-full flex flex-col justify-start items-start text-start gap-6"
          >
            {settings?.showProgressBar && (
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full transition-all duration-300"
                  style={{ 
                    width: '0%',
                    backgroundColor: style?.primaryColor || defaultSettings.style.primaryColor
                  }}
                />
              </div>
            )}

            {form.fields?.map((field) => (
              <div key={field.id} className="w-full space-y-2">
                <Label className="font-medium text-gray-700">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </Label>
                
                {field.helpText && (
                  <p className="text-sm text-gray-500">{field.helpText}</p>
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
              className="w-full"
              style={{
                backgroundColor: style?.primaryColor || defaultSettings.style.primaryColor,
                color: 'white'
              }}
              type="submit"
            >
              {settings?.submitMessage || defaultSettings.submitMessage}
            </Button>
          </form>
        </CardContent>
      </Card>
    </article>
  );
}

export default DraggableSection;
