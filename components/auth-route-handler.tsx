"use client";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface AuthRouteHandlerProps {
  type: "auth" | "protected";
  children?: React.ReactNode;
}

const AuthRouteHandler = ({ type, children }: AuthRouteHandlerProps) => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (type === "auth" && isLoggedIn) {
      router.push("/my-posts");
    } else if (type === "protected" && !isLoggedIn) {
      router.push("/login");
    } else {
      return;
    }
  }, [isLoggedIn, router, type]);
  return <>{children}</>;
};

export default AuthRouteHandler;
