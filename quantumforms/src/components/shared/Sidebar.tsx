"use client";
import React from "react";
import {
  BotMessageSquare,
  ChartBar,
  ChartPie,
  CloudLightning,
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
  const path = usePathname();
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <aside className="md:min-h-screen overflow-y-hidden max-h-screen p-4 bg-gradient-to-b from-white to-gray-50 w-fit hidden md:flex md:flex-col justify-between border-r border-gray-100">
      <article className="hidden md:flex md:flex-col gap-16">
        {/* App Icon */}
        <article className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg flex flex-col justify-center items-center shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
          <Scale3D size={30} strokeWidth={1.5} className="text-white" />
        </article>

        {/* Primary Links */}
        <article className="flex flex-col gap-4">
          <TooltipProvider delayDuration={0.5}>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  size="icon"
                  variant={path === "/user/dashboard" ? "default" : "ghost"}
                  className={
                    path === "/user/dashboard"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-md"
                      : "hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-100 text-gray-600 hover:text-blue-700"
                  }
                  asChild
                >
                  <Link href="/user/dashboard">
                    <ChartBar size={20} strokeWidth={1.5} />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-white font-semibold text-blue-600 shadow-lg border-gray-100">
                Dashboard
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <Button
                  size="icon"
                  variant={path === "/user/forms" ? "default" : "ghost"}
                  className={
                    path === "/user/forms"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-md"
                      : "hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-100 text-gray-600 hover:text-purple-700"
                  }
                  asChild
                >
                  <Link href="/user/forms">
                    <NotebookText size={20} strokeWidth={1.5} />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-white font-semibold text-blue-600  shadow-lg border-gray-100">
                Your forms
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <Button
                  size="icon"
                  variant={path === "/user/analytics" ? "default" : "ghost"}
                  className={
                    path === "/user/analytics"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-md"
                      : "hover:bg-gradient-to-br hover:from-emerald-50 hover:to-teal-100 text-gray-600 hover:text-emerald-700"
                  }
                  asChild
                >
                  <Link href="/user/analytics">
                    <ChartPie size={20} strokeWidth={1.5} />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-white font-semibold text-blue-600 shadow-lg border-gray-100">
                Analytics
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <Button
                  size="icon"
                  variant={path === "/ai" ? "default" : "ghost"}
                  className={
                    path === "/ai"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-md"
                      : "hover:bg-gradient-to-br hover:from-amber-50 hover:to-orange-100 text-gray-600 hover:text-amber-700"
                  }
                  asChild
                >
                  <Link href="/ai">
                    <BotMessageSquare size={20} strokeWidth={1.5} />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent
                className="flex gap-2 items-center justify-center text-blue-600 font-semibold bg-white shadow-lg border-gray-100"
                side="right"
              >
                <Zap className="text-amber-400" size={14} /> 
                <span>FormGenie</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </article>
      </article>

      <article className="flex flex-col gap-4 items-center">
        <TooltipProvider delayDuration={0.5}>
          <Tooltip>
            <TooltipTrigger>
              <Button
                size="icon"
                variant="ghost"
                className="hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-100 text-gray-600 hover:text-red-700"
                asChild
              >
                <Link href="/auth/signout">
                  <DoorOpen size={20} strokeWidth={1.5} />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-white text-blue-600 shadow-lg border-gray-100">
              Sign Out
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* User profile picture */}
        <TooltipProvider delayDuration={0.5}>
          <Tooltip>
            <TooltipTrigger>
              <div className="p-0.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="rounded-full overflow-hidden">
                  <Avatar
                    src={user?.image || ""}
                    alt={user?.name || ""}
                    className="w-8 h-8"
                  />
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-white shadow-lg border-gray-100">
              <CloudLightning className="text-yellow-500" />
              <span className="text-blue-600">FormGenie</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </article>
    </aside>
  );
}

export default Sidebar;
