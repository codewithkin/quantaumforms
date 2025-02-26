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
import { Accordion, AccordionContent } from "../ui/accordion";
import { AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";
import { ChevronDown, Loader, Calendar, TrendingUp, BarChart3, Copy, Edit, Eye, Link as LinkIcon, MoreHorizontal, Settings, Share2, Trash2 } from "lucide-react";
import { Form, Field } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";

const FormCard = ({
  title,
  createdAt,
  description,
  shareableLink,
  id,
  fields,
  settings,
}: Form) => {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const copyShareableLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/forms/${shareableLink}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Link copied to clipboard!");
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/forms/${id}`);
      toast.success("Form deleted successfully");
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete form");
    }
  };

  return (
    <Card className="md:min-w-[400px] min-h-[400px] hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50 border-gray-200/50">
      <CardHeader>
        <CardTitle className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {title}
        </CardTitle>
        <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full w-fit">
          <Calendar size={16} />
          <span className="text-sm">{createdAt}</span>
        </div>
      </CardHeader>

      <CardContent>
        <CardDescription className="text-gray-600 line-clamp-2">
          {description}
        </CardDescription>
        
        <Accordion type="multiple" className="w-full flex flex-col gap-2">
          {fields.length > 0 &&
            fields.map((field: Field) => {
              const { id, type, label } = field;

              return (
                <AccordionItem
                  key={id}
                  className="border border-gray-200/50 p-2 rounded-xl w-full hover:bg-gray-50/50 transition-colors"
                  value={id}
                >
                  <AccordionTrigger className="flex w-full justify-between items-center">
                    <span className="text-gray-700">{label}</span>
                    <ChevronDown size={20} strokeWidth={1.5} className="text-gray-500" />
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="font-medium text-purple-600 bg-purple-50 px-3 py-1.5 rounded-full w-fit text-sm">
                      {type}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
        </Accordion>
      </CardContent>

      <CardFooter className="flex flex-col gap-4 w-full">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            {settings?.isPublic ? (
              <Badge variant="success">Public</Badge>
            ) : (
              <Badge variant="secondary">Private</Badge>
            )}
            <Badge variant="outline">{fields.length} Fields</Badge>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => router.push(`/user/forms/${id}`)}>
                <Edit className="mr-2 h-4 w-4" /> Edit Form
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push(`/user/forms/${id}/analytics`)}>
                <BarChart3 className="mr-2 h-4 w-4" /> View Analytics
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push(`/forms/${shareableLink}`)}>
                <Eye className="mr-2 h-4 w-4" /> Preview
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={copyShareableLink}>
                <LinkIcon className="mr-2 h-4 w-4" /> Copy Link
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share2 className="mr-2 h-4 w-4" /> Share Form
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push(`/user/forms/${id}/settings`)}>
                <Settings className="mr-2 h-4 w-4" /> Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-red-600 focus:text-red-600" 
                onClick={handleDelete}
              >
                <Trash2 className="mr-2 h-4 w-4" /> Delete Form
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex gap-2 w-full">
          <Button 
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            onClick={() => router.push(`/user/forms/${id}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Edit
          </Button>
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => router.push(`/user/forms/${id}/analytics`)}
          >
            <BarChart3 className="mr-2 h-4 w-4" /> Analytics
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

function FormsOverview() {
  const [filter, setFilter] = useState("Most Responses");

  const { data: forms, isLoading } = useQuery({
    queryKey: ["forms"],
    queryFn: async () => {
      const res = await axios.get("/api/forms");
      return res.data;
    },
  }) as { data: Form[]; isLoading: boolean };

  const sortedForms = React.useMemo(() => {
    if (!forms) return [];
    switch (filter) {
      case "Most Responses":
        return [...forms].sort((a, b) => b.responses.length - a.responses.length);
      case "Date":
        return [...forms].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
      default:
        return forms;
    }
  }, [forms, filter]);

  return (
    <article className="flex flex-col gap-4 w-full h-full">
      <article className="w-full flex flex-col gap-2 md:flex-row py-8 justify-between items-center">
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          My Forms
        </h2>

        <article className="flex gap-4 items-center w-full justify-center overflow-x-scroll md:overflow-hidden">
          <Button
            variant={filter === "Most Responses" ? "default" : "outline"}
            onClick={() => setFilter("Most Responses")}
            className={`gap-2 ${
              filter === "Most Responses"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                : "bg-gradient-to-br from-blue-50 to-indigo-100 text-blue-700 hover:from-blue-100 hover:to-indigo-200"
            }`}
          >
            <TrendingUp size={20} strokeWidth={1.5} />
            Most Responses
          </Button>
          <Button
            variant={filter === "Date" ? "default" : "outline"}
            onClick={() => setFilter("Date")}
            className={`gap-2 ${
              filter === "Date"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                : "bg-gradient-to-br from-purple-50 to-pink-100 text-purple-700 hover:from-purple-100 hover:to-pink-200"
            }`}
          >
            <Calendar size={20} strokeWidth={1.5} />
            Date
          </Button>
        </article>
      </article>

      <article className="grid h-full md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 items-center justify-center gap-4 md:gap-8 xl:gap-12 w-full">
        {sortedForms && !isLoading ? (
          sortedForms.length > 0 ? (
            sortedForms.map((form: Form) => (
              <FormCard key={form.id} {...form} />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center min-h-[200px] rounded-lg border-2 border-dashed border-gray-200 bg-gradient-to-br from-blue-50 to-indigo-100">
              <p className="text-gray-600 text-lg font-medium">No forms found</p>
            </div>
          )
        ) : (
          <article className="col-span-full h-full flex justify-center items-center">
            <Loader className="animate-spin text-blue-600" size={40} />
          </article>
        )}
      </article>
    </article>
  );
}

export default FormsOverview;
