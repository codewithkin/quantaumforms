import { DndContext } from "@dnd-kit/core";
import { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return <DndContext>{children}</DndContext>;
}

export default layout;
