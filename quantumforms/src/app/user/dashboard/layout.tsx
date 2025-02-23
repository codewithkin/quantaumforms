import Topbar from "@/components/shared/dashboard/Topbar";
import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Dashboard",
};

function layout({ children }: { children: ReactNode }) {
  return (
    <section className="min-h-full w-full">
      <Topbar />
      {children}
    </section>
  );
}

export default layout;
