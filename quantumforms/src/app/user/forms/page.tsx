import { Button } from "@/components/ui/button";
import { Input } from "@heroui/input";
import { DockIcon, ListCheck, Search, Table } from "lucide-react";
import React from "react";

function Forms() {
  return (
    <article className="page w-full">
      <article className="w-full justify-between items-center flex">
        <h2 className="text-2xl font-semibold">All Forms</h2>

        {/* Views */}
        <article className="flex gap-4 items-center justify-center">
          {/* List View */}
          <Button size="icon" variant="outline">
            <ListCheck size={30} strokeWidth={1.5} />
          </Button>

          {/* Table View */}
          <Button size="icon" variant="outline">
            <Table size={30} strokeWidth={1.5} />
          </Button>

          {/* Card View */}
          <Button size="icon" variant="outline">
            <DockIcon size={30} strokeWidth={1.5} />
          </Button>
        </article>
      </article>
    </article>
  );
}

export default Forms;
