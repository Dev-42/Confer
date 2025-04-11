"use client";
import React, { useState } from "react";
import { useTheme } from "next-themes";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Info, LogOut, Moon, Plus, Sun, SunIcon, Video, X } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Header = () => {
  const router = useRouter();
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

  const userPlaceHolder = session?.user?.name
    ?.split(" ")
    .map((name) => name[0])
    .join("");

  const handleLogout = async () => {
    console.log("Logging out...");
    await signOut({ redirect: false });
    router.push("/secureConfer");
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
        <Button variant="ghost" size="icon" className="hidden md:block">
          <Info className="w-5 h-5 ml-2" />
        </Button>
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              {session?.user?.image ? (
                <AvatarImage
                  src={session?.user?.image}
                  alt={session?.user?.name}
                />
              ) : (
                <AvatarFallback className="text-lg dark:bg-gray-300">
                  {userPlaceHolder}
                </AvatarFallback>
              )}
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-gray-800 dark:text-white">
                {session?.user?.email}
              </span>
              <Button
                className="rounded-full p-4"
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex flex-col items-center mb-4">
              <Avatar>
                {session?.user?.image ? (
                  <AvatarImage
                    src={session?.user?.image}
                    alt={session?.user?.name}
                  />
                ) : (
                  <AvatarFallback className="text-lg dark:bg-gray-300">
                    {userPlaceHolder}
                  </AvatarFallback>
                )}
              </Avatar>
              <h1 className="text-xl font-semibold mt-2">
                Hi, {session?.user?.name}!
              </h1>
            </div>
            <div className="flex mb-4">
              <Button
                className="w-1/2 h-14 rounded-l-full cursor-pointer"
                variant="outline"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Account
              </Button>
              <Button
                className="w-1/2 h-14 rounded-r-full cursor-pointer"
                variant="outline"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                SignOut
              </Button>
            </div>
            <div className="text-center text-sm text-gray-500">
              <Link href="#" className="hover:bg-gray-300 p-2 rounded-lg">
                Privacy Policy
              </Link>
              {" . "}
              <Link href="#" className="hover:bg-gray-300 p-2 rounded-lg">
                Terms of Service
              </Link>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;
