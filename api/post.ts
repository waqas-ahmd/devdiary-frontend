import apiClient, { handleRequest } from "@/lib/axios";

interface CreatePostData {
  title: string;
  handle: string;
  content: string;
  featuredImage?: string;
  tags: string[];
  status: "published" | "draft";
}

const create = (data: CreatePostData) =>
  handleRequest(apiClient.post("/posts", data));

const get = (id: string) => handleRequest(apiClient.get(`/posts/${id}`));

const list = () => handleRequest(apiClient.get("/posts"));

const update = (id: string, data: Partial<CreatePostData>) =>
  handleRequest(apiClient.put(`/posts/${id}`, data));

const deletePost = (id: string) =>
  handleRequest(apiClient.delete(`/posts/${id}`));

const getByHandle = (handle: string) =>
  handleRequest(apiClient.get(`/posts/handle/${handle}`));

const listPublished = () => handleRequest(apiClient.get("/posts/published"));

const search = (query: string) =>
  handleRequest(apiClient.get(`/posts/search`, { params: { q: query } }));

const postApi = {
  // protected apis
  create,
  get,
  list,
  update,
  deletePost,

  // public apis
  getByHandle,
  listPublished,
  search,
};

export default postApi;
