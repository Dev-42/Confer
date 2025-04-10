import React from "react";
import Login from "@/components/Login/Login";

// SEO + Social Metadata
export const metadata = {
  title: "Confer | Seamless HD Video Conferencing Anywhere",
  description:
    "Confer is your go-to platform for stunning HD video calls and collaboration. Join meetings with ease, clarity, and security — from anywhere in the world.",
  keywords:
    "video conferencing, HD meetings, online collaboration, Google login, GitHub login, Confer app",
  authors: [{ name: "Dev Bhattacharya", url: "https://github.com/Dev-42" }],
  creator: "Dev Bhattacharya",
  openGraph: {
    title: "Confer | Seamless HD Video Conferencing Anywhere",
    description:
      "Confer is a modern video conferencing solution with Google and GitHub login. Crystal-clear audio, HD video, and reliable performance built for productivity.",
    url: "https://yourdomain.com/login", // replace with your domain
    siteName: "Confer",
    images: [
      {
        url: "/images/ConferIcon.png", // replace with your OG image
        width: 1200,
        height: 630,
        alt: "Confer HD Video Meeting",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Confer | Seamless HD Video Conferencing",
    description:
      "Meet, collaborate, and connect on Confer. Your meetings have never been this smooth and secure.",
    creator: "@dev_bhatt_42", // optional: your Twitter handle
    images: ["/images/ConferIcon.png"], // same image as above
  },
  metadataBase: new URL("https://yourdomain.com"), // update this with actual domain
  robots: "index, follow",
  icons: {
    icon: "/images/favicon.ico",
  },
};

const page = () => {
  return <Login />;
};

export default page;
