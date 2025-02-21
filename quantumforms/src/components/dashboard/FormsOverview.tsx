import React from "react";
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
import { ChevronDown } from "lucide-react";

export type Field = {
  id: string;
  type: string;
  label: string;
  placeholder: string;
  required: boolean;
};

export type Form = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  fields: Field[];
};

const sampleForms = [
  {
    id: "form_1",
    title: "Customer Feedback Form",
    description: "Help us improve by sharing your thoughts!",
    createdAt: "2025-02-20T12:00:00.000Z",
    updatedAt: "2025-02-20T12:30:00.000Z",
    userId: "user_123",
    fields: [
      {
        id: "field_1",
        type: "text",
        label: "Full Name",
        placeholder: "Enter your full name",
        required: true,
      },
      {
        id: "field_2",
        type: "email",
        label: "Email Address",
        placeholder: "Enter your email",
        required: true,
      },
      {
        id: "field_3",
        type: "select",
        label: "How satisfied are you with our service?",
        options: [
          "Very Satisfied",
          "Satisfied",
          "Neutral",
          "Dissatisfied",
          "Very Dissatisfied",
        ],
        required: true,
      },
      {
        id: "field_4",
        type: "textarea",
        label: "Additional Comments",
        placeholder: "Enter any additional feedback...",
        required: false,
      },
    ],
    settings: {
      isPublic: true,
      allowMultipleResponses: false,
      showProgress: true,
    },
    shareableLink: "https://yourformapp.com/f/form_1",
  },
  {
    id: "form_2",
    title: "Job Application Form",
    description: "Apply for the open position by filling out this form.",
    createdAt: "2025-02-20T14:15:00.000Z",
    updatedAt: "2025-02-20T14:30:00.000Z",
    userId: "user_456",
    fields: [
      {
        id: "field_1",
        type: "text",
        label: "Full Name",
        placeholder: "Enter your full name",
        required: true,
      },
      {
        id: "field_2",
        type: "email",
        label: "Email Address",
        placeholder: "Enter your email",
        required: true,
      },
      {
        id: "field_3",
        type: "file",
        label: "Upload Resume",
        required: true,
      },
      {
        id: "field_4",
        type: "radio",
        label: "Are you legally authorized to work in this country?",
        options: ["Yes", "No"],
        required: true,
      },
    ],
    settings: {
      isPublic: false,
      allowMultipleResponses: false,
      showProgress: false,
    },
    shareableLink: "https://yourformapp.com/f/form_2",
  },
  {
    id: "form_3",
    title: "Event Registration",
    description: "Register for our upcoming event!",
    createdAt: "2025-02-21T09:00:00.000Z",
    updatedAt: "2025-02-21T09:30:00.000Z",
    userId: "user_789",
    fields: [
      {
        id: "field_1",
        type: "text",
        label: "Full Name",
        required: true,
      },
      {
        id: "field_2",
        type: "email",
        label: "Email Address",
        required: true,
      },
      {
        id: "field_3",
        type: "select",
        label: "Ticket Type",
        options: ["VIP", "General Admission", "Student"],
        required: true,
      },
    ],
    settings: {
      isPublic: true,
      allowMultipleResponses: true,
      showProgress: false,
    },
    shareableLink: "https://yourformapp.com/f/form_3",
  },
  {
    id: "form_4",
    title: "Survey: Tech Preferences",
    description: "Tell us about your tech habits!",
    createdAt: "2025-02-22T10:00:00.000Z",
    updatedAt: "2025-02-22T10:45:00.000Z",
    userId: "user_001",
    fields: [
      {
        id: "field_1",
        type: "checkbox",
        label: "Which devices do you use?",
        options: ["Laptop", "Smartphone", "Tablet", "Smartwatch"],
        required: true,
      },
      {
        id: "field_2",
        type: "text",
        label: "Favorite programming language",
        required: false,
      },
    ],
    settings: {
      isPublic: false,
      allowMultipleResponses: true,
      showProgress: true,
    },
    shareableLink: "https://yourformapp.com/f/form_4",
  },
  {
    id: "form_5",
    title: "Newsletter Signup",
    description: "Stay updated with our latest news and updates!",
    createdAt: "2025-02-23T08:30:00.000Z",
    updatedAt: "2025-02-23T08:45:00.000Z",
    userId: "user_555",
    fields: [
      {
        id: "field_1",
        type: "email",
        label: "Email Address",
        required: true,
      },
    ],
    settings: {
      isPublic: true,
      allowMultipleResponses: false,
      showProgress: false,
    },
    shareableLink: "https://yourformapp.com/f/form_5",
  },
];

const FormCard = ({
  title,
  createdAt,
  description,
  id,
  updatedAt,
  userId,
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
                      <p className="font-semibold">{type}</p>
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
  return (
    <article className="flex flex-col gap-4">
      <article className="w-full flex py-8 justify-between items-center">
        <h2 className="text-2xl font-semibold">My Forms</h2>

        {/* Form filters */}
        <article className="flex gap-4 items-centerjustify-center">
          <Button variant="default" color="primary">
            Most Reponses
          </Button>
          <Button variant="outline" color="primary">
            Date
          </Button>
          <Button variant="outline" color="primary">
            Date
          </Button>
          <Button variant="secondary" color="secondary">
            AI Created
          </Button>
          <Button variant="outline" color="primary">
            Manual Forms
          </Button>
        </article>
      </article>

      <article className="grid md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 items-center justify-center gap-4 md:gap-8 xl:gap-12">
        {sampleForms.length > 0 &&
          sampleForms.map((form: Form) => {
            const { id, title, description, createdAt, updatedAt, fields } =
              form;

            return (
              <FormCard
                key={id}
                title={title}
                createdAt={createdAt}
                description={description}
                fields={fields}
              />
            );
          })}
      </article>
    </article>
  );
}

export default FormsOverview;
