import FormListItem from "./views/List";
import FormsTable from "./views/Table";
import FormCards from "./views/Card";
import { Form } from "@/types";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Users, Clock, Badge } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";

interface FormsSwitchProps {
  view: string;
  forms: Form[];
}

export default function FormsSwitch({ view, forms }: FormsSwitchProps) {
  return (
    <div className="w-full">
      {forms.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[200px] rounded-lg border-2 border-dashed border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
          <p className="text-gray-500 text-lg">No forms found</p>
          <Button 
            asChild
            className="mt-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
          >
            <Link href="/forms/new">Create a form</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {forms.map((form) => (
            <Link key={form.id} href={`/forms/${form.id}`} className="block">
              <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] bg-gradient-to-br from-white to-gray-50 border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    {form.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {form.description || "No description"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-blue-600">
                      <Users size={16} />
                      <span>{form.responses.length} responses</span>
                    </div>
                    <div className="flex items-center gap-2 text-purple-600">
                      <Clock size={16} />
                      <span>{formatDistanceToNow(new Date(form.createdAt))}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-b-lg p-4">
                  <div className="flex items-center gap-2">
                    {form.settings?.isPublic ? (
                      <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">Public</Badge>
                    ) : (
                      <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200">Private</Badge>
                    )}
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
