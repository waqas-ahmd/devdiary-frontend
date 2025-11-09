"use client";
/* eslint-disable @next/next/no-img-element */
import { Post } from "@/lib/types";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  CalendarIcon,
  ClockIcon,
  EditIcon,
  EyeIcon,
  FileTextIcon,
  Trash2Icon,
  TrendingUpIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { format } from "date-fns";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api";
import { toast } from "sonner";
import { toastError } from "@/lib/utils";

interface UserPostCardProps {
  post: Post;
}

const statusColors = {
  published: "bg-green-100 text-green-800 border-green-200",
  draft: "bg-yellow-100 text-yellow-800 border-yellow-200",
};

const UserPostCard = ({ post }: UserPostCardProps) => {
  const qc = useQueryClient();

  const deletePost = useMutation({
    mutationFn: api.post.delete,
    onSuccess: () => {
      toast.warning("Post deleted successfully");
      qc.invalidateQueries({ queryKey: ["user-posts"] });
    },
    onError: toastError,
  });

  return (
    <Card
      key={post._id}
      className="overflow-hidden hover:shadow-lg transition-shadow py-0 gap-0"
    >
      {/* Featured Image */}
      <div className="relative w-full">
        <img
          src={post.featuredImage || "/placeholder-image.png"}
          alt={post.title}
          className="object-cover w-full aspect-video"
        />
      </div>

      <CardContent className="p-6">
        {/* Status and Actions */}
        <div className="flex items-center justify-between mb-3">
          <Badge className={statusColors[post.status as Post["status"]]}>
            {post.status === "published" ? (
              <TrendingUpIcon />
            ) : (
              <FileTextIcon />
            )}
            <span className="ml-1 capitalize">{post.status}</span>
          </Badge>

          <div className="flex items-center space-x-2">
            <Link href={`/posts/${post.handle}`} target="_blank">
              <Button variant="ghost" size="sm">
                <EyeIcon className="w-4 h-4" />
              </Button>
            </Link>
            <Link href={`/edit/${post._id}`} target="_blank">
              <Button variant="ghost" size="sm">
                <EditIcon className="w-4 h-4" />
              </Button>
            </Link>
            <Dialog>
              <DialogTrigger>
                <Button
                  variant="ghost"
                  size="sm"
                  //   onClick={() => handleDelete(post._id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2Icon className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your post.
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
          </div>
        </div>

        {/* Title and Excerpt */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {post.title}
        </h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {post.tags.slice(0, 3).map((tag: string) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {post.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{post.tags.length - 3}
            </Badge>
          )}
        </div>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <CalendarIcon className="w-3 h-3 mr-1" />
              {format(post.createdAt, "MMM d, yyyy")}
            </div>
            <div className="flex items-center">
              <ClockIcon className="w-3 h-3 mr-1" />
              {post.readingTime} min
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserPostCard;
