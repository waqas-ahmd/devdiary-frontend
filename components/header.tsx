"use client";
import { Button } from "./ui/button";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { LogOutIcon } from "lucide-react";

const Header = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <header className="flex flex-col gap-4 bg-white border-b py-2">
      <div className="flex flex-row gap-2 justify-between items-center container mx-auto px-4">
        <Link href="/" className="flex flex-col">
          <h1 className="text-3xl font-bold font-mono-2">{`{DevDiary}`}</h1>
          <p className="hidden sm:block text-xs text-muted-foreground">
            Latest articles, tutorials and case studies.
          </p>
        </Link>
        <div className="flex flex-row gap-2">
          <Link href={isLoggedIn ? "/create" : "/login"}>
            <Button size="lg">Create Post</Button>
          </Link>
          {isLoggedIn && (
            <Button size="lg" variant="outline" onClick={logout}>
              <LogOutIcon /> <span className="hidden sm:block">Logout</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
