import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                {/* List View */}
                <Button size="icon" variant="outline">
                  <ListCheck size={30} strokeWidth={1.5} />
                </Button>
              </TooltipTrigger>

              <TooltipContent side="top">List View</TooltipContent>
            </Tooltip>

            {/* Table View */}
            <Tooltip>
              <TooltipTrigger asChild>
                {/* Table View */}
                <Button size="icon" variant="outline">
                  <Table size={30} strokeWidth={1.5} />
                </Button>
              </TooltipTrigger>

              <TooltipContent side="top">Table View</TooltipContent>
            </Tooltip>

            {/* Card View */}
            <Tooltip>
              <TooltipTrigger asChild>
                {/* Card View */}
                <Button size="icon" variant="outline">
                  <DockIcon size={30} strokeWidth={1.5} />
                </Button>
              </TooltipTrigger>

              <TooltipContent side="top">Card View</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </article>
      </article>
    </article>
  );
}

export default Forms;
