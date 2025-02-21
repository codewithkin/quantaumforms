"use client";
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogHeader, DialogTitle, DialogContent, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@heroui/input"
import { useState } from "react";

function CreateNewFormDialog() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const handleCreateForm = () => {
        if (!title.trim()) return alert("Form title is required!")
        
        // TODO: Handle form creation logic (e.g., send request to API)
        console.log({ title, description })

        // Reset fields
        setTitle("")
        setDescription("")
    }

  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant="default" color="primary" className="bg-gradient-to-r transition duration-300 from-purple-600 to-orange-500 hover:scale-105 w-full md:w-fit">
                Create New Form
            </Button>
        </DialogTrigger>

        <DialogContent className="p-6">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold">
                        Create a New Form
                    </DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground">
                        Need a new form? I'm here to help! Give it a name and an optional description.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <Input
                        placeholder="Form Title *"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border rounded-lg p-2 w-full"
                    />

                    <Textarea
                        placeholder="Short Description (Optional)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border rounded-lg p-2 w-full resize-none"
                    />
                </div>

                <DialogFooter className="flex justify-end space-x-2">
                    <Button variant="ghost">Cancel</Button>
                    <Button 
                        variant="default" 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105" 
                        onClick={handleCreateForm}
                    >
                        Create Form
                    </Button>
                </DialogFooter>
            </DialogContent>
    </Dialog>
  )
}

export default CreateNewFormDialog
