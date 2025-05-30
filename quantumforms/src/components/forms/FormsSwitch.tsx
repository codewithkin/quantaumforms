import { Form } from "@/types";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Users, Clock, Edit, Eye } from "lucide-react";
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
        <div className="flex flex-col items-center justify-center min-h-[200px] rounded-lg border-2 border-dashed border-gray-200 bg-gradient-to-br from-blue-50 to-indigo-100">
          <p className="text-gray-600 text-lg font-medium">No forms found</p>
          <Button
            asChild
            className="mt-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-md hover:shadow-lg transition-all duration-300"
          >
            <Link href="/user/forms/new">Create a form</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {forms.map((form) => (
            <Card
              key={form.id}
              className="bg-gradient-to-br from-white to-gray-50 border border-gray-200/50"
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {form.title}
                </CardTitle>
                <CardDescription className="text-gray-600 line-clamp-2">
                  {form.description || "No description"}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">
                    <Users size={16} />
                    <span className="font-medium">
                      {form.responses.length} responses
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-purple-600 bg-purple-50 px-3 py-1.5 rounded-full">
                    <Clock size={16} />
                    <span className="font-medium">
                      {formatDistanceToNow(new Date(form.createdAt))}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  {form.settings?.isPublic ? (
                    <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full font-medium">
                      Public
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full font-medium">
                      Private
                    </div>
                  )}
                </div>
                <div className="flex gap-2 w-full">
                  <Button
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    asChild
                  >
                    <Link href={`/user/forms/${form.id}`}>
                      <Edit className="mr-2 h-4 w-4" /> Edit Form
                    </Link>
                  </Button>
                  <Button variant="outline" className="flex-1" asChild>
                    <Link href={`/forms/${form.shareableLink}`}>
                      <Eye className="mr-2 h-4 w-4" /> View Form
                    </Link>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
