"use client";
import api from "@/api";
import Header from "@/components/header";
import PostEditor from "@/components/post-editor";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { FileText, LoaderCircleIcon } from "lucide-react";
import { useParams } from "next/navigation";

export default function CreatePostPage() {
  const params = useParams();
  const id = (params.id || "") as string;
  const post = useQuery({
    queryKey: ["edit-post", id],
    queryFn: () => api.post.get(id),
    enabled: !!id,
    retry: false,
    refetchOnMount: false,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Your Post</h1>
          <p className="mt-2 text-gray-600">
            Update your content and keep your audience engaged
          </p>
        </div>

        {post.isError ? (
          <Card className="text-center h-80 items-center justify-center flex w-full col-span-3">
            <CardContent>
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Post not found
              </h3>
              <p className="text-gray-600 mb-6">
                Make sure the post ID is correct or try again later.
              </p>
            </CardContent>
          </Card>
        ) : post.isPending ? (
          <Card className="text-center h-80 items-center justify-center flex w-full col-span-3">
            <CardContent>
              <div className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <LoaderCircleIcon className="animate-spin" /> Loading...
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <PostEditor
              defaultValues={{
                id,
                ...post?.data?.post,
              }}
            />
          </>
        )}
      </main>
    </div>
  );
}
