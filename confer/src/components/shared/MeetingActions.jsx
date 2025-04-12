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
        <div className="flex w-full sm:w-auto relative">
          <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
            <LinkIcon className="w-4 h-4 text-gray-400" />
          </span>
          <Input
            placeholder="Enter a code or link"
            className="pl-8 rounded-r-none pr-10"
            value={meetingLink}
            onChange={(e) => setMeetingLink(e.target.value)}
          />
          <Button
            variant="secondary"
            className="rounded-l-none"
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
