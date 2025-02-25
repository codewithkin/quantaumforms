"use client";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useQuery } from "@tanstack/react-query";
import {
  Brush,
  Clock,
  DockIcon,
  ListCheck,
  Loader,
  Loader2,
  Table,
} from "lucide-react";
import axios from "axios";
import FormsSwitch from "@/components/forms/FormsSwitch";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Form } from "@/types";

function Forms() {
  // Fetch all the forms
  const { data: forms, isLoading } = useQuery({
    queryKey: ["forms"],
    queryFn: async () => {
      const res = await axios.get("/api/forms");

      return res.data;
    },
  }) as { data: Form[]; isLoading: boolean };

  console.log("FORMS IN /FORMS: ", forms);

  const [view, setView] = useState<"list" | "table" | "card">("list");

  const [filteredForms, setFilteredForms] = useState<Form[]>([]);

  // Update filteredForms when forms are fetched
  useEffect(() => {
    if (forms) {
      setFilteredForms(forms);
    }
  }, [forms]);

  const handleTimeFilter = (hours: number) => {
    if (!forms) return;

    const now = new Date().getTime();
    const newFilteredForms = forms.filter(
      (form) =>
        new Date(form.createdAt).getTime() > now - hours * 60 * 60 * 1000,
    );

    setFilteredForms(newFilteredForms);
  };

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
                <Button
                  onClick={() => setView("list")}
                  size="icon"
                  variant={view === "list" ? "default" : "outline"}
                >
                  <ListCheck size={30} strokeWidth={1.5} />
                </Button>
              </TooltipTrigger>

              <TooltipContent side="top">List View</TooltipContent>
            </Tooltip>

            {/* Table View */}
            <Tooltip>
              <TooltipTrigger asChild>
                {/* Table View */}
                <Button
                  onClick={() => setView("table")}
                  size="icon"
                  variant={view === "table" ? "default" : "outline"}
                >
                  <Table size={30} strokeWidth={1.5} />
                </Button>
              </TooltipTrigger>

              <TooltipContent side="top">Table View</TooltipContent>
            </Tooltip>

            {/* Card View */}
            <Tooltip>
              <TooltipTrigger asChild>
                {/* Card View */}
                <Button
                  onClick={() => setView("card")}
                  size="icon"
                  variant={view === "card" ? "default" : "outline"}
                >
                  <DockIcon size={30} strokeWidth={1.5} />
                </Button>
              </TooltipTrigger>

              <TooltipContent side="top">Card View</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </article>
      </article>

      {/* Filters */}
      <article className="w-full justify-between items-center flex my-4">
        <article className="flex gap-4 items-center justify-center"></article>

        <article className="flex gap-4 items-center justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="flex gap-2 items-center"
                variant="outline"
                size="sm"
              >
                <Clock size={20} strokeWidth={1.5} />
                Time
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuSeparator />

            <DropdownMenuContent>
            <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Button
                    variant="default"
                    disabled={filteredForms.length !== 0}
                    onClick={() => handleTimeFilter(15120)}
                    size="sm"
                  >
                    <Brush size={20} strokeWidth={1.5} />
                    Clear Filters
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Button
                    variant="secondary"
                    onClick={() => handleTimeFilter(24)}
                    size="sm"
                  >
                    Last 24 hours
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button
                    variant="secondary"
                    onClick={() => handleTimeFilter(168)}
                    size="sm"
                  >
                    1 Week
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button
                    variant="secondary"
                    onClick={() => handleTimeFilter(5040)}
                    size="sm"
                  >
                    1 Month
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button
                    variant="secondary"
                    onClick={() => handleTimeFilter(15120)}
                    size="sm"
                  >
                    3 Months
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </article>
      </article>

      {forms ? (
        <FormsSwitch view={view} forms={filteredForms} />
      ) : (
        isLoading && (
          <article className="w-full h-full flex flex-col justify-center items-center">
            <Loader size={40} className="animate-spin" />
          </article>
        )
      )}
    </article>
  );
}

export default Forms;
