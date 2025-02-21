"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader, PlusCircle, Trash, List } from "lucide-react";
import { useParams } from "next/navigation";
import { Field } from "@/types";

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
            return await axios.patch(`/api/forms/${params.id}`, {
                formId: params.id,
                type: fieldData.type,
                label: fieldData.label,
                placeholder: fieldData.placeholder,
                required: fieldData.required,
                options: fieldData.type === "select" ? fieldData.options : [],
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["form", params.id]}); // Refresh form
            setShowDialog(false); // Close dialog
            resetForm(); // Reset form fields
        },
    });

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                        <Button variant="ghost" className="mt-4 w-full flex items-center gap-2">
                            <PlusCircle size={16} /> Add Field
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add a New Field</DialogTitle>
                        </DialogHeader>

                        {/* Field Type Selection */}
                        <label className="block text-sm font-medium">Field Type</label>
                        <select
                            className="w-full p-2 border rounded"
                            value={fieldData.type}
                            onChange={(e) => setFieldData({ ...fieldData, type: e.target.value })}
                        >
                            <option value="text">Text</option>
                            <option value="number">Number</option>
                            <option value="select">Select</option>
                            <option value="checkbox">Checkbox</option>
                        </select>

                        {/* Label */}
                        <label className="block text-sm font-medium mt-2">Label</label>
                        <Input
                            name="label"
                            placeholder="Enter label"
                            value={fieldData.label}
                            onChange={handleChange}
                        />

                        {/* Placeholder */}
                        <label className="block text-sm font-medium mt-2">Placeholder</label>
                        <Input
                            name="placeholder"
                            placeholder="Enter placeholder"
                            value={fieldData.placeholder}
                            onChange={handleChange}
                        />

                        {/* Required Checkbox */}
                        <div className="flex items-center gap-2 mt-2">
                            <Checkbox checked={fieldData.required} onCheckedChange={handleCheckboxChange} />
                            <label className="text-sm">Required</label>
                        </div>

                        {/* Options for Select Field */}
                        {fieldData.type === "select" && (
                            <div className="mt-4">
                                <label className="block text-sm font-medium">Options</label>
                                <div className="flex gap-2">
                                    <Input
                                        name="newOption"
                                        placeholder="Enter option"
                                        value={fieldData.newOption}
                                        onChange={(e) => setFieldData({ ...fieldData, newOption: e.target.value })}
                                    />
                                    <Button onClick={handleAddOption}>Add</Button>
                                </div>
                                <ul className="mt-2">
                                    {fieldData.options.map((option, index) => (
                                        <li key={index} className="flex justify-between items-center p-1 bg-gray-200 rounded-md mt-1">
                                            {option}
                                            <Button size="icon" variant="destructive" onClick={() => handleRemoveOption(index)}>
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
                            disabled={addFieldMutation.isPending || fieldData.label.trim() === ""}
                            className="mt-4 w-full"
                        >
                            {addFieldMutation.isPending ? <Loader className="animate-spin" size={16} /> : "Add Field"}
                        </Button>
                    </DialogContent>
                </Dialog>

                {/* Field List */}
                <ul className="mt-4 space-y-2">
                    {form.fields.map((field: Field) => (
                        <li key={field.id} className="p-2 rounded-md bg-white">
                            <List size={16} className="inline-block mr-2" />
                            {field.label}
                        </li>
                    ))}
                </ul>
            </aside>
        </div>
    );
}