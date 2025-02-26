import { Button } from "@/components/ui/button";
import { Form } from "@/types";
import { Pencil, Copy, Link as LinkIcon, BarChart3, Eye, Share2, Settings } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import CardsViewMoreOptions from "./CardsViewMoreOptions";
import { useState } from "react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Badge } from "../ui/badge";

function FormCards({ forms }: { forms: Form[] }) {
  const [copied, setCopied] = useState(false);

  const copyShareableLink = (shareableLink: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/forms/${shareableLink}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Link copied to clipboard");
  };

  return (
    <article className="grid md:grid-cols-4 sm:grid-cols-2 items-center md:gap-8 gap-4 w-full">
      {forms && forms.length > 0 ? (
        forms.map((form: Form, index: number) => {
          const { id, title, createdAt, shareableLink } = form;
          return (
            <motion.article
              initial={{
                display: "none",
                opacity: 0,
                x: 200,
              }}
              animate={{
                display: "grid",
                opacity: 1,
                x: 1,
              }}
              transition={{
                delay: index * 0.1,
              }}
              key={id}
              className={`hover:cursor-pointer grid min-h-[400px] p-4 rounded-xl text-white bg-gradient-to-tr from-sky-400 to-blue-800 w-full`}
            >
              <article>
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="font-semibold">{createdAt}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                    {form.responses.length} Responses
                  </Badge>
                  {form.settings?.isPublic && (
                    <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                      Public
                    </Badge>
                  )}
                </div>
              </article>

              {/* Controls */}
              <article className="flex flex-col gap-2 w-full justify-self-end self-end">
                <div className="flex gap-2 w-full">
                  <Button 
                    className="flex-1 bg-white/20 hover:bg-white/30"
                    asChild
                  >
                    <Link href={`/user/forms/${id}`}>
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 bg-white/10 hover:bg-white/20 border-white/20"
                    onClick={() => copyShareableLink(shareableLink)}
                  >
                    {copied ? (
                      <Copy className="h-4 w-4" />
                    ) : (
                      <LinkIcon className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full bg-white/10 hover:bg-white/20 border-white/20">
                      More Options
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <BarChart3 className="mr-2 h-4 w-4" /> View Analytics
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" /> Preview Form
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Share2 className="mr-2 h-4 w-4" /> Share Form
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" /> Form Settings
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </article>
            </motion.article>
          );
        })
      ) : (
        <h2 className="text-xl font-medium text-slate-600 text-center w-full">
          No forms yet...you can create one though
        </h2>
      )}
    </article>
  );
}

export default FormCards;
