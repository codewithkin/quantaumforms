import { Form } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

function DraggableSection({form}: {form: Form}) {
    
  return (
    <article className="w-full h-full flex flex-col items-center justify-center text-center">
        <Card className="cursor-grab px-8 py-4 md:min-w-[400px]">
            <CardHeader>
                <CardTitle className="text-2xl">{form.title}</CardTitle>
                <CardDescription>{form.description}</CardDescription>
            </CardHeader>

            <CardContent>
                {
                    form.fields.length > 0 &&
                    form.fields.map((field) => (
                        <div key={field.id}>
                            <h3>{field.label}</h3>
                            <p>{field.type}</p>
                        </div>
                    ))
                }
            </CardContent>
        </Card>
    </article>
  );
}

export default DraggableSection;
