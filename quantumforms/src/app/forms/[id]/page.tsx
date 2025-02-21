"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader, PlusCircle, Trash, Settings, List } from "lucide-react";

export default function FormEditor({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [form, setForm] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedField, setSelectedField] = useState(null);

    // Fetch Form Data on Load
    useEffect(() => {
        async function fetchForm() {
            const res = await fetch(`/api/forms/${params.id}`);
            if (res.ok) {
                const data = await res.json();
                setForm(data);
            } else {
                router.push("/"); // Redirect if form not found
            }
            setLoading(false);
        }
        fetchForm();
    }, [params.id]);

    if (loading) return <Loader className="animate-spin mx-auto mt-10" />;

    return (
        <div className="grid grid-cols-[250px_1fr_300px] h-screen">
            {/* Sidebar */}
            <aside className="bg-gray-100 p-4 border-r">
                <h2 className="text-lg font-semibold">{form.title}</h2>
                <p className="text-sm text-gray-600">{form.description}</p>

                <Button variant="ghost" className="mt-4 w-full flex items-center gap-2">
                    <PlusCircle size={16} /> Add Field
                </Button>

                {/* Field List */}
                <ul className="mt-4 space-y-2">
                    {form.fields.map((field, index) => (
                        <li
                            key={field.id}
                            className={`p-2 rounded-md cursor-pointer ${selectedField?.id === field.id ? "bg-blue-200" : "bg-white"}`}
                            onClick={() => setSelectedField(field)}
                        >
                            <List size={16} className="inline-block mr-2" />
                            {field.label}
                        </li>
                    ))}
                </ul>

                <Button variant="destructive" className="mt-6 flex items-center gap-2">
                    <Trash size={16} /> Delete Form
                </Button>
            </aside>

            {/* Main Editor */}
            <main className="p-6">
                {selectedField ? (
                    <>
                        <h3 className="text-xl font-semibold">Editing Field: {selectedField.label}</h3>
                        <Input
                            placeholder="Field Label"
                            value={selectedField.label}
                            onChange={(e) =>
                                setSelectedField((prev) => ({ ...prev, label: e.target.value }))
                            }
                            className="mt-2"
                        />
                        <Input
                            placeholder="Placeholder Text"
                            value={selectedField.placeholder}
                            onChange={(e) =>
                                setSelectedField((prev) => ({ ...prev, placeholder: e.target.value }))
                            }
                            className="mt-2"
                        />
                    </>
                ) : (
                    <p className="text-gray-500">Select a field to edit</p>
                )}
            </main>

            {/* Settings Panel */}
            <aside className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Settings size={16} /> Form Settings
                </h3>
                <p className="text-sm">Adjust form visibility and submission settings.</p>

                <Button variant="outline" className="mt-4 w-full">
                    Save Changes
                </Button>
            </aside>
        </div>
    );
}
