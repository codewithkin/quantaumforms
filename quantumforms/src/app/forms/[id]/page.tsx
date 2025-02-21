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
import { Loader, PlusCircle, Trash, List } from "lucide-react";
import { useParams } from "next/navigation";
import { Field } from "@/types";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import FormField from "@/components/form-editor/FormField";

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

  if (isLoading) return <Loader className="animate-spin mx-auto mt-10" />;

  return (
    <div className="grid grid-cols-[250px_1fr_300px] h-screen">
      {/* Sidebar */}
      <aside className="bg-gray-100 p-4 border-r">
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
            <Label className="block text-sm font-medium">Field Type</Label>
            <select
              className="w-full p-2 border rounded"
              value={fieldData.type}
              onChange={(e) =>
                setFieldData({ ...fieldData, type: e.target.value })
              }
            >
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="email">Email</option>
              <option value="select">Select</option>
              <option value="checkbox">Checkbox</option>
              <option value="textarea">Textarea</option>
              <option value="date">Date</option>
            </select>

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
                      className="flex justify-between items-center p-1 bg-gray-200 rounded-md mt-1"
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

            {/* Textarea for Textarea Type Field */}
            {fieldData.type === "textarea" && (
              <div className="mt-4">
                <Label className="block text-sm font-medium">Textarea</Label>
                <textarea
                  name="placeholder"
                  placeholder="Enter placeholder"
                  value={fieldData.placeholder}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
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
          {form.fields &&
            form.fields.length > 0 &&
            form.fields.map((field: Field) => (
              <FormField key={field.id} type={field.type} label={field.label} />
            ))}
        </ul>
      </aside>
    </div>
  );
}
