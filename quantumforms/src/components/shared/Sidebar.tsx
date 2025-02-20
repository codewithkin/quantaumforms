"use client";
import React from 'react'
import { BotMessageSquare, ChartBar, ChartPie, NotebookText, Scale3D, Zap } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'
import { usePathname } from 'next/navigation';
import { TooltipTrigger } from '@radix-ui/react-tooltip';
import { Tooltip, TooltipContent, TooltipProvider } from '../ui/tooltip';

function Sidebar() {
    const path = usePathname();


  return (
    <aside className='md:min-h-screen p-4 bg-white'>
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
                            <Button variant={path === '/dashboard' ? 'default' : 'ghost'} asChild>
                                <Link href="/dashboard">
                                    <ChartBar fill={path === '/dashboard' ? 'currentColor' : 'none'} size={20} strokeWidth={1.5} />
                                </Link>
                            </Button>
                        </TooltipTrigger>

                        <TooltipContent side="right">Dashboard</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger>
                            <Button variant={path === '/forms' ? 'default' : 'ghost'} asChild>
                                <Link href="/forms">
                                    <NotebookText fill={path === '/forms' ? 'currentColor' : 'none'} size={20} strokeWidth={1.5} />
                                </Link>
                            </Button>
                        </TooltipTrigger>

                        <TooltipContent side="right">Your Forms</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger>
                            <Button variant={path === '/analytics' ? 'default' : 'ghost'} asChild>
                                <Link href="/analytics">
                                    <ChartPie fill={path === '/analytics' ? 'currentColor' : 'none'} size={20} strokeWidth={1.5} />
                                </Link>
                            </Button>
                        </TooltipTrigger>

                        <TooltipContent side="right">Dashboard</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger>
                            <Button variant={path === '/ai' ? 'default' : 'ghost'} asChild>
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
    </aside>
  )
}

export default Sidebar
