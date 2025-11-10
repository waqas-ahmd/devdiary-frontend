/* eslint-disable @next/next/no-img-element */
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { format } from "date-fns";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/header";
import api from "@/api";
import DeleteButton from "./delete-button";
import EditButton from "./edit-button";
import ShareButton from "./share-button";

interface BlogPostPageProps {
  params: Promise<{ handle: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { handle } = await params;
  const data = await api.post.getByHandle(handle);

  if (!data.post) return { title: "Post Not Found" };

  return {
    title: data.post.title,
    description: data.post.content.replace(/<\/?[^>]+(>|$)/g, "").slice(0, 160),
  };
}

const getPost = async (handle: string) => {
  try {
    const data = await api.post.getByHandle(handle);
    return data.post;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { handle } = await params;
  const post = await getPost(handle);
  if (!post) {
    notFound();
  }

  const formattedDate = format(
    post.publishedAt || post.createdAt,
    "MMMM d, yyyy"
  );

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
              Back
            </Link>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <ShareButton post={post} />
              <DeleteButton post={post} />
              <EditButton post={post} />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-10 bg-white border rounded-xl shadow-lg ">
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
                      .map((n: string) => n[0])
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

            {post.featuredImage && (
              <div className="w-full">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="object-cover w-full h-64"
                />
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map((tag: string) => (
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
