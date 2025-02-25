import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQueryClientProvider } from "@/context/QueryProvider";
import { useMutation } from "@tanstack/react-query";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import axios from "axios";
import { Form } from "@/types";

function CardsViewMoreOptions({ form }: { form: Form }) {
  const queryClient = useQueryClientProvider((state) => state.queryClient);

  const deleteFormMutation = useMutation({
    mutationKey: ["deleteForm"],
    mutationFn: async (shareableLink: string) => {
      const res = await axios.delete(`/api/forms/${shareableLink}`);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forms"] });

      // Show a success toast
      toast("Form deleted successfully");
    },
    onError: (error) => {
      // Show an error toast
      toast("An error occurred while deleting the form");
    },
  });

  return (
    /* DropdownMenu with "View full", "Edit", "Delete", each with its own icon */
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex gap-2 items-center w-full text-slate-800"
          size="icon"
        >
          More
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>
          <Link
            className="flex gap-2 items-center"
            href={`/forms/${form.shareableLink}`}
          >
            <Eye size="20" />
            Preview
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            className="flex gap-2 items-center"
            href={`/user/forms/${form.shareableLink}`}
          >
            <Pencil size="20" />
            Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex gap-2 items-center text-red-500"
          onClick={() => deleteFormMutation.mutate(form.shareableLink)}
        >
          <Trash2 size="20" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default CardsViewMoreOptions;
