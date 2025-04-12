"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Header from "../shared/Header";
import MeetingActions from "../shared/MeetingActions";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      setLoading(false);
      const hasShownWelcome = localStorage.getItem("hasShownWelcome");
      if (!hasShownWelcome) {
        toast.success(`Welcome to Confer ${session?.user?.name}!`);
        localStorage.setItem("hasShownWelcome", true);
      }
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [status, session]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-200 dark:from-gray-950 dark:to-gray-900">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin" />
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
            Redirecting...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden min-h-screen flex flex-col bg-gradient-to-tr from-blue-50 via-white to-purple-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-all duration-300">
      <Header />

      {/* Blurred blob background */}
      <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-gradient-to-br from-blue-400 to-purple-500 opacity-30 blur-3xl rounded-full -z-10 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-[30rem] h-[30rem] bg-gradient-to-tr from-fuchsia-400 to-blue-300 opacity-20 blur-3xl rounded-full -z-10 animate-pulse" />

      <main className="flex-grow p-4 md:p-[-6] mt-20 md:mt-23 z-10 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-16">
          {/* Left Content */}
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-gray-900 dark:text-white">
              Meet <span className="text-blue-600">face-to-face</span>
              <br />
              from <span className="text-purple-500">anywhere</span>
            </h1>
            <p className="text-lg md:text-2xl text-gray-700 dark:text-gray-300 max-w-xl">
              High-quality, reliable, and secure video conferencing — whether
              it’s for work, friends, or family.
            </p>
            <MeetingActions />
          </div>

          {/* Right: Video preview background */}
          <div className="relative rounded-3xl shadow-xl overflow-hidden border border-white/20 dark:border-white/10">
            <video
              autoPlay
              muted
              loop
              preload="auto"
              className="w-full h-full object-cover rounded-3xl"
              poster="/poster.jpg"
            >
              <source
                src="https://res.cloudinary.com/dxwxn2ncy/video/upload/v1744465767/ConferfinalVideo_ra6cso.webm"
                type="video/webm"
              />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-black/20 rounded-3xl" />
          </div>
        </div>
      </main>
    </div>
  );
}
