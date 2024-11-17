"use client";

import * as React from "react";
import { Moon, Settings, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="dark:bg-slate-800 dark:text-white relative flex items-center justify-center h-10 w-10 rounded-full border transition-all duration-300 hover:bg-accent hover:shadow-md dark:hover:shadow-lg"
        >

          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">สลับธีม</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="p-2 shadow-lg rounded-xl border bg-white dark:bg-gray-800"
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="flex items-center gap-2 px-4 py-2 rounded-md text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Sun className="h-4 w-4" /> สว่าง
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="flex items-center gap-2 px-4 py-2 rounded-md text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Moon className="h-4 w-4" /> มืด
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="flex items-center gap-2 px-4 py-2 rounded-md text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Settings className="h-4 w-4" /> ค่าเริ่มต้นในระบบ
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
