import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";

export default function StartPage() {
  const [highScore, setHighScore] = useState(0);
  const { score } = useParams();

  useEffect(() => {
    const highScore = localStorage.getItem("highScore");
    if (highScore) {
      setHighScore(highScore);
      console.log("highScore", highScore);
    }
  }, []);

  return (
    <main className="bg-slate-400 w-screen h-screen flex flex-col items-center gap-10 justify-center">
      <h1 className="text-4xl text-white">You Lost</h1>
      <h2 className="text-2xl text-white">Score: {score}</h2>
      {parseInt(score) >= highScore ? (
        <h3 className="text-xl text-white">New High Score!</h3>
      ) : (
        <h3 className="text-xl text-white">Better luck next time!</h3>
      )}

      <Button asChild className="w-1/2">
        <Link to="/game">Restart</Link>
      </Button>
    </main>
  );
}
