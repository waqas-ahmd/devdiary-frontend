import Header from "@/components/header";
import PostEditor from "@/components/post-editor";

export default function CreatePostPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create New Post</h1>
          <p className="mt-2 text-gray-600">
            Share your thoughts and ideas with the community
          </p>
        </div>

        <PostEditor />
      </main>
    </div>
  );
}
