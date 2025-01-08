import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import StartPage from "./StartPage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StartPage />
  </StrictMode>
);
