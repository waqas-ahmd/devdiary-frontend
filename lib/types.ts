export interface Post {
  _id: string;
  title: string;
  handle: string;
  content: string;
  featuredImage?: string;
  author: {
    name: string;
  };
  status: "published" | "draft";
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  tags: string[];
  readingTime: number;
}
