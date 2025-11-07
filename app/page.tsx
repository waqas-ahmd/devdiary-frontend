"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useMemo, useState } from "react";
import { format } from "date-fns";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Example TypeScript types
type Post = {
  id: string;
  title: string;
  content: string;
  author: { name: string };
  date: string;
  tags: string[];
  cover?: string;
  readingTime: number;
};

const MOCK_POSTS: Post[] = [
  {
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
  },
  {
    id: "2",
    title: "A practical guide to Tailwind + shadcn",
    content: "Using shadcn components with Tailwind for faster UI development.",
    author: { name: "Sara Malik" },
    date: "2025-09-20",
    tags: ["tailwind", "ui"],
    cover:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80",
    readingTime: 8,
  },
  {
    id: "3",
    title: "Intro to Serverless with AWS & Node.js",
    content:
      "Deploy small REST APIs without managing servers using Lambdas and API Gateway.",
    author: { name: "Waqas Ahmad" },
    date: "2025-08-03",
    tags: ["aws", "serverless"],
    cover:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80",
    readingTime: 10,
  },
];

export default function BlogsListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [tagFilter, setTagFilter] = useState<string | undefined>(undefined);
  const [sortBy, setSortBy] = useState("newest");

  const allTags = useMemo(() => {
    const s = new Set<string>();
    MOCK_POSTS.forEach((p) => p.tags.forEach((t) => s.add(t)));
    return Array.from(s).sort();
  }, []);

  const filtered = useMemo(() => {
    let data = [...MOCK_POSTS];

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
      if (sortBy === "newest") return +new Date(b.date) - +new Date(a.date);
      if (sortBy === "oldest") return +new Date(a.date) - +new Date(b.date);
      if (sortBy === "reading") return a.readingTime - b.readingTime;
      return 0;
    });

    return data;
  }, [searchQuery, tagFilter, sortBy]);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold">DevDiary</h1>
          <p className="text-sm text-muted-foreground">
            Latest articles, tutorials and case studies.
          </p>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap gap-2 items-center w-full md:w-auto">
          <Input
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            className="min-w-[220px]"
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
        </div>
      </header>

      <main>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.length === 0 ? (
            <Card className="col-span-full p-8 text-center">
              <CardHeader>
                <CardTitle>No results</CardTitle>
                <CardDescription>
                  Try different keywords or clear filters.
                </CardDescription>
              </CardHeader>
            </Card>
          ) : (
            filtered.map((post) => (
              <article key={post.id} className="rounded-lg">
                <Card className="overflow-hidden h-full flex flex-col py-0 gap-2">
                  {post.cover && (
                    <div className="w-full relative">
                      <img
                        src={post.cover}
                        alt={post.title}
                        className="object-cover aspect-video w-full"
                      />
                    </div>
                  )}

                  <CardContent className="flex-1 flex flex-col p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="font-semibold">
                            {post.author.name.split(" ")[0][0]}
                            {post.author.name.split(" ")[1][0]}
                          </AvatarFallback>
                        </Avatar>

                        <div>
                          <p className="text-sm font-medium">
                            {post.author.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {format(new Date(post.date), "MMM d, yyyy")}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {post.tags.map((t) => (
                          <Badge
                            key={t}
                            className="uppercase text-[10px] tracking-wide"
                          >
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mb-1 text-xs text-muted-foreground">
                      {post.readingTime} min read
                    </div>
                    <h3 className="text-lg font-semibold leading-snug mb-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                      {post.content}
                    </p>

                    <div className="mt-auto flex items-center justify-between">
                      <Link href={`/posts/${post.id}`}>
                        <Button variant="outline" size="sm">
                          Read more
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </article>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
