"use client";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useQuery } from "@tanstack/react-query";
import { DockIcon, ListCheck, Loader, Loader2, Table } from "lucide-react";
import axios from "axios";

function Forms() {
  // Fetch all the forms
  const {data: forms, isLoading} = useQuery({
    queryKey: ["forms"],
    queryFn: async () => {
      const res = await axios.get("/api/forms");

      return res.data
    }
  })

  console.log("FORMS IN /FORMS: ", forms);

  return (
    <article className="page w-full">
      {/* Heading and view controls */}
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

      {
         forms ?
        <h2>Data</h2> :
        isLoading &&
        <article className="w-full h-full flex flex-col justify-center items-center">
          <Loader size={40} className="animate-spin" />
        </article> 
      }
    </article>
  );
}

export default Forms;
