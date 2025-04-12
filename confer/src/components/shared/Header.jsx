"use client";
import React, { useState } from "react";
import { useTheme } from "next-themes";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Info, LogOut, Moon, Plus, Sun, Video, X } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();
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
    await signOut({ redirect: false });
    router.push("/secureConfer");
  };

  return (
    <header className="sticky top-0 z-50 w-full px-6 py-4 shadow-md backdrop-blur bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <Link href="/" className="flex items-center space-x-2">
          <Video className="w-7 h-7 text-blue-600" />
          <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Confer
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <span className="hidden sm:inline text-sm text-gray-600 dark:text-gray-300 font-medium">
          {formatTimeDate()}
        </span>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="transition-all duration-300"
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5 text-yellow-500" />
          ) : (
            <Moon className="w-5 h-5 text-blue-500" />
          )}
        </Button>

        <Button variant="ghost" size="icon" className="hidden md:inline">
          <Info className="w-5 h-5" />
        </Button>

        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer hover:scale-105 transition-all duration-300 ring-2 ring-blue-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-900">
              {session?.user?.image ? (
                <AvatarImage src={session.user.image} alt={session.user.name} />
              ) : (
                <AvatarFallback className="text-lg bg-blue-100 text-blue-600 dark:bg-gray-700 dark:text-white">
                  {userPlaceHolder}
                </AvatarFallback>
              )}
            </Avatar>
          </DropdownMenuTrigger>

          <AnimatePresence>
            {open && (
              <DropdownMenuContent asChild align="end">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="w-80 p-4 rounded-2xl border bg-white/70 dark:bg-gray-800/80 backdrop-blur-xl shadow-2xl space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white truncate max-w-[220px]">
                      {session?.user?.email}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setOpen(false)}
                    >
                      <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                    </Button>
                  </div>

                  <div className="flex flex-col items-center">
                    <Avatar className="w-16 h-16">
                      {session?.user?.image ? (
                        <AvatarImage
                          src={session.user.image}
                          alt={session.user.name}
                        />
                      ) : (
                        <AvatarFallback className="text-xl dark:bg-gray-300">
                          {userPlaceHolder}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <h1 className="text-lg font-semibold mt-2 text-gray-900 dark:text-white">
                      Hi, {session?.user?.name}!
                    </h1>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      className="w-1/2 h-12 rounded-full"
                      variant="outline"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Account
                    </Button>
                    <Button
                      className="w-1/2 h-12 rounded-full"
                      variant="destructive"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-1" />
                      Sign Out
                    </Button>
                  </div>

                  <div className="text-center text-xs text-gray-500 dark:text-gray-400">
                    <Link href="#" className="hover:underline">
                      Privacy Policy
                    </Link>{" "}
                    ·{" "}
                    <Link href="#" className="hover:underline">
                      Terms of Service
                    </Link>
                  </div>
                </motion.div>
              </DropdownMenuContent>
            )}
          </AnimatePresence>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
