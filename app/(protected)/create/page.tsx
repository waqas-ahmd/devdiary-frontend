/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { RichTextEditor } from "@/components/richtext-editor";
import Header from "@/components/header";

// Form validation schema
const createPostSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title must be less than 100 characters"),
  image: z
    .string()
    .url("Please enter a valid image URL")
    .optional()
    .or(z.literal("")),
  content: z.string().min(50, "Content must be at least 50 characters"),
  tags: z.string().optional(),
});

type CreatePostFormValues = z.infer<typeof createPostSchema>;

export default function CreatePostPage() {
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const form = useForm<CreatePostFormValues>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      image: "",
      content: "",
      tags: "",
    },
  });

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const onSubmit = async (values: CreatePostFormValues, isDraft = false) => {
    console.log("Form Values:", isDraft, values);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create New Post</h1>
          <p className="mt-2 text-gray-600">
            Share your thoughts and ideas with the community
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => onSubmit(values, false))}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Title */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">
                        Post Title
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter an engaging title for your post"
                          className="text-lg py-3"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Content Editor */}
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">
                        Content
                      </FormLabel>
                      <FormControl>
                        <RichTextEditor
                          content={field.value}
                          onChange={field.onChange}
                          placeholder="Start writing your post..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Featured Image */}
                <Card>
                  <CardHeader>
                    <CardTitle>Featured Image</CardTitle>
                    <CardDescription>
                      Add a cover image for your post
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="image"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="https://example.com/image.jpg"
                            />
                          </FormControl>
                          <FormDescription>
                            Enter a URL for your featured image
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {form.watch("image") && form.watch("image")!.trim() && (
                      <div className="mt-4 w-full">
                        <img
                          src={form.watch("image")!}
                          alt="Featured"
                          className="object-cover rounded-lg w-full aspect-video"
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Tags */}
                <Card>
                  <CardHeader>
                    <CardTitle>Tags</CardTitle>
                    <CardDescription>
                      Add tags to categorize your post
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex space-x-2">
                        <Input
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Add a tag"
                        />
                        <Button
                          type="button"
                          onClick={addTag}
                          variant="outline"
                          disabled={!tagInput.trim()}
                        >
                          Add
                        </Button>
                      </div>
                      {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="cursor-pointer"
                              onClick={() => removeTag(tag)}
                            >
                              {tag} ×
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Publish Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Publish</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button type="submit" className="w-full">
                      Publish Post
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() =>
                        form.handleSubmit((values) => onSubmit(values, true))()
                      }
                    >
                      Save as Draft
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </Form>
      </main>
    </div>
  );
}
