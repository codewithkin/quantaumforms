"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader, PlusCircle, Trash, Settings, List } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Field } from "@/types";
import Link from "next/link";

export default function FormEditor() {
    const router = useRouter();
    const [selectedField, setSelectedField] = useState<null | Field>(null);

    // Get the query params
    const params = useParams() as {id: string};

    // Fetch Form Data using react-query
    const { data: form, isLoading, isError, error } = useQuery({
        queryKey: ["form", params.id],
        queryFn: async () => {
            const res = await axios.get(`/api/forms/${params.id}`);

            console.log("DATA: ", res.data);

            return res.data;
        },
        retry: 2, // Retry twice on failure
    });

    if (isLoading) return <Loader className="animate-spin mx-auto mt-10" />;

    if(isError) {
        console.log("An error occured while fetching form:", error);
    }

    return (
        <article className={`grid  h-screen w-full ${form && !form.message && "grid-cols-[250px_1fr_300px]"}`}>
            {
                form && !form.message ?
                <>
                    {/* Sidebar */}
            <aside className="bg-gray-100 p-4 border-r">
                <h2 className="text-lg font-semibold">{form.title}</h2>
                <p className="text-sm text-gray-600">{form.description}</p>

                <Button variant="ghost" className="mt-4 w-full flex items-center gap-2">
                    <PlusCircle size={16} /> Add Field
                </Button>

                {/* Field List */}
                <ul className="mt-4 space-y-2">
                    {form.fields.map((field: Field) => (
                        <li
                            key={field.id}
                            className={`p-2 rounded-md cursor-pointer ${
                                selectedField?.id === field.id ? "bg-blue-200" : "bg-white"
                            }`}
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
                                setSelectedField((prev: Field) => ({ ...prev, label: e.target.value }))
                            }
                            className="mt-2"
                        />
                        <Input
                            placeholder="Placeholder Text"
                            value={selectedField.placeholder}
                            onChange={(e) =>
                                setSelectedField((prev: Field) => ({ ...prev, placeholder: e.target.value }))
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
                </> :
                <article className="w-full h-full flex flex-col justify-center items-center gap-2">
                    <h2 className="text-xl text-slate-500">An error occured, form not found</h2>
                    <Button className="bg-orange-500 hoverLbg-orange-700 text-white" asChild>
                        <Link href="/dashboard">
                            Take me home
                        </Link>
                    </Button>
                </article>
            }
        </article>
    );
}