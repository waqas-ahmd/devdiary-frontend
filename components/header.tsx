import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex flex-col gap-4 bg-white border-b py-2">
      <div className="flex flex-row gap-2 justify-between items-center container mx-auto px-4">
        <div>
          <h1 className="text-2xl font-extrabold">DevDiary</h1>
          <p className="text-xs text-muted-foreground">
            Latest articles, tutorials and case studies.
          </p>
        </div>
        <div>
          <Link href="/create">
            <Button size="lg">Create Post</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
