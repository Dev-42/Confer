"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Header from "../shared/Header";
import MeetingActions from "../shared/MeetingActions";
import MeetingFeature from "../shared/MeetingFeature";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  console.log("User session is", session);
  console.log(status);

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
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      <main className="flex-grow p-8 mt-32">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Left div */}
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                Video calls and meetings for everyone
              </h1>
              <p className="text-3xl text-gray-600 dark:text-gray-300 mb-12">
                Connect, collaborate, and celebrate from anywhere with Confer
              </p>
              <MeetingActions />
            </div>
            <div className="md:w-1/2">
              <MeetingFeature />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
