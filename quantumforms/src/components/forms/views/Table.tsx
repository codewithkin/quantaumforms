import React from "react";
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

export default function FormTable({forms}: {forms: Form[]}) {
 const columns = [
        {name: "NAME", uid: "name"},
        {name: "ROLE", uid: "role"},
        {name: "STATUS", uid: "status"},
        {name: "ACTIONS", uid: "actions"},
      ];

      // Add an "Actions" array to each of the forms
      forms.forEach((form) => {
        form.actions = [];
      });

  const renderCell = React.useCallback((form: Form, columnKey: any) => {
    const cellValue = form[columnKey];

    switch (columnKey) {
      case "title":
        return (
          <h2>{form.title}</h2>
        );
      case "shareableLInk":
        return (
            <ListViewShareableLinkBadge shareableLink={form.shareableLink} />
        );
      case "responses":
        return (
          <h2>{form.responses.length}</h2>
        );
      case "actions":
        return (
          <h2>Actions here</h2>
        );
      default:
        return cellValue;
    }
  }, []);

  

  return (
    <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column: any) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={forms}>
        {(item: any) => (
          <TableRow key={item.id}>
            {(columnKey: any) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

