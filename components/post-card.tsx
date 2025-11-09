/* eslint-disable @next/next/no-img-element */
import { Post } from "@/lib/types";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { format } from "date-fns";
import Link from "next/link";
import { Button } from "./ui/button";
import { getInitials } from "@/lib/utils";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <article key={post._id} className="rounded-lg">
      <Card className="overflow-hidden h-full flex flex-col py-0 gap-2">
        <div className="w-full relative">
          <img
            src={post.featuredImage || "/placeholder-image.png"}
            alt={post.title}
            className="object-cover aspect-video w-full"
          />
          <div className="flex flex-wrap items-center gap-2 pb-2 absolute bottom-0 left-0 w-full px-4">
            {post.tags.map((t: string) => (
              <Badge
                key={t}
                className="uppercase text-[9px] font-bold tracking-wide bg-white/80 text-black"
              >
                {t}
              </Badge>
            ))}
          </div>
        </div>

        <CardContent className="flex-1 flex flex-col p-4">
          <div className="mb-1 text-xs text-muted-foreground">
            {post.readingTime} min read
          </div>
          <h3 className="text-lg font-semibold leading-snug mb-2">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
            {post.content.replace(/<[^>]+>/g, "").slice(0, 150)}...
          </p>

          <div className="flex items-center justify-between my-3">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="font-semibold">
                  {getInitials(post.author.name)}
                </AvatarFallback>
              </Avatar>

              <div>
                <p className="text-sm font-medium">{post.author.name}</p>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(post.publishedAt!), "MMM d, yyyy")}
                </p>
              </div>
            </div>

            <Link href={`/posts/${post.handle}`}>
              <Button variant="outline" size="sm">
                Read more
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </article>
  );
};

export default PostCard;
