"use client";
import { Button } from "@/components/ui/button";
import { Post } from "@/lib/types";
import { Share2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";

interface ShareButtonProps {
  post: Post;
}

const ShareButton = ({ post }: ShareButtonProps) => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => {
        const shareData = {
          title: post.title,
          text: post.title,
          url: window.location.href,
        };
        if (navigator.share) {
          navigator.share(shareData).catch((error) => console.log(error));
        } else {
          navigator.clipboard.writeText(window.location.href);
          toast("Link copied to clipboard");
        }
      }}
    >
      <Share2 className="w-4 h-4" />
      <span className="hidden sm:block">Share</span>
    </Button>
  );
};

export default ShareButton;
