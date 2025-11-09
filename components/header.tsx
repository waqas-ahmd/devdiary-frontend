"use client";
import { Button } from "./ui/button";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { getInitials } from "@/lib/utils";

const Header = () => {
  const { isLoggedIn, logout, user } = useAuth();

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
          <Link href={isLoggedIn ? "/create" : "/register"}>
            <Button size="lg">Create Post</Button>
          </Link>
          {isLoggedIn && (
            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-full cursor-pointer">
                <Avatar className="size-10">
                  <AvatarFallback className="font-semibold border border-black">
                    {getInitials(user?.name || "User")}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <Link className="w-full h-full" href="/my-posts">
                    My Posts
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout} className="text-destructive">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
