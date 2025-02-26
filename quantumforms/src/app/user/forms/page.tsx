"use client";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useQuery } from "@tanstack/react-query";
import { Brush, Clock, DockIcon, ListCheck, Loader, Table } from "lucide-react";
import axios from "axios";
import FormsSwitch from "@/components/forms/FormsSwitch";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
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

  const [view, setView] = useState<"list" | "table" | "card">("list");
  const [filteredForms, setFilteredForms] = useState<Form[]>([]);

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

  const handleResponseFilter = (min: number, max: number) => {
    if (!forms) return;

    const newFilteredForms = forms.filter((form) => {
      const responseCount = Array.isArray(form.responses)
        ? form.responses.length
        : 0;
      return responseCount >= min && responseCount <= max;
    });

    setFilteredForms(newFilteredForms);
  };

  return (
    <article className="page w-full">
      {/* Heading with gradient text */}
      <article className="w-full justify-between items-center flex">
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          All Forms
        </h2>
      </article>

      {/* Enhanced Filters */}
      <article className="w-full justify-between items-center flex my-4">
        <article className="flex gap-4 items-center justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="flex gap-2 items-center bg-gradient-to-br from-blue-50 to-indigo-100 text-blue-700 hover:from-blue-100 hover:to-indigo-200 border-blue-200 shadow-sm"
                variant="outline"
                size="sm"
              >
                <Clock size={20} strokeWidth={1.5} /> Time
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border-blue-100 shadow-lg">
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Button
                    variant="ghost"
                    onClick={() => setFilteredForms(forms || [])}
                    size="sm"
                    className="w-full bg-red-50 text-red-700 hover:bg-red-100"
                  >
                    <Brush size={20} strokeWidth={1.5} className="mr-2" /> Clear
                    Filters
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button
                    variant="ghost"
                    onClick={() => handleTimeFilter(24)}
                    size="sm"
                    className="w-full bg-purple-50 text-purple-700 hover:bg-purple-100"
                  >
                    Last 24 hours
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button
                    variant="ghost"
                    onClick={() => handleTimeFilter(168)}
                    size="sm"
                    className="w-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                  >
                    1 Week
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="flex gap-2 items-center bg-gradient-to-br from-purple-50 to-pink-100 text-purple-700 hover:from-purple-100 hover:to-pink-200 border-purple-200 shadow-sm"
                variant="outline"
                size="sm"
              >
                <ListCheck size={20} strokeWidth={1.5} /> Responses
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border-purple-100 shadow-lg">
              <DropdownMenuGroup>
                <DropdownMenuItem className="w-full">
                  <Button
                    variant="ghost"
                    onClick={() => setFilteredForms(forms || [])}
                    size="sm"
                    className="w-full bg-red-50 text-red-700 hover:bg-red-100"
                  >
                    <Brush size={20} strokeWidth={1.5} className="mr-2" /> Clear
                    Filter
                  </Button>
                </DropdownMenuItem>
                {[
                  { range: [0, 5], label: "0 - 5", color: "blue" },
                  { range: [6, 20], label: "6 - 20", color: "purple" },
                  { range: [21, 50], label: "21 - 50", color: "emerald" },
                  { range: [51, 100], label: "51+", color: "amber" },
                ].map(({ range, label, color }) => (
                  <DropdownMenuItem key={range.join("-")} className="w-full">
                    <Button
                      variant="ghost"
                      onClick={() => handleResponseFilter(range[0], range[1])}
                      size="sm"
                      className={`w-full bg-${color}-50 text-${color}-700 hover:bg-${color}-100`}
                    >
                      {label} Responses
                    </Button>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </article>
      </article>

      {/* Loading State */}
      {!forms && isLoading ? (
        <article className="w-full h-full flex flex-col justify-center items-center">
          <Loader size={40} className="animate-spin text-blue-600" />
        </article>
      ) : (
        <FormsSwitch view={view} forms={filteredForms} />
      )}
    </article>
  );
}

export default Forms;
