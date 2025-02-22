import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

function NotFound() {
  return (
    <article className="flex flex-col justify-center items-center w-screen h-screen text-center gap-4 bg-slate-200">
      <article className="flex flex-col justify-center items-center gap-2">
        <article className="rounded-full flex flex-col items-center bg-black text-white w-fit px-4 py-2 font-semibold">
          404
        </article>
        <h2 className="bg-gradient-to-r from-purple-600 to-orange-500 text-transparent bg-clip-text text-5xl md:text-7xl font-semibold">
          Aaaah, something went wrong
        </h2>
      </article>

      <article className="flex flex-col gap-2 items-center text-center">
        <p className="text-black">
          Sorry, we couldn't find the page you were looking for
        </p>
        <Button className="bg-orange-500" asChild>
          <Link
            className="flex gap-2 items-center font-semibold"
            href="/user/dashboard"
          >
            <ChevronLeft size={20} />
            Back
          </Link>
        </Button>
      </article>
    </article>
  );
}

export default NotFound;
