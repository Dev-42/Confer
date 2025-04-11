"use client";
import React, { useState } from "react";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Moon, Sun, SunIcon, Video } from "lucide-react";
import { Button } from "../ui/button";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);

  const formatTimeDate = () => {
    const now = new Date();

    const time = now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    const date = now.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

    return `${time} • ${date}`;
  };

  return (
    <div className="flex items-center justify-between p-6 bg-white dark:bg-gray-900 border-b dark:border-gray-700">
      <div className="flex items-center space-x-4">
        <Link href="/" className="flex items-center space-x-2">
          <Video className="w-8 h-8 text-blue-500" />
          <span className="hidden md:block text-xl font-semibold text-gray-800 dark:text-white">
            Confer
          </span>
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-md text-gray-500 dark:text-gray-200">
          {formatTimeDate()}
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5 text-orange-500" />
          ) : (
            <Moon className="w-5 h-5 text-blue-500" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default Header;
