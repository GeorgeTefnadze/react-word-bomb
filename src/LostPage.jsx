import React from "react";
import { Button } from "@/components/ui/button";

export default function StartPage() {
  return (
    <main className="bg-slate-400 w-screen h-screen flex flex-col items-center gap-10 justify-center">
      <h1 className="text-xl">You Lost</h1>
      <Button className="w-1/2">Restart</Button>
    </main>
  );
}
