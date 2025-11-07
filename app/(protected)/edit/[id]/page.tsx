import Header from "@/components/header";
import PostEditor from "@/components/post-editor";
import { Metadata } from "next";
import mockPosts from "@/data/posts.json";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { id } = await params;
  console.log(id);
  const post = mockPosts.find((p) => p._id === id);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return post;
}

export default async function CreatePostPage({ params }: BlogPostPageProps) {
  const { id } = await params;
  console.log(id);
  const post = mockPosts.find((p) => p._id === id);

  if (!post) {
    notFound();
  }
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

        <PostEditor
          defaultValues={{
            title: post.title,
            image: post.featuredImage,
            content: post.content,
            tags: post.tags,
          }}
        />
      </main>
    </div>
  );
}
