import {
  CalendarHeart,
  Check,
  CircleAlert,
  CircleDot,
  List,
  ListOrdered,
  Lock,
  Mail,
  TextCursorInput,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

function FormField({
  label,
  required,
  type,
}: {
  label: string;
  required?: boolean;
  type: string;
}) {
  // Track the icon state
  const [icon, setIcon] = useState<any>(
    <List size={16} className="inline-block mr-2" />,
  );

  useEffect(() => {
    switch (type) {
      case "text":
        setIcon(<List size={16} className="inline-block mr-2" />);
        break;
      case "date":
        setIcon(<CalendarHeart size={16} className="inline-block mr-2" />);
        break;
      case "password":
        setIcon(<Lock size={16} className="inline-block mr-2" />);
        break;
      case "number":
        setIcon(<ListOrdered size={16} className="inline-block mr-2" />);
        break;
      case "email":
        setIcon(<Mail size={16} className="inline-block mr-2" />);
        break;
      case "select":
        setIcon(<CircleDot size={16} className="inline-block mr-2" />);
        break;
      case "checkbox":
        setIcon(<Check size={16} className="inline-block mr-2" />);
        break;
      case "textarea":
        setIcon(<TextCursorInput size={16} className="inline-block mr-2" />);
        break;
      default:
        setIcon(<List size={16} className="inline-block mr-2" />);
    }
  }, [label]);

  return (
    <li className="p-2 rounded-md bg-white flex justify-between w-full">
      <article className="flex gap-2 items-center">
        {icon}
        {label}
      </article>

      {required && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <CircleAlert size={20} />
            </TooltipTrigger>

            <TooltipContent side="right">This field is required</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </li>
  );
}

export default FormField;
