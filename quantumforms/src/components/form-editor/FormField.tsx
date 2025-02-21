import {
  CalendarHeart,
  Check,
  CircleDot,
  List,
  ListOrdered,
  Lock,
  Mail,
  TextCursorInput,
} from "lucide-react";
import React, { useEffect, useState } from "react";

function FormField({
  label,
  id,
  type,
}: {
  label: string;
  id: string;
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
    <li key={id} className="p-2 rounded-md bg-white">
      {icon}
      {label}
    </li>
  );
}

export default FormField;
