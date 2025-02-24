"use client";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import axios from "axios";
import { Form, Response } from "@prisma/client";

function Analytics() {
  const [key, setKey] = useState<string | "all">("all");
  const [responses, setResponses] = useState<Response[]>([]);

  const { data: forms } = useQuery({
    queryKey: ["forms"],
    queryFn: async () => {
      const res = await axios.get("/api/forms");

      return res.data;
    },
  });

  useEffect(() => {
    if (key === "all") {
      // Get the responses across all forms
      if (forms) {
        // Map each form, adding its responses to the response array
        forms.map((form: Form) => {
          // Check if the particular form doesn't already exist inside the response array
          if (form.responses.length > 0) {
            setResponses((prev) => [...prev, ...form.responses]);
          } else {
            setResponses((prev) => [...prev]);
          }
        });
      }
    }
  }, [key, forms]);

  return (
    <article className="page">
      <h2 className="text-2xl font-semibold">Form Analytics</h2>

      <article className="md:flex gap-4 items-center justify-center">
        {/* Responses timeline */}
      </article>
    </article>
  );
}

export default Analytics;
