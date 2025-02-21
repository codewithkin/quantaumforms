import React from "react";
import { useDraggable, UseDraggableArguments } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Form } from "@/types";
import { Card } from "../ui/card";

function DraggableSection({
  form,
  id,
}: {
  form: Form;
  id: UseDraggableArguments["id"];
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });
  const style = {
    // Outputs `translate3d(x, y, 0)`
    transform: CSS.Translate.toString(transform),
  };

  return (
    <article className="w-full h-full flex flex-col items-center justify-center text-center">
      <Card
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        className="cursor-grab"
      >
        <h2>Helo</h2>
      </Card>
    </article>
  );
}

export default DraggableSection;
