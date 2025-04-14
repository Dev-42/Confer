"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Copy, Link2, LinkIcon, Plus, Video } from "lucide-react";
import { Input } from "../ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const MeetingActions = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setisDialogOpen] = useState(false);
  const [baseUrl, setBaseUrl] = useState("");
  const [generatedMeetingUrl, setGeneratedMeetingUrl] = useState("");
  const [meetingLink, setMeetingLink] = useState("");

  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);

  const handleMeetingForLater = () => {
    const roomId = uuidv4();
    console.log("This is room id", roomId);
    const url = `${baseUrl}/meeting/${roomId}`;
    setGeneratedMeetingUrl(url);
    setisDialogOpen(true);
    toast.success("Meeting link created successfully");
  };

  const handleJoinMeeting = () => {
    if (meetingLink) {
      setLoading(true);
      const formattedLink = meetingLink.includes("http")
        ? meetingLink
        : `${baseUrl}/meeting/${meetingLink}`;
      router.push(formattedLink);
      toast.info("Joining Meeting...");
    } else {
      toast.error("Please enter a valid link or code");
    }
  };

  const handleStartInstantMeeting = () => {
    setLoading(true);
    const roomId = uuidv4();
    // console.log("This is room id", roomId);
    const meetingUrl = `${baseUrl}/meeting/${roomId}`;
    router.push(meetingUrl);
    toast.info("Joining meeting...");
  };

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(generatedMeetingUrl);
    toast.info("Link copied successfully");
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="w-full sm:w-auto" size="lg">
              <Video className="w-5 h-5 mr-2" />
              New meeting
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={handleMeetingForLater}>
              <Link2 className="w-4 h-4 mr-2" />
              create meeting for later
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleStartInstantMeeting}>
              <Plus className="w-4 h-4 mr-2" />
              start an instant meeting
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex w-full sm:w-auto relative rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <span className="absolute left-3 top-1/2 -translate-y-1/2">
            <LinkIcon className="w-5 h-5 text-gray-400 dark:text-gray-500" />
          </span>

          <Input
            placeholder="Enter a code or link"
            className="pl-10 pr-4 py-3 w-full sm:w-[20rem] text-sm rounded-none border-0 focus:outline-none focus:ring-0 bg-transparent text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            value={meetingLink}
            onChange={(e) => setMeetingLink(e.target.value)}
          />

          <Button
            variant="default"
            className="rounded-none rounded-r-xl px-5 bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white font-semibold transition"
            onClick={handleJoinMeeting}
          >
            Join
          </Button>
        </div>
      </div>
      <Dialog open={dialogOpen} onOpenChange={setisDialogOpen}>
        <DialogContent className="max-w-sm rounded-lg p-6">
          <DialogHeader>
            <DialogTitle className="text-3xl font-normal">
              Here's your joining info
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Send this to people you want to meet with. Be sure to save it so
              you can use it later, too.
            </p>
            <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <span className="text-gray-700 dark:text-gray-200 break-all">
                {generatedMeetingUrl.slice(0, 30)}...
              </span>
              <Button
                variant="ghost"
                className="hover:bg-gray-200"
                onClick={copyToClipBoard}
              >
                <Copy className="w-5 h-5 text-orange-500" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MeetingActions;
