"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@heroui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { createForm } from "@/helpers/queries/createForm";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

function CreateNewFormDialog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async () => await createForm(router, title, description),
    onSuccess: (data) => {
      console.log("New form created", data);

      // Redirect to the form editor
      router.push(`/user/forms/${data?.data?.shareableLink}`); // Redirect to form edit page
    },

    onError: () => {
      console.log("An error occured while creating form");

      // Show an error toast
      toast.error(
        "An error occured while creating your form...please try again later",
      );
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          color="primary"
          className="bg-gradient-to-r transition duration-300 from-purple-600 to-orange-500 hover:scale-105 w-full md:w-fit"
        >
          Create New Form
        </Button>
      </DialogTrigger>

      <DialogContent className="p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Create a New Form
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Need a new form? I'm here to help! Give it a name and an optional
            description.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Form Title *"
            value={title}
            disabled={mutation.isPending}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded-lg p-2 w-full"
          />

          <Textarea
            disabled={mutation.isPending}
            placeholder="Short Description (Optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded-lg p-2 w-full resize-none"
          />
        </div>

        <DialogFooter className="flex justify-end space-x-2">
          <Button variant="ghost">Cancel</Button>
          <Button
            disabled={mutation.isPending}
            variant="default"
            className="bg-gradient-to-r flex gap-2 items-center from-purple-500 to-pink-500 hover:scale-105"
            onClick={() => {
              mutation.mutate();
            }}
          >
            {mutation.isPending && (
              <Loader2 size={20} className="animate-spin" />
            )}
            Create Form
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateNewFormDialog;
