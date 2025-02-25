import React, { useCallback } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Form } from "@/types";
import ListViewShareableLinkBadge from "./ListViewShareableLinkBadge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { useQueryClientProvider } from "@/context/QueryProvider";

export default function FormTable({ forms }: { forms: Form[] }) {
  const columns = [
    { name: "Title", uid: "title" },
    { name: "Form Link", uid: "shareableLink" },
    { name: "No. of Responses", uid: "responses" },
    { name: "More", uid: "actions" },
  ];

  // Add an "Actions" array to each of the forms
  forms.forEach((form) => {
    form.actions = [];
  });

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

  const renderCell = useCallback((form: Form, columnKey: any) => {
    const cellValue = form[columnKey];

    console.log("cellValue", columnKey);

    switch (columnKey) {
      case "title":
        return <h2 className="font-semibold text-md">{form.title}</h2>;
      case "shareableLInk":
        return (
          <ListViewShareableLinkBadge shareableLink={form.shareableLink} />
        );
      case "responses":
        return <h2>{form.responses.length}</h2>;
      case "actions":
        return (
          /* DropdownMenu with "View full", "Edit", "Delete", each with its own icon */
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="flex gap-2 items-center" size="icon">
                <MoreHorizontal size="20" />
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
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column: any) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={forms}>
        {(item: any) => (
          <TableRow key={item.id}>
            {(columnKey: any) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
