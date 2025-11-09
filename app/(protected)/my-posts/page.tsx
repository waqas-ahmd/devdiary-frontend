"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Plus,
  FileText,
  CircleAlert,
  RefreshCwIcon,
  LoaderCircleIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/header";
import { useQuery } from "@tanstack/react-query";
import UserPostCard from "@/components/user-post-card";
import api from "@/api";

export default function MyPostsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState("newest");

  const allPosts = useQuery({
    queryKey: ["user-posts"],
    queryFn: api.post.list,
    retry: false,
  });

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let filtered = [...(allPosts.data?.posts || [])];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.tags.some((tag: string) => tag.toLowerCase().includes(query))
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((post) => post.status === statusFilter);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case "updated":
          return (
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, statusFilter, sortBy, allPosts.data]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <section className="bg-gray-100 border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <div>
            <h1 className="text-3xl font-bold">My Posts</h1>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search posts by title, content, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Posts</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Drafts</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="updated">Recently Updated</SelectItem>
              <SelectItem value="title">Alphabetical</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Posts Grid */}
        {filteredPosts.length === 0 ? (
          <Card className="text-center h-80 items-center justify-center flex">
            {allPosts.isPending ? (
              <CardContent>
                <div className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <LoaderCircleIcon className="animate-spin" /> Loading posts...
                </div>
              </CardContent>
            ) : allPosts.isError ? (
              <CardContent>
                <CircleAlert className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Error loading posts
                </h3>
                <p className="text-gray-600 mb-6">
                  Try refreshing the page or come back later.
                </p>
                <Button onClick={() => allPosts.refetch()}>
                  <RefreshCwIcon className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </CardContent>
            ) : (
              <CardContent>
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No posts found
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchQuery || statusFilter !== "all"
                    ? "Try adjusting your search or filters"
                    : "You haven't created any posts yet"}
                </p>
                {!searchQuery && statusFilter === "all" && (
                  <Link href="/create">
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Create Your First Post
                    </Button>
                  </Link>
                )}
              </CardContent>
            )}
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <UserPostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
