"use client";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  BotMessageSquare,
  ChartBar,
  ChartPie,
  DoorOpen,
  NotebookText,
  Zap,
} from "lucide-react";
import { Avatar } from "@heroui/avatar";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

function MobileBottomBar() {
  // Get the current path
  const path = usePathname();

  const obj = useSession();

  const user = obj?.data?.user;

  return (
    <>
      <article className="flex w-full justify-center bg-white shadow-md p-4 md:hidden gap-4 items-center absolute bottom-0 left-0 right-0">
        {/* Primary Links */}
        <article className="flex gap-16">
          <Button
            size="icon"
            variant={path === "/dashboard" ? "default" : "outline"}
            asChild
          >
            <Link href="/dashboard">
              <ChartBar
                fill={path === "/dashboard" ? "currentColor" : "none"}
                size={20}
                strokeWidth={1.5}
              />
            </Link>
          </Button>

          <Button
            size="icon"
            variant={path === "/forms" ? "default" : "outline"}
            asChild
          >
            <Link href="/forms">
              <NotebookText
                fill={path === "/forms" ? "currentColor" : "none"}
                size={20}
                strokeWidth={1.5}
              />
            </Link>
          </Button>

          <Button
            size="icon"
            variant={path === "/analytics" ? "default" : "outline"}
            asChild
          >
            <Link href="/analytics">
              <ChartPie
                fill={path === "/analytics" ? "currentColor" : "none"}
                size={20}
                strokeWidth={1.5}
              />
            </Link>
          </Button>

          <Button
            size="icon"
            variant={path === "/ai" ? "default" : "outline"}
            asChild
          >
            <Link href="/ai">
              <BotMessageSquare
                fill={path === "/ai" ? "currentColor" : "none"}
                size={20}
                strokeWidth={1.5}
              />
            </Link>
          </Button>
        </article>
      </article>
    </>
  );
}

export default MobileBottomBar;
