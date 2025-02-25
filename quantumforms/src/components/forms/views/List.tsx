import React from "react";
import ListViewShareableLinkBadge from "./ListViewShareableLinkBadge";
import ListViewMoreOptions from "./ListViewMoreOptions";
import { Form } from "@/types";
import { motion } from "framer-motion";

function FormListItem({ forms }: { forms: Form[] }) {
  return (
    <ul className="w-full flex flex-col gap-4 overflow-hidden">
      {forms.length > 0 ? (
        forms.map((form: Form, index: number) => {
          const { id, title, createdAt, shareableLink } = form;

          return (
            <motion.li
              key={id}
              initial={{
                display: "none",
                opacity: 0,
                y: 200,
              }}
              animate={{
                display: "flex",
                opacity: 1,
                y: 1,
              }}
              transition={{
                delay: index * 0.1,
              }}
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
            </motion.li>
          );
        })
      ) : (
        <h2 className="text-xl font-medium text-slate-600 text-center">
          No forms yet...you can create one though
        </h2>
      )}
    </ul>
  );
}

export default FormListItem;
