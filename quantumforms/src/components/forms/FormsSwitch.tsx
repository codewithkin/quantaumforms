import FormListItem from "./views/List";
import FormsTable from "./views/Table";
import FormCards from "./views/Card";
import { Form } from "@/types";

function FormsSwitch({ forms, view }: { forms: Form[]; view: string }) {
  return (
    <article className="py-4 w-full">
      {view === "table" ? (
        <FormsTable forms={forms} />
      ) : view === "list" ? (
        <FormListItem forms={forms} />
      ) : (
        <FormCards forms={forms} />
      )}
    </article>
  );
}

export default FormsSwitch;
