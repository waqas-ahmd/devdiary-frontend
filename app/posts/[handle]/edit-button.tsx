"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { Post } from "@/lib/types";
import { PencilIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface EditButtonProps {
  post: Post;
}

const EditButton = ({ post }: EditButtonProps) => {
  const router = useRouter();
  const { user } = useAuth();

  if (post.author._id !== user?._id) {
    return null;
  }

  return (
    <Button
      onClick={() => router.push(`/edit/${post._id}`)}
      variant="outline"
      size="sm"
    >
      <PencilIcon className="w-4 h-4" />
      <span className="hidden sm:block">Edit</span>
    </Button>
  );
};

export default EditButton;
