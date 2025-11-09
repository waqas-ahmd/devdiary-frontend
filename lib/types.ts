export interface Post {
  _id: string;
  title: string;
  handle: string;
  content: string;
  featuredImage?: string;
  author: {
    _id: string;
    name: string;
  };
  status: "published" | "draft";
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  tags: string[];
  readingTime: number;
}

export interface ApiError {
  message: string;
}
