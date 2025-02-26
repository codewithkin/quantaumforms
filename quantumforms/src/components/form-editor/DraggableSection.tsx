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
      <Card className="px-8 py-4 md:min-w-[400px] bg-gradient-to-br from-white to-gray-50 border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {form.title}
          </CardTitle>
          <CardDescription className="text-gray-600">{form.description}</CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={simulateSubmission}
            className="w-full flex flex-col justify-start items-start text-start gap-6"
          >
            {form.fields &&
              form.fields.length > 0 &&
              form.fields.map((field: Field) => {
                return field.type !== "textarea" &&
                  field.type !== "checkbox" &&
                  field.type !== "radio" &&
                  field.type !== "select" ? (
                  <div key={field.id} className="w-full space-y-2">
                    <Label className="font-medium text-gray-700">{field.label}</Label>
                    <article className="flex gap-2 items-center">
                      <Input 
                        type={field.type} 
                        className="bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                      />
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              type="button"
                              onClick={() => {
                                deleteMutation.mutate(field.id);
                              }}
                              disabled={deleteMutation.isPending}
                              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-md"
                              size="icon"
                            >
                              {deleteMutation.isPending ? (
                                <Loader2 size={20} className="animate-spin" />
                              ) : (
                                <Trash2 size={20} />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="bg-white text-red-600 font-medium">
                            Delete field
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </article>
                  </div>
                ) : field.type === "textarea" ? (
                  <div key={field.id} className="w-full space-y-2">
                    <Label className="font-medium text-gray-700">{field.label}</Label>
                    <article className="flex gap-2 items-start">
                      <Textarea className="bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-200 min-h-[100px]" />
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              type="button"
                              onClick={() => deleteMutation.mutate(field.id)}
                              disabled={deleteMutation.isPending}
                              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-md"
                              size="icon"
                            >
                              {deleteMutation.isPending ? (
                                <Loader2 size={20} className="animate-spin" />
                              ) : (
                                <Trash2 size={20} />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="bg-white text-red-600 font-medium">
                            Delete field
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </article>
                  </div>
                ) : field.type === "checkbox" || field.type === "radio" ? (
                  <div key={field.id} className="w-full space-y-2">
                    <Label className="font-medium text-gray-700">{field.label}</Label>
                    <article className="flex gap-2 items-center">
                      <Input 
                        type={field.type}
                        className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              type="button"
                              onClick={() => deleteMutation.mutate(field.id)}
                              disabled={deleteMutation.isPending}
                              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-md"
                              size="icon"
                            >
                              {deleteMutation.isPending ? (
                                <Loader2 size={20} className="animate-spin" />
                              ) : (
                                <Trash2 size={20} />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="bg-white text-red-600 font-medium">
                            Delete field
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </article>
                  </div>
                ) : (
                  <div key={field.id} className="w-full space-y-2">
                    <Label className="font-medium text-gray-700">{field.label}</Label>
                    <article className="flex gap-2 items-center">
                      <Select>
                        <SelectTrigger className="bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-200">
                          <SelectValue placeholder={field.placeholder} />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-gray-200">
                          {field.options &&
                            field.options.map(
                              (option: {
                                id: string;
                                value: string;
                                fieldId: string;
                              }, index: number) => (
                                <SelectItem 
                                  value={option.value} 
                                  key={index}
                                  className="hover:bg-blue-50 focus:bg-blue-50"
                                >
                                  {option.value}
                                </SelectItem>
                              )
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
                              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-md"
                              size="icon"
                            >
                              {deleteMutation.isPending ? (
                                <Loader2 size={20} className="animate-spin" />
                              ) : (
                                <Trash2 size={20} />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="bg-white text-red-600 font-medium">
                            Delete field
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </article>
                  </div>
                );
              })}

            <Button
              className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-300`}
              type="submit"
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
