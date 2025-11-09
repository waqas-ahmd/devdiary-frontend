import apiClient, { handleRequest } from "@/lib/axios";

interface CreatePostData {
  title: string;
  content: string;
  featuredImage?: string | undefined;
  tags?: string[] | undefined;
  status: "published" | "draft";
}

interface UpdatePostData extends Partial<CreatePostData> {
  id: string;
}

const create = (data: CreatePostData) =>
  handleRequest(apiClient.post("/posts", data));

const get = (id: string) => handleRequest(apiClient.get(`/posts/${id}`));

const list = () => handleRequest(apiClient.get("/posts"));

const update = (data: UpdatePostData) =>
  handleRequest(apiClient.put(`/posts/${data.id}`, data));

const deletePost = (id: string) =>
  handleRequest(apiClient.delete(`/posts/${id}`));

const getByHandle = (handle: string) =>
  handleRequest(apiClient.get(`/posts/public/${handle}`));

const listPublished = () => handleRequest(apiClient.get("/posts/public"));

const search = (query: string) =>
  handleRequest(apiClient.get(`/posts/search`, { params: { q: query } }));

const postApi = {
  // protected apis
  create,
  get,
  list,
  update,
  delete: deletePost,

  // public apis
  getByHandle,
  listPublished,
  search,
};

export default postApi;
