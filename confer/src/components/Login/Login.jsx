"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
    <div className="min-h-screen flex bg-gradient-to-r from-blue-100 to-purple-200 dark:from-gray-950 dark:to-gray-900">
      {/* Left Image Section */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden rounded-r-3xl shadow-2xl">
        <Image
          src="/images/meet.png"
          layout="fill"
          objectFit="cover"
          alt="Meeting preview"
          className="transition-transform duration-500 ease-in-out scale-105 hover:scale-100"
        />
      </div>

      {/* Right Login Section */}
      <div className="flex flex-col justify-center w-full px-6 py-12 lg:w-1/2">
        <div className="max-w-md mx-auto space-y-8">
          <div>
            <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Welcome to Confer
            </h1>
            <p className="mt-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Meet, collaborate, and stay connected with stunning HD video and
              crystal-clear audio—anywhere, anytime.
            </p>
          </div>

          {/* Google Button */}
          <Button
            onClick={() => {
              setLoading(true);
              signIn("google");
            }}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-white dark:hover:text-black transition-all shadow-sm cursor-pointer"
            variant="outline"
          >
            <svg
              width="800px"
              height="800px"
              viewBox="-3 0 262 262"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid"
            >
              <path
                d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                fill="#4285F4"
              />
              <path
                d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                fill="#34A853"
              />
              <path
                d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                fill="#FBBC05"
              />
              <path
                d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                fill="#EB4335"
              />
            </svg>
            Login with Google
          </Button>

          {/* Divider */}
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600" />
            <span className="mx-4 text-sm text-gray-500 dark:text-gray-400 uppercase">
              or
            </span>
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600" />
          </div>

          {/* GitHub Button */}
          <Button
            onClick={() => {
              setLoading(true);
              signIn("github");
            }}
            className="w-full flex items-center justify-center gap-3 bg-black text-white hover:bg-white hover:text-black dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-all shadow-sm cursor-pointer"
            variant="ghost"
          >
            <FaGithub className="w-5 h-5" />
            Login with GitHub
          </Button>

          {/* Skip Login Link */}
          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            Don’t want to login/register?
            <Link
              href="/landing"
              className="ml-1 text-blue-500 hover:underline dark:text-blue-400"
            >
              Click here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
