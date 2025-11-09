/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/incompatible-library */
"use client";
import { useEffect, useState } from "react";
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
import { useMutation } from "@tanstack/react-query";
import api from "@/api";
import { toast } from "sonner";
import { toastError } from "@/lib/utils";
import { useRouter } from "next/navigation";

const createPostSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title must be less than 100 characters"),
  featuredImage: z
    .string()
    .url("Please enter a valid image URL")
    .optional()
    .or(z.literal("")),
  content: z.string().min(50, "Content must be at least 50 characters"),
  tags: z.string().array().optional(),
});

type CreatePostFormValues = z.infer<typeof createPostSchema>;

interface EditPostFormValues extends Partial<CreatePostFormValues> {
  id: string;
}

interface PostEditorProps {
  defaultValues?: EditPostFormValues;
}

const PostEditor = ({ defaultValues }: PostEditorProps) => {
  const [tags, setTags] = useState<string[]>(defaultValues?.tags || []);
  const [tagInput, setTagInput] = useState("");

  const router = useRouter();

  const form = useForm<CreatePostFormValues>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      featuredImage: "",
      content: "",
      tags: [],
      ...defaultValues,
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

  const create = useMutation({
    mutationFn: api.post.create,
    onSuccess: (data) => {
      toast.success(
        data.message ||
          `Post created ${
            data?.post?.status === "published"
              ? "and published"
              : "successfully"
          }!`
      );
      router.push(`/edit/${data?.post?._id}`);
    },
    onError: toastError,
  });

  const edit = useMutation({
    mutationFn: api.post.update,
    onSuccess: (data) => {
      toast.success(
        data.message ||
          `Post updated ${
            data?.post?.status === "published" ? "and published" : ""
          }!`
      );
    },
    onError: toastError,
  });

  const onSubmit = async (values: CreatePostFormValues, isDraft = false) => {
    if (defaultValues?.id === undefined) {
      create.mutate({
        ...values,
        status: isDraft ? "draft" : "published",
      });
    } else {
      edit.mutate({
        id: defaultValues.id,
        ...values,
        status: isDraft ? "draft" : "published",
      });
    }
    console.log("Form Values:", isDraft, values);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  useEffect(() => {
    form.setValue("tags", tags);
  }, [tags, form]);
  return (
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
                  name="featuredImage"
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
                {form.watch("featuredImage") &&
                  form.watch("featuredImage")!.trim() && (
                    <div className="mt-4 w-full">
                      <img
                        src={form.watch("featuredImage")!}
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
                <Button
                  type="submit"
                  className="w-full"
                  disabled={create.isPending || edit.isPending}
                >
                  Publish Post
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    form.handleSubmit((values) => onSubmit(values, true))()
                  }
                  disabled={create.isPending || edit.isPending}
                >
                  Save as Draft
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default PostEditor;
