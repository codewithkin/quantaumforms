import { Form } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "@heroui/input";

function DraggableSection({ form }: { form: Form }) {
  return (
    <article className="w-full h-full flex flex-col items-center justify-center text-center">
      <Card className="cursor-grab px-8 py-4 md:min-w-[400px]">
        <CardHeader>
          <CardTitle className="text-2xl">{form.title}</CardTitle>
          <CardDescription>{form.description}</CardDescription>
        </CardHeader>

        <CardContent>
          <form className="w-full flex flex-col justify-start items-start">
            {form.fields.length > 0 &&
              form.fields.map((field) => {
                return field.type !== "textarea" ?
                 (
                  <div key={field.id}>
                    <Label>{field.label}</Label>
                    <Input type={field.type} />
                  </div>
                ) :
                (
                  <div key={field.id}>
                    <Label>{field.label}</Label>
                    <Textarea />
                  </div>
                );
              })}
          </form>
        </CardContent>
      </Card>
    </article>
  );
}

export default DraggableSection;
