import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Share2, Bookmark } from "lucide-react";
import { format } from "date-fns";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";

const mockPost = {
  id: "1",
  title: "How to structure scalable React apps",
  content:
    "Patterns and folder structure that make your React apps maintainable and scalable.",
  author: { name: "Ali Khan" },
  date: "2025-10-08",
  tags: ["react", "architecture"],
  cover:
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80",
  readingTime: 6,
};

interface BlogPostPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { id } = await params;
  console.log(id);
  const post = mockPost;

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return post;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params;
  console.log(id);
  const post = mockPost;

  if (!post) {
    notFound();
  }

  const formattedDate = format(post.date, "MMMM d, yyyy");

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <nav>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>

            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Bookmark className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white border rounded-xl shadow-lg ">
        <article>
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Author and Meta Info */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 pb-6">
              <div className="flex items-center mb-4 sm:mb-0">
                <Avatar className="w-12 h-12 mr-4">
                  <AvatarFallback>
                    {post.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-gray-900">
                    {post.author.name}
                  </div>
                </div>
              </div>

              <div className="flex items-center text-sm text-gray-500 space-x-6">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {formattedDate}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {post.readingTime} min read
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-lg max-w-none mb-8">
            <div
              className="text-gray-800 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: post.content,
              }}
            />
          </div>
        </article>
      </main>
    </div>
  );
}
