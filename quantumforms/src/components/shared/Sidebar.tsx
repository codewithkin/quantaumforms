"use client";
import React from 'react'
import { BotMessageSquare, ChartBar, ChartPie, DoorOpen, NotebookText, Scale3D, Zap } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'
import { usePathname } from 'next/navigation';
import { TooltipTrigger } from '@radix-ui/react-tooltip';
import { Tooltip, TooltipContent, TooltipProvider } from '../ui/tooltip';
import { Avatar } from "@heroui/avatar";
import { auth } from '@/auth';
import { useQuery } from "@tanstack/react-query";

function Sidebar() {
    // Get the current path
    const path = usePathname();

    // Get the user's session data
    const { data: session } = useQuery({
        initialData: null,
        queryKey: ["user"],
        queryFn: async () => await auth()
    });

    const user = session?.user;

    console.log("USER DATA: ", user);

  return (
    <aside className='md:min-h-screen p-4 bg-white flex flex-col items-between'>
        <article className="flex flex-col gap-16">
            {/* App Icon */}
            <article className="bg-orange-500 p-2 rounded-lg flex flex-col justify-center items-center">
                <Scale3D size={30} strokeWidth={1.5} className="text-white" />
            </article>

            {/* Primary Links */}
            <article className="flex flex-col gap-4">
                <TooltipProvider delayDuration={0.5}>
                    <Tooltip>
                        <TooltipTrigger>
                            <Button size="icon" variant={path === '/dashboard' ? 'default' : 'outline'} asChild>
                                <Link href="/dashboard">
                                    <ChartBar fill={path === '/dashboard' ? 'currentColor' : 'none'} size={20} strokeWidth={1.5} />
                                </Link>
                            </Button>
                        </TooltipTrigger>

                        <TooltipContent side="right">Dashboard</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger>
                            <Button size="icon" variant={path === '/forms' ? 'default' : 'outline'} asChild>
                                <Link href="/forms">
                                    <NotebookText fill={path === '/forms' ? 'currentColor' : 'none'} size={20} strokeWidth={1.5} />
                                </Link>
                            </Button>
                        </TooltipTrigger>

                        <TooltipContent side="right">Your Forms</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger>
                            <Button size="icon" variant={path === '/analytics' ? 'default' : 'outline'} asChild>
                                <Link href="/analytics">
                                    <ChartPie fill={path === '/analytics' ? 'currentColor' : 'none'} size={20} strokeWidth={1.5} />
                                </Link>
                            </Button>
                        </TooltipTrigger>

                        <TooltipContent side="right">Dashboard</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger>
                            <Button size="icon" variant={path === '/ai' ? 'default' : 'outline'} asChild>
                                <Link href="/ai">
                                    <BotMessageSquare fill={path === '/ai' ? 'currentColor' : 'none'} size={20} strokeWidth={1.5} />
                                </Link>
                            </Button>
                        </TooltipTrigger>

                        <TooltipContent className='flex gap-2 items-center justify-center' side="right"><Zap fill="yellow" size={12} strokeWidth={0} /> FormGenie</TooltipContent>
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
                                <DoorOpen fill="yellow" size={20} strokeWidth={1.5} />
                            </Link>
                        </Button>
                    </TooltipTrigger>

                    <TooltipContent side="right">Sign Out</TooltipContent>
                </Tooltip>
            </TooltipProvider>

            {/* User profile picture */}
            <Avatar
                name={user?.name || ""}
                src={user?.image || ""}
                isBordered
                size="sm"
            />
        </article>
    </aside>
  )
}

export default Sidebar
