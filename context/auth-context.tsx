"use client";
import api from "@/api";
import { LOCAL_STORAGE_AUTH_TOKEN_KEY } from "@/lib/constants";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  user: {
    _id: string;
    name: string;
    email: string;
  } | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem(LOCAL_STORAGE_AUTH_TOKEN_KEY);
  });
  const [user, setUser] = useState<{
    _id: string;
    name: string;
    email: string;
  } | null>(null);

  const login = (token: string) => {
    localStorage.setItem(LOCAL_STORAGE_AUTH_TOKEN_KEY, token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_AUTH_TOKEN_KEY);
    setIsLoggedIn(false);
    setUser(null);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!isLoggedIn) return;
    api.user
      .profile()
      .then((data) => {
        setUser(data.user);
      })
      .catch(logout);
  }, [isLoggedIn]);

  const value: AuthContextType = {
    user,
    isLoggedIn,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
