import { Badge } from "@/components/ui/badge";
import { rootUrls } from "@/utils/rootUrls";
import { Form } from "@prisma/client";
import { Check, Link } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

function ListViewShareableLinkBadge({
  shareableLink,
}: {
  shareableLink: Form["shareableLink"];
}) {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    // Copy the link to the clipboard
    navigator.clipboard.writeText(
      `${rootUrls.frontendUrl}/forms/${shareableLink}`,
    );

    toast("Copied form link to clipboard");

    setCopied(true);
  };

  return (
    <Badge
      onClick={handleCopy}
      variant={copied ? "outline" : "default"}
      className="flex gap-2 items-center"
    >
      {!copied ? <Link size={14} /> : <Check size={14} />}
      {shareableLink?.slice(0, 10)}
    </Badge>
  );
}

export default ListViewShareableLinkBadge;
