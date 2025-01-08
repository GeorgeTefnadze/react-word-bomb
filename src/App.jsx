import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import wordsJson from "./assets/words.json";
import Letter from "./components/letter";
import "./App.scss";

function App() {
  const [words, setWords] = useState(wordsJson);
  const [guess, setGuess] = useState([]);
  const [twoLetterStrings, setTwoLetterStrings] = useState([
    "th",
    "he",
    "in",
    "er",
    "an",
    "re",
    "nd",
    "at",
    "on",
    "nt",
    "ha",
    "es",
    "st",
    "en",
    "ed",
    "to",
    "it",
    "ou",
    "ea",
    "hi",
  ]);
  const [randomLetters, setRandomLetters] = useState("");
  const [joinedGuess, setJoinedGuess] = useState([]);
  const [greenIndexes, setGreenIndexes] = useState([]);
  const [timeLeft, setTimeLeft] = useState(5); // Timer starts at 5 seconds
  const [isRunning, setIsRunning] = useState(true); // Control if the timer is running

  useEffect(() => {
    // console.clear();
    console.log("guess :", guess);
    console.log("joinedGuess:", joinedGuess);
  }, [guess, joinedGuess]);

  useEffect(() => {
    const findGreenIndexes = () => {
      const indexes = [];
      let found = false;
      for (let i = 0; i < guess.length - 1; i++) {
        if (
          guess[i] === randomLetters[0] &&
          guess[i + 1] === randomLetters[1] &&
          !found
        ) {
          indexes.push(i);
          indexes.push(i + 1);
          found = true;
        }
      }
      if (guess[guess.length - 1] === randomLetters[0] && !found) {
        indexes.push(guess.length - 1);
      }
      setGreenIndexes(indexes);
    };

    findGreenIndexes();
  }, [joinedGuess, randomLetters]);

  useEffect(() => {
    if (guess.length === 0) {
      setRandomLetters(
        twoLetterStrings[Math.floor(Math.random() * twoLetterStrings.length)]
      );
    }
  }, []);

  useEffect(() => {
    const initializeJoinedGuess = () => {
      setJoinedGuess([...randomLetters]); // If `guess` already includes `randomLetters`, use it as is
    };

    initializeJoinedGuess();
  }, [randomLetters]);

  useEffect(() => {
    // Function to handle key press
    const handleKeyPress = (event) => {
      if (event.key === "Backspace" && guess.length !== 0) {
        setGuess((prevGuess) => prevGuess.slice(0, prevGuess.length - 1));
      }
      // Check if the key pressed is a letter from A to Z
      if (event.key.length === 1 && event.key >= "a" && event.key <= "z") {
        setGuess((prevGuess) => [...prevGuess, event.key.toLowerCase()]);
      }
    };

    // Add the event listener on page load
    window.addEventListener("keydown", handleKeyPress);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [guess]); // Listen for changes in `guess`

  // Separate useEffect to update `joinedGuess` based on `guess` and `randomLetters`
  useEffect(() => {
    const includesBoth = randomLetters
      .split("")
      .every((char) => guess.includes(char));

    let before = [];

    let patternStart = -1;

    // First, look for complete pattern match
    for (let i = 0; i <= guess.length - randomLetters.length; i++) {
      let matchFound = true;
      for (let j = 0; j < randomLetters.length; j++) {
        if (guess[i + j] !== randomLetters[j]) {
          matchFound = false;
          break;
        }
      }
      if (matchFound) {
        patternStart = i;
        break;
      }
    }

    // If complete pattern is found, set before to everything before it
    if (patternStart !== -1) {
      before = guess.slice(0, patternStart);
    } else {
      // Check for first letter match ONLY if it's by itself (like 'o' in 'o' for 'ou')
      let firstLetterIndex = guess.indexOf(randomLetters[0]);
      if (firstLetterIndex !== -1 && firstLetterIndex === guess.length - 1) {
        before = guess.slice(0, firstLetterIndex);
      } else if (guess[guess.length - 1] === randomLetters[0]) {
        // If last letter matches, set before to everything before it
        before = guess.slice(0, -1);
      } else {
        // In all other cases (including partial matches), return entire array
        before = guess;
      }
    }

    if (includesBoth && guess.join("").includes(randomLetters)) {
      console.log("Includes both");
      setJoinedGuess([...guess]);
    } else {
      console.log("before:", before);
      setJoinedGuess([...before, ...randomLetters]);
    }
  }, [guess, randomLetters]); // Trigger this effect whenever `guess` or `randomLetters` changes

  useEffect(() => {
    function handleWin(guessParam) {
      const guessString = guessParam.join("");
      if (
        words.includes(guessString) &&
        guessString.includes(randomLetters) &&
        guessString.length >= 3
      ) {
        resetTimer();
        console.log("You win!");
        setGuess([]);
        setRandomLetters(
          twoLetterStrings[Math.floor(Math.random() * twoLetterStrings.length)]
        );
      }
    }

    handleWin(guess);
  }, [guess]);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer); // Cleanup the timer
  }, [timeLeft, isRunning]);

  // Calculate progress bar width as a percentage
  const progressBarWidth = (timeLeft / 5) * 100;

  // Function to reset the timer
  const resetTimer = () => {
    setTimeLeft(5); // Reset time to 5 seconds
    setIsRunning(true); // Restart the timer
  };

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center bg-slate-400">
      {/* <div className="w-1/2 h-10 bg-white rounded-full mb-3">
        <div
          className="h-10 bg-green-600 rounded-full"
          style={{ width: `${progressBarWidth}%` }}
        ></div>
      </div> */}
      <Progress value={progressBarWidth} className="w-2/3 " />

      <div className="w-full h-1 flex items-center justify-center mt-10">
        {joinedGuess.map((letter, index) => (
          <Letter
            key={index}
            index={index}
            letter={letter}
            greenIndexes={greenIndexes}
            color={"bg-green-600"}
          />
        ))}
      </div>
    </main>
  );
}

export default App;
