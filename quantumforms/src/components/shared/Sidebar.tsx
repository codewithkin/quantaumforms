"use client";
import React from "react";
import {
  BotMessageSquare,
  ChartBar,
  ChartPie,
  DoorOpen,
  NotebookText,
  Scale3D,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { Tooltip, TooltipContent, TooltipProvider } from "../ui/tooltip";
import { Avatar } from "@heroui/avatar";
import { useSession } from "next-auth/react";

function Sidebar() {
  // Get the current path
  const path = usePathname();

  const obj = useSession();

  const user = obj?.data?.user;

  return (
    <aside className="md:min-h-screen p-4 bg-white w-fit hidden md:flex md:flex-col justify-between">
      <article className="hidden md:flex md:flex-col gap-16">
        {/* App Icon */}
        <article className="bg-orange-500 p-2 rounded-lg flex flex-col justify-center items-center">
          <Scale3D size={30} strokeWidth={1.5} className="text-white" />
        </article>

        {/* Primary Links */}
        <article className="flex flex-col gap-4">
          <TooltipProvider delayDuration={0.5}>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  size="icon"
                  variant={path === "/user/dashboard" ? "default" : "outline"}
                  asChild
                >
                  <Link href="/user/dashboard">
                    <ChartBar
                      fill={path === "/user/dashboard" ? "currentColor" : "none"}
                      size={20}
                      strokeWidth={1.5}
                    />
                  </Link>
                </Button>
              </TooltipTrigger>

              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <Button
                  size="icon"
                  variant={path === "/user/forms" ? "default" : "outline"}
                  asChild
                >
                  <Link href="/user/forms">
                    <NotebookText
                      fill={path === "/user/forms" ? "currentColor" : "none"}
                      size={20}
                      strokeWidth={1.5}
                    />
                  </Link>
                </Button>
              </TooltipTrigger>

              <TooltipContent side="right">Your forms</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <Button
                  size="icon"
                  variant={path === "/user/analytics" ? "default" : "outline"}
                  asChild
                >
                  <Link href="/user/analytics">
                    <ChartPie
                      fill={path === "/user/analytics" ? "currentColor" : "none"}
                      size={20}
                      strokeWidth={1.5}
                    />
                  </Link>
                </Button>
              </TooltipTrigger>

              <TooltipContent side="right">Analytics</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
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
              </TooltipTrigger>

              <TooltipContent
                className="flex gap-2 items-center justify-center"
                side="right"
              >
                <Zap fill="yellow" size={12} strokeWidth={0} /> FormGenie
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </article>
      </article>

      <article className="flex flex-col gap-4 items-center">
        <TooltipProvider delayDuration={0.5}>
          <Tooltip>
            <TooltipTrigger>
              <Button size="icon" variant="outline" asChild>
                <Link href="/auth/signout">
                  <DoorOpen size={20} strokeWidth={1.5} />
                </Link>
              </Button>
            </TooltipTrigger>

            <TooltipContent side="right">Sign Out</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* User profile picture */}
        <TooltipProvider delayDuration={0.5}>
          <Tooltip>
            <TooltipTrigger>
              <Avatar
                image={user?.image || ""}
                name={user?.name || ""}
                isBordered
                color="secondary"
              />
            </TooltipTrigger>

            <TooltipContent color="primary" side="right">
              {user?.name || ""}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </article>
    </aside>
  );
}

export default Sidebar;
