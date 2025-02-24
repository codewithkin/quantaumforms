import { Form } from "@prisma/client";
import FormListItem from "./views/List";

function FormsSwitch({ forms, view }: { forms: Form[]; view: string }) {
  return (
    <article className="py-4 w-full">
      {view === "table" ? (
        <h2>Table here</h2>
      ) : view === "list" ? (
        <FormListItem forms={forms} />
      ) : (
        <h2>Card</h2>
      )}
    </article>
  );
}

export default FormsSwitch;
