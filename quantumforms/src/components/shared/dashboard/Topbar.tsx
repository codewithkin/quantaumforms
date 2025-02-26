"use client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Search, User, Settings, LogOut, CreditCard, UserCircle } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Input } from "@heroui/input";
import CreateNewFormDialog from "./CreateNewFormDialog";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Form } from "@/types";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { UserSettingsDialog } from "@/components/shared/UserSettingsDialog";

function Topbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { data: session } = useSession();
  const [showSettings, setShowSettings] = useState(false);

  const { data: forms } = useQuery<Form[]>({
    queryKey: ["forms"],
    queryFn: async () => {
      const res = await axios.get("/api/forms");
      return res.data;
    },
  });

  const filteredForms = React.useMemo(() => {
    if (!forms || !searchQuery.trim()) return [];
    return forms.filter(
      (form) =>
        form.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        form.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [forms, searchQuery]);

  return (
    <header className="border-b border-gray-100 bg-white">
      <div className="container flex h-16 items-center justify-between">
        <Button
          variant="ghost"
          className="font-semibold text-xl"
          onClick={() => router.push("/user/forms")}
        >
          QuantumForms
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage 
                  src={session?.user?.image || ''} 
                  alt={session?.user?.name || 'User'} 
                />
                <AvatarFallback className="bg-gray-100 text-gray-600">
                  {session?.user?.name?.[0]?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none text-gray-900">
                  {session?.user?.name}
                </p>
                <p className="text-xs leading-none text-gray-500">
                  {session?.user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => setShowSettings(true)}>
                <UserCircle className="mr-2 h-4 w-4" />
                <span>Account Settings</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-red-600 focus:text-red-600" 
              onClick={() => signOut()}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <UserSettingsDialog 
          open={showSettings} 
          onOpenChange={setShowSettings}
        />
      </div>
    </header>
  );
}

export default Topbar;
