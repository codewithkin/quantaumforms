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
    const newFilteredForms = forms.filter(
      (form) => form.responses.length >= min && form.responses.length <= max,
    );
    setFilteredForms(newFilteredForms);
  };

  return (
    <article className="page w-full">
      {/* Heading and view controls */}
      <article className="w-full justify-between items-center flex">
        <h2 className="text-2xl font-semibold">All Forms</h2>
      </article>

      {/* Filters */}
      <article className="w-full justify-between items-center flex my-4">
        <article className="flex gap-4 items-center justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="flex gap-2 items-center"
                variant="outline"
                size="sm"
              >
                <Clock size={20} strokeWidth={1.5} /> Time
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuSeparator />
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Button
                    variant="default"
                    onClick={() => setFilteredForms(forms || [])}
                    size="sm"
                  >
                    <Brush size={20} strokeWidth={1.5} /> Clear Filters
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
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="flex gap-2 items-center"
                variant="outline"
                size="sm"
              >
                Responses
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuSeparator />
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Button
                    variant="secondary"
                    onClick={() => handleResponseFilter(0, 5)}
                    size="sm"
                  >
                    0 - 5 Responses
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button
                    variant="secondary"
                    onClick={() => handleResponseFilter(6, 20)}
                    size="sm"
                  >
                    6 - 20 Responses
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button
                    variant="secondary"
                    onClick={() => handleResponseFilter(21, 50)}
                    size="sm"
                  >
                    21 - 50 Responses
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button
                    variant="secondary"
                    onClick={() => handleResponseFilter(51, 100)}
                    size="sm"
                  >
                    51 - 100 Responses
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
