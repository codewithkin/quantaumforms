import { Field, Form } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useQueryClientProvider } from "@/context/QueryProvider";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";

function DraggableSection({ form }: { form: Form }) {
  const queryClient = useQueryClientProvider((state) => state.queryClient);

  const deleteMutation = useMutation({
    mutationFn: async (fieldId: string) => {
      // Make a delete request
      const res = await axios.delete(
        `/api/field/${form.id}?fieldId=${fieldId}`,
      );

      return res.data;
    },
    onSuccess: () => {
      // Invalidate form queries
      queryClient.invalidateQueries({ queryKey: ["form", form.id] });
    },
  });

  const simulateSubmission = () => {
    toast("This is just an example, form submitted");
  };

  return (
    <article className="w-full h-full flex flex-col items-center justify-center text-center">
      <Card className="px-8 py-4 md:min-w-[400px]">
        <CardHeader>
          <CardTitle className="text-2xl">{form.title}</CardTitle>
          <CardDescription>{form.description}</CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={simulateSubmission}
            className="w-full flex flex-col justify-start items-start text-start gap-4"
          >
            {form.fields.length > 0 &&
              form.fields.map((field: Field) => {
                return field.type !== "textarea" &&
                  field.type !== "checkbox" &&
                  field.type !== "radio" &&
                  field.type !== "select" ? (
                  <div key={field.id}>
                    <Label>{field.label}</Label>
                    <article className="flex gap-2 items-center">
                      <Input type={field.type} />
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              type="button"
                              onClick={() => {
                                deleteMutation.mutate(field.id);
                              }}
                              disabled={deleteMutation.isPending}
                              className="bg-red-500 hover:bg-red-700"
                              size="icon"
                            >
                              {deleteMutation.isPending ? (
                                <Loader2 size={20} />
                              ) : (
                                <Trash2 size={20} />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Delete field</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </article>
                  </div>
                ) : field.type === "textarea" ? (
                  <div key={field.id}>
                    <Label>{field.label}</Label>
                    <article className="flex gap-2 items-center">
                      <Textarea />
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              type="button"
                              onClick={() => deleteMutation.mutate(field.id)}
                              disabled={deleteMutation.isPending}
                              className="bg-red-500 hover:bg-red-700"
                              size="icon"
                            >
                              {deleteMutation.isPending ? (
                                <Loader2 size={20} />
                              ) : (
                                <Trash2 size={20} />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Delete field</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </article>
                  </div>
                ) : field.type === "checkbox" ? (
                  <div key={field.id}>
                    <Label>{field.label}</Label>
                    <article className="flex gap-2 items-center">
                      <Input type="checkbox" />
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              type="button"
                              onClick={() => deleteMutation.mutate(field.id)}
                              disabled={deleteMutation.isPending}
                              className="bg-red-500 hover:bg-red-700"
                              size="icon"
                            >
                              {deleteMutation.isPending ? (
                                <Loader2 size={20} />
                              ) : (
                                <Trash2 size={20} />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Delete field</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </article>
                  </div>
                ) : field.type === "radio" ? (
                  <div key={field.id}>
                    <Label>{field.label}</Label>
                    <article className="flex gap-2 items-center">
                      <Input type="radio" />
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              onClick={() => deleteMutation.mutate(field.id)}
                              disabled={deleteMutation.isPending}
                              type="button"
                              className="bg-red-500 hover:bg-red-700"
                              size="icon"
                            >
                              {deleteMutation.isPending ? (
                                <Loader2 size={20} />
                              ) : (
                                <Trash2 size={20} />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Delete field</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </article>
                  </div>
                ) : (
                  <div key={field.id}>
                    <Label>{field.label}</Label>
                    <article className="flex gap-2 items-center">
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder={field.placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                          {field.options &&
                            field.options.map(
                              (
                                option: {
                                  id: string;
                                  value: string;
                                  fieldId: string;
                                },
                                index: number,
                              ) => (
                                <SelectItem value={option.value} key={index}>
                                  {option.value}
                                </SelectItem>
                              ),
                            )}
                        </SelectContent>
                      </Select>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              type="button"
                              onClick={() => deleteMutation.mutate(field.id)}
                              disabled={deleteMutation.isPending}
                              className="bg-red-500 hover:bg-red-700"
                              size="icon"
                            >
                              {deleteMutation.isPending ? (
                                <Loader2 size={20} />
                              ) : (
                                <Trash2 size={20} />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Delete field</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </article>
                  </div>
                );
              })}

            <Button
              className="w-full bg-purple-500 text-white hover:bg-purple-700"
              type="submit"
              variant="ghost"
            >
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </article>
  );
}

export default DraggableSection;
