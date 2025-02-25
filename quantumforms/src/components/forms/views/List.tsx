import React from "react";
import ListViewShareableLinkBadge from "./ListViewShareableLinkBadge";
import ListViewMoreOptions from "./ListViewMoreOptions";
import { Form } from "@/types";

function FormListItem({ forms }: { forms: Form[] }) {
  return (
    <ul className="w-full flex flex-col gap-4 overflow-hidden">
      {forms.length > 0
        ? forms.map((form: Form) => {
            const {
              updatedAt,
              id,
              title,
              description,
              createdAt,
              shareableLink,
            } = form;

            return (
              <li
                key={id}
                className="w-full justify-between flex items-center bg-white text-slate-800 shadow-md rounded-xl hover:cursor-pointer transition duration-300 p-4"
              >
                {/* Title and createdAt */}
                <article className="flex gap-2 items-center">
                  <h4 className="font-semibold text-md">{title}</h4>

                  <p className="text-slate-600 font-semibold">
                    {createdAt.toString()}
                  </p>
                </article>

                {/* Primary and secondary colors
              <article className="flex items-center gap-2">
                <article className={`${primaryColor ? `bg-[${primaryColor}]` : "bg-orange-400"} w-8 h-8 rounded-full`}></article>
                <article className={`${secondaryColor ? `bg-[${secondaryColor}]` : "bg-purple-400"} w-8 h-8 rounded-full`}></article>
              </article> */}

                <article className="flex gap-2 items-center">
                  <ListViewShareableLinkBadge shareableLink={shareableLink} />
                  <ListViewMoreOptions form={form} />
                </article>
              </li>
            );
          })
        : null}
    </ul>
  );
}

export default FormListItem;
