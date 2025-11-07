import React from "react";
import { Button } from "./ui/button";

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
          <Button size="lg">Create Post</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
