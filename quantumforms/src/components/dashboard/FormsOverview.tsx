"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Accordion, AccordionContent } from "../ui/accordion";
import { AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";
import { ChevronDown, Loader } from "lucide-react";
import { Form, Field } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const FormCard = ({
  title,
  createdAt,
  description,
  id,
  fields,
}: Form) => {
  return (
    <Card className="md:min-w-[400px] min-h-[400px]">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <Badge className="w-fit">{createdAt}</Badge>
      </CardHeader>

      <CardContent>
        <CardDescription className="text-slate-600">
          {description}
        </CardDescription>
      </CardContent>

      <CardFooter className="flex-col justify-start w-full items-start gap-2">
        <h2 className="text-md font-semibold">Fields:</h2>

        <Accordion type="multiple" className="w-full flex flex-col gap-2">
          {fields.length > 0 &&
            fields.map((field: Field) => {
              const { id, type, label } = field;

              return (
                <AccordionItem
                  key={id}
                  className="border p-2 rounded-xl w-full"
                  value={id}
                >
                  <AccordionTrigger className="flex w-full justify-between items-center">
                    {label}
                    <ChevronDown size={20} strokeWidth={1} />
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="font-semibold text-slate-600">{type}</p>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
        </Accordion>
      </CardFooter>
    </Card>
  );
};

function FormsOverview() {
  const [filter, setFilter] = useState("Most Responses");

  // Fetch the user's forms
  const { data: forms, isLoading } = useQuery({
    queryKey: ["forms"],
    queryFn: async () => {
      const res = await axios.get("/api/forms");
      return res.data;
    },
  }) as { data: Form[], isLoading: boolean };

  const sortedForms = React.useMemo(() => {
    if (!forms) return [];
    switch (filter) {
      case "Most Responses":
        return [...forms].sort((a, b) => b.responses - a.responses);
      case "Date":
        return [...forms].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      default:
        return forms;
    }
  }, [forms, filter]);

  return (
    <article className="flex flex-col gap-4 w-full h-full">
      <article className="w-full flex flex-col gap-2 md:flex-row py-8 justify-between items-center">
        <h2 className="text-2xl font-semibold">My Forms</h2>

        {/* Form filters */}
        <article className="flex gap-4 items-center w-full justify-center overflow-x-scroll md:overflow-hidden">
          <Button variant="default" color="primary" onClick={() => setFilter("Most Responses")}>
            Most Responses
          </Button>
          <Button variant="outline" color="primary" onClick={() => setFilter("Date")}>
            Date
          </Button>
        </article>
      </article>

      <article className="grid h-full md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 items-center justify-center gap-4 md:gap-8 xl:gap-12 w-full">
        {sortedForms && !isLoading ?
          sortedForms.length > 0 &&
          sortedForms.map((form: Form) => {
            const { id, title, description, createdAt, fields } = form;

            return (
              <FormCard
                key={id}
                title={title}
                createdAt={createdAt}
                description={description}
                fields={fields}
              />
            )
          }) :
          <article className="w-full h-full flex justify-center items-center">
            <Loader className="animate-spin" />
          </article>
        }
      </article>
    </article>
  );
}

export default FormsOverview;

