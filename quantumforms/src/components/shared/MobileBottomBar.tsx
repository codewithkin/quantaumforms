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
import { DoorOpen } from "lucide-react";
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
      <article className="flex flex-col md:hidden gap-4 items-center">
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
                image={user?.image}
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
    </>
  );
}

export default MobileBottomBar;
