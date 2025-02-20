import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar } from '@heroui/avatar'
import { DropdownMenuGroup, DropdownMenuLabel, DropdownMenuItem, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function Topbar() {
  return (
    <article className="p-4 border-b border-white flex md:flex-row flex-col w-full justify-between items-center">
        {/* Avatar and Search Input */}
        <article className="flex gap-4 items-center">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className='flex gap-2 items-center' size="sm">
                        <Avatar size="sm" color="primary" />
                        <ChevronDown size="20" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            Profile Picture and Name
                        </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuLabel>Account Management</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuGroup>
                        <DropdownMenuItem asChild>
                            <Link href="/profile">Edit Profile</Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild>
                            <Link href="/billing">Billing and Subscription</Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild>
                            <Link href="/notifications">Notification Preferences</Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild>
                            <Link href="/support">Help and Support</Link>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            <Input
                placeholder="Search for a form..."
                color="primary"
                className="w-full max-w-[400px] bg-white"
            />
        </article>

        {/* Create new form btn */}
        <article>
            <Button variant="default" color="primary" className="">Create New Form</Button>
        </article>
    </article>
  )
}

export default Topbar