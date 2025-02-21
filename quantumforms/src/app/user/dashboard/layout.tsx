import Topbar from "@/components/shared/dashboard/Topbar";
import React, { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return (
    <section className="min-h-full w-full">
      <Topbar />
      {children}
    </section>
  );
}

export default layout;
