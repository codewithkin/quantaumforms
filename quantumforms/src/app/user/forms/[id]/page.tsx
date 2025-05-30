"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Loader,
  PlusCircle,
  Trash,
  Image as ImageIcon,
  Camera,
  Loader2,
} from "lucide-react";
import { useParams } from "next/navigation";
import { Field } from "@/types";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import FormField from "@/components/form-editor/FormField";
import DraggableSection from "@/components/form-editor/DraggableSection";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectLabel } from "@radix-ui/react-select";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { updateFormBranding } from "@/lib/actions";

export default function FormEditor() {
  const queryClient = useQueryClient();
  const [showDialog, setShowDialog] = useState(false);
  const [fieldData, setFieldData] = useState({
    type: "text",
    label: "",
    placeholder: "",
    required: false,
    options: [] as string[],
    newOption: "", // For managing individual option input
  });

  // Get the query params
  const params = useParams() as { id: string };

  // Fetch form data
  const { data: form, isLoading } = useQuery({
    queryKey: ["form", params.id],
    queryFn: async () => {
      const res = await axios.get(`/api/forms/${params.id}`);
      return res.data;
    },
  });

  // Mutation for adding a new field
  const addFieldMutation = useMutation({
    mutationFn: async () => {
      return await axios.put(`/api/forms/${params.id}`, {
        formId: params.id,
        type: fieldData.type,
        label: fieldData.label,
        placeholder: fieldData.placeholder,
        required: fieldData.required,
        options: fieldData.type === "select" ? fieldData.options : [],
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["form", params.id] }); // Refresh form
      setShowDialog(false); // Close dialog
      resetForm(); // Reset form fields

      // Show a success toast
      toast.success("Field added successfully");
    },
    onError: () => {
      toast.error("An error occurred while adding the field");
    },
  });

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFieldData({ ...fieldData, [e.target.name]: e.target.value });
  };

  // Handle required checkbox change
  const handleCheckboxChange = () => {
    setFieldData({ ...fieldData, required: !fieldData.required });
  };

  // Handle adding options for "Select" field
  const handleAddOption = () => {
    if (fieldData.newOption.trim() !== "") {
      setFieldData({
        ...fieldData,
        options: [...fieldData.options, fieldData.newOption.trim()],
        newOption: "",
      });
    }
  };

  // Handle removing an option
  const handleRemoveOption = (index: number) => {
    setFieldData({
      ...fieldData,
      options: fieldData.options.filter((_, i) => i !== index),
    });
  };

  const handleFormChange = () => {
    queryClient.invalidateQueries({ queryKey: ["form", form.shareableLink] }); // Refresh form
  };

  // Reset the form fields
  const resetForm = () => {
    setFieldData({
      type: "text",
      label: "",
      placeholder: "",
      required: false,
      options: [],
      newOption: "",
    });
  };

  console.log("FORM: ", form);

  // Create an updateFormBranding mutation
  const updateFormBrandingMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      await updateFormBranding(formData);
    },
    onSuccess: () => {
      // Show a success toast
      toast.success("Form branding updated successfully");

      // Reload the form
      queryClient.invalidateQueries({ queryKey: ["form", form.shareableLink] });
    },
    onError: () => {
      // Show a success toast
      toast.error(
        "There was an error updating this form's branding, pleasey try again later",
      );
    },
  });

  if (isLoading) return <Loader className="animate-spin mx-auto mt-10" />;

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <aside className="bg-gray-100 p-4 border-r w-1/5">
        <h2 className="text-lg font-semibold">{form.title}</h2>
        <p className="text-sm text-gray-600">{form.description}</p>

        {/* Dialog Trigger for Adding Field */}
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="mt-4 w-full flex items-center gap-2"
            >
              <PlusCircle size={16} /> Add Field
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a New Field</DialogTitle>
            </DialogHeader>

            {/* Field Type Selection */}
            <Select
              value={fieldData.type}
              onValueChange={(value) =>
                setFieldData({ ...fieldData, type: value })
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Field Type" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel className="font-semibold">
                    Field Type
                  </SelectLabel>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="number">Number</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="select">Select</SelectItem>
                  <SelectItem value="checkbox">Checkbox</SelectItem>
                  <SelectItem value="textarea">Textarea</SelectItem>
                  <SelectItem value="date">Date</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* Label */}
            <Label className="block text-sm font-medium mt-2">Label</Label>
            <Input
              name="label"
              placeholder="Enter label"
              value={fieldData.label}
              onChange={handleChange}
            />

            {/* Placeholder */}
            <Label className="block text-sm font-medium mt-2">
              Placeholder
            </Label>
            <Input
              name="placeholder"
              placeholder="Enter placeholder"
              value={fieldData.placeholder}
              onChange={handleChange}
            />

            {/* Required Checkbox */}
            <div className="flex items-center gap-2 mt-2">
              <Checkbox
                checked={fieldData.required}
                onCheckedChange={handleCheckboxChange}
              />
              <Label className="text-sm">Required</Label>
            </div>

            {/* Options for Select Field */}
            {fieldData.type === "select" && (
              <div className="mt-4">
                <Label className="block text-sm font-medium">Options</Label>
                <div className="flex gap-2">
                  <Input
                    name="newOption"
                    placeholder="Enter option"
                    value={fieldData.newOption}
                    onChange={(e) =>
                      setFieldData({ ...fieldData, newOption: e.target.value })
                    }
                  />
                  <Button onClick={handleAddOption}>Add</Button>
                </div>
                <ul className="mt-2">
                  {fieldData.options.map((option, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center py-1 px-4 bg-gray-200 rounded-md mt-1"
                    >
                      {option}
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => handleRemoveOption(index)}
                      >
                        <Trash size={14} />
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Submit Button */}
            <Button
              onClick={() => addFieldMutation.mutateAsync()}
              disabled={
                addFieldMutation.isPending || fieldData.label.trim() === ""
              }
              className="mt-4 w-full"
            >
              {addFieldMutation.isPending ? (
                <Loader className="animate-spin" size={16} />
              ) : (
                "Add Field"
              )}
            </Button>
          </DialogContent>
        </Dialog>

        {/* Field List */}
        <ul className="mt-4 space-y-2">
          <Label>Fields</Label>
          {form.fields &&
            form.fields.length > 0 &&
            form.fields.map((field: Field, index: number) => (
              <FormField
                required={field.required}
                key={index}
                type={field.type}
                label={field.label}
              />
            ))}
        </ul>
      </aside>

      {/* Form Preview */}
      <DraggableSection form={form} />

      {/* Form settings */}
      <aside className="bg-gray-100 p-4 border-r w-1/5">
        <h2 className="text-lg font-semibold">Form Settings</h2>

        {/* Branding (logo, primary, secondary colors) */}
        <Label>Branding</Label>
        <form
          action={(formData: FormData) => {
            formData.append("shareableLink", form.shareableLink);

            updateFormBrandingMutation.mutate(formData);
          }}
          className="flex flex-col justify-center items-center w-full gap-8"
        >
          {/* Logo */}
          <Label>Logo</Label>
          {form.logo ? (
            <Image
              height={100}
              width={100}
              src={form.logo}
              alt="Logo"
              className="rounded-full"
            />
          ) : (
            <article className="rounded-full bg-slate-200 p-4 flex flex-col justify-center items-center">
              <Camera size={40} strokeWidth={1.2} />
            </article>
          )}

          {/* Primary and secondary colors */}
          <article className="flex flex-col gap-4 w-full">
            {/* Primary Color */}
            <article className="flex flex-col gap-2 w-full">
              <Label>Primary Color</Label>
              <Input
                name="primaryColor"
                id="primaryColor"
                type="color"
                className="w-full"
                defaultValue={form.primaryColor || "#ffffff"}
              />
            </article>

            {/* Secondary Color */}
            <article className="flex flex-col gap-2 w-full">
              <Label>Secondary Color</Label>
              <Input
                name="secondaryColor"
                id="secondaryColor"
                type="color"
                className="w-full"
                defaultValue={form.secondaryColor || "#000000"}
              />
            </article>
          </article>

          <Button
            className="self-start"
            disabled={updateFormBrandingMutation.isPending}
            variant="default"
            type="submit"
          >
            {updateFormBrandingMutation.isPending && (
              <Loader2 className="animate-spin" size={20} />
            )}
            {updateFormBrandingMutation.isPending ? "Saving..." : "Save"}
          </Button>
        </form>
      </aside>
    </div>
  );
}
