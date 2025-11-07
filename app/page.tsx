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
import Header from "@/components/header";
import MOCK_POSTS from "@/data/posts.json";

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
    let data = [...MOCK_POSTS].filter((p) => p.status === "published");

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
  }, [searchQuery, tagFilter, sortBy]);

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
              <article key={post._id} className="rounded-lg">
                <Card className="overflow-hidden h-full flex flex-col py-0 gap-2">
                  {post.featuredImage && (
                    <div className="w-full relative">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="object-cover aspect-video w-full"
                      />
                      <div className="flex flex-wrap items-center gap-2 pb-2 absolute bottom-0 left-0 w-full px-4">
                        {post.tags.map((t) => (
                          <Badge
                            key={t}
                            className="uppercase text-[9px] font-bold tracking-wide bg-white/80 text-black"
                          >
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <CardContent className="flex-1 flex flex-col p-4">
                    <div className="mb-1 text-xs text-muted-foreground">
                      {post.readingTime} min read
                    </div>
                    <h3 className="text-lg font-semibold leading-snug mb-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                      {post.content}
                    </p>

                    <div className="flex items-center justify-between my-3">
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
            ))
          )}
        </section>
      </div>
    </div>
  );
}
