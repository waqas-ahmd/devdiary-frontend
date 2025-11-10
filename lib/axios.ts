import axios, { AxiosError, AxiosResponse } from "axios";
import { LOCAL_STORAGE_AUTH_TOKEN_KEY } from "./constants";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});

const getAuthToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(LOCAL_STORAGE_AUTH_TOKEN_KEY);
};

apiClient.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const handleRequest = async <T>(promise: Promise<AxiosResponse<T>>) => {
  try {
    const response = await promise;
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    throw new Error(error.response?.data?.message || error.message);
  }
};

export default apiClient;
