"use client";
import { Button } from "@/components/ui/button";
import { Avatar } from "@heroui/avatar";
import {
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Search } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Input } from "@heroui/input";
import CreateNewFormDialog from "./CreateNewFormDialog";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Form } from "@/types";
import axios from "axios";

function Topbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

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
    <article className="p-4 flex md:flex-row flex-col w-full gap-4 justify-between md:items-center bg-white border-b border-gray-100">
      {/* Avatar and Search Input */}
      <article className="flex gap-4 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="flex gap-2 items-center bg-gradient-to-br from-blue-50 to-indigo-100 text-blue-700 hover:from-blue-100 hover:to-indigo-200 border-blue-200" size="sm">
              <Avatar size="sm" color="primary" />
              <ChevronDown size="20" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56 shadow-lg">
            <DropdownMenuLabel className="text-blue-600">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem className="hover:bg-blue-50">
                Profile Picture and Name
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuLabel className="text-purple-600">Account Management</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              {[
                { href: "/profile", label: "Edit Profile" },
                { href: "/billing", label: "Billing and Subscription" },
                { href: "/notifications", label: "Notification Preferences" },
                { href: "/support", label: "Help and Support" },
              ].map((item) => (
                <DropdownMenuItem
                  key={item.href}
                  className="hover:bg-purple-50"
                  onClick={() => router.push(item.href)}
                >
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="relative w-full max-w-[400px] md:min-w-[400px]">
          <Input
            placeholder="Search for a form..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gradient-to-br from-gray-50 to-white border-gray-200"
          />
          <Search 
            size={20} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          {searchQuery.trim() && filteredForms.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-[300px] overflow-y-auto z-10">
              {filteredForms.map((form) => (
                <div
                  key={form.id}
                  className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0"
                  onClick={() => {
                    router.push(`/user/forms/${form.id}`);
                    setSearchQuery("");
                  }}
                >
                  <h3 className="font-medium text-gray-700">{form.title}</h3>
                  {form.description && (
                    <p className="text-sm text-gray-500 line-clamp-1">{form.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </article>

      {/* Create new form btn */}
      <CreateNewFormDialog />
    </article>
  );
}

export default Topbar;
