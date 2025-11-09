"use client";
import api from "@/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/context/auth-context";
import { Post } from "@/lib/types";
import { toastError } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface DeleteButtonProps {
  post: Post;
}

const DeleteButton = ({ post }: DeleteButtonProps) => {
  const router = useRouter();
  const { user } = useAuth();

  const deletePost = useMutation({
    mutationFn: api.post.delete,
    onSuccess: () => {
      toast.warning("Post deleted successfully");
      router.push("/my-posts");
    },
    onError: toastError,
  });

  if (post.author._id !== user?._id) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant="outline"
          size="sm"
          className="text-red-600 hover:text-red-700"
        >
          <Trash2Icon />
          <span className="hidden sm:block">Delete</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            post.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <DialogClose asChild>
            <Button
              variant="destructive"
              type="submit"
              onClick={() => deletePost.mutate(post._id)}
            >
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteButton;
