import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function StartPage() {
  return (
    <main className="bg-slate-400 w-screen h-screen flex flex-col items-center gap-10 justify-center">
      <h1 className="text-xl">Welcome</h1>
      <Button asChild className="w-1/2">
        <Link to="/game">Start Game</Link>
      </Button>
    </main>
  );
}
