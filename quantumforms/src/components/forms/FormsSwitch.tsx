import { Form } from "@prisma/client";
import FormListItem from "./views/List";
import FormsTable from "./views/Table";

function FormsSwitch({ forms, view }: { forms: Form[]; view: string }) {
  return (
    <article className="py-4 w-full">
      {view === "table" ? (
        <FormsTable forms={forms} />
      ) : view === "list" ? (
        <FormListItem forms={forms} />
      ) : (
        <h2>Card</h2>
      )}
    </article>
  );
}

export default FormsSwitch;
