"use client";

import dynamic from "next/dynamic";

// Dynamically import Meeting component with SSR disabled
const Meeting = dynamic(() => import("@/components/MeetingPage/Meeting"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center h-screen text-gray-600 dark:text-gray-300">
      Loading meeting...
    </div>
  ),
});

const Page = () => {
  return <Meeting />;
};

export default Page;
