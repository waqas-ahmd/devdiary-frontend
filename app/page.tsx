"use client";
import React, { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/header";
import { useQuery } from "@tanstack/react-query";
import api from "@/api";
import { Post } from "@/lib/types";
import PostCard from "@/components/post-card";
import {
  CircleAlert,
  FileText,
  LoaderCircleIcon,
  RefreshCwIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BlogsListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [tagFilter, setTagFilter] = useState<string | undefined>(undefined);
  const [sortBy, setSortBy] = useState("newest");

  const allPosts = useQuery({
    queryKey: ["posts"],
    queryFn: api.post.listPublished,
    refetchOnMount: false,
  });

  const allTags = useMemo(() => {
    const s = new Set<string>();
    allPosts.data?.posts.forEach((p: Post) => p.tags.forEach((t) => s.add(t)));
    return Array.from(s).sort();
  }, [allPosts.data]);

  const filtered = useMemo(() => {
    let data = [...(allPosts.data?.posts || [])].filter(
      (p) => p.status === "published"
    );

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      data = data.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.content.toLowerCase().includes(q)
      );
    }

    if (tagFilter) data = data.filter((p) => p.tags.includes(tagFilter));

    data.sort((a, b) => {
      if (sortBy === "newest")
        return +new Date(b.publishedAt!) - +new Date(a.publishedAt!);
      if (sortBy === "oldest")
        return +new Date(a.publishedAt!) - +new Date(b.publishedAt!);
      if (sortBy === "reading") return a.readingTime - b.readingTime;
      return 0;
    });

    return data;
  }, [searchQuery, tagFilter, sortBy, allPosts.data]);

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-6">
        {/* Filters */}
        <section className="flex flex-wrap sm:flex-nowrap gap-2 items-center w-full md:w-auto my-6">
          <Input
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            className="min-w-[220px] max-w-[320px]"
            aria-label="Search posts"
          />

          <Select
            onValueChange={(val) => {
              if (val === "_") setTagFilter(undefined);
              else setTagFilter(val);
            }}
            value={tagFilter}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter tag" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="_">All</SelectItem>
              {allTags.map((t) => (
                <SelectItem value={t} key={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={(val) => setSortBy(val)}>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="reading">Reading time</SelectItem>
            </SelectContent>
          </Select>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.length === 0 ? (
            <Card className="text-center h-80 items-center justify-center flex w-full col-span-3">
              {allPosts.isPending ? (
                <CardContent>
                  <div className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <LoaderCircleIcon className="animate-spin" /> Loading
                    posts...
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
                    {searchQuery
                      ? "Try adjusting your search or filters"
                      : "No posts available yet."}
                  </p>
                </CardContent>
              )}
            </Card>
          ) : (
            filtered.map((post) => <PostCard key={post._id} post={post} />)
          )}
        </section>
      </div>
    </div>
  );
}
