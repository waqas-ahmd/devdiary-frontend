import apiClient, { handleRequest } from "@/lib/axios";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

const login = (data: LoginData) =>
  handleRequest(apiClient.post("/users/login", data));

const register = (data: RegisterData) =>
  handleRequest(apiClient.post("/users/register", data));

const profile = () => handleRequest(apiClient.get("/users/profile"));

const userApi = {
  login,
  register,
  profile,
};

export default userApi;
