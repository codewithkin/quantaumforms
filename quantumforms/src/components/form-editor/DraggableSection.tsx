import { Form } from "@/types";
import { Card } from "../ui/card";

function DraggableSection({form}: {form: Form}) {
    
  return (
    <article className="w-full h-full flex flex-col items-center justify-center text-center">
        <Card className="cursor-grab">
            <h2>Helo</h2>
        </Card>
    </article>
  );
}

export default DraggableSection;
