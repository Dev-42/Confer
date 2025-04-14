"use client";
import React, { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import Image from "next/image";

const Meeting = () => {
  const params = useParams();
  const roomId = params.roomId;
  //   console.log(roomId);
  const { data: session, status } = useSession();
  const router = useRouter();
  const containerRef = useRef(null); //ref for storing video container element
  const [zp, setZp] = useState(null);
  const [isInMeeting, setisInMeeting] = useState(false);

  useEffect(() => {
    if (
      status === "authenticated" &&
      session?.user?.name &&
      containerRef.current
    ) {
      console.log("Session authenticated, joining meeting");
      joinMeeting(containerRef.current);
    } else if (status === "unauthenticated") {
      console.log("Session is unauthenticated. Please login first.");
      toast.error("Please login before using our services");
      router.push("/secureConfer"); // Optional: redirect to login
    }
  }, [session, status]);

  useEffect(() => {
    return () => {
      if (zp) {
        zp.destroy();
      }
    };
  }, [zp]);

  let joinMeeting = async (element) => {
    // generate Kit Token
    const appID = Number(process.env.NEXT_PUBLIC_ZEGOAPP_ID);
    const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET;
    if (!appID && !serverSecret) {
      throw new Error("Please provide appId and secret key");
    }
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      session?.user?.email || Date.now().toString(),
      session?.user?.name || "guest"
    );

    // Create instance object from Kit Token.
    const zegoInstance = ZegoUIKitPrebuilt.create(kitToken);
    setZp(zegoInstance);
    // start the call
    zegoInstance.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Join via this link",
          url: `${window.location.origin}/meeting/${roomId}`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
      },
      showAudioVideoSettingsButton: true,
      showScreenSharingButton: true,
      showTurnOffRemoteCameraButton: true,
      showTurnOffRemoteMicrophoneButton: true,
      showRemoveUserButton: true,
      onJoinRoom: () => {
        toast.success("Meeting joined successfully");
        setisInMeeting(true);
      },
      onLeaveRoom: () => {
        endMeeting();
      },
    });
  };

  const endMeeting = () => {
    if (zp) {
      zp.destroy();
    }
    toast.success("Meeting ends successfully");
    setZp(null);
    setisInMeeting(false);
    router.push("/");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <div
        className={`flex-grow flex flex-col md:flex-row relative ${
          isInMeeting ? "h-screen" : ""
        }`}
      >
        <div
          className="video-container flex-grow"
          ref={containerRef}
          style={{ height: isInMeeting ? "100%" : "calc(100vh - 4rem)" }}
        ></div>
      </div>
    </div>
  );
};

export default Meeting;
