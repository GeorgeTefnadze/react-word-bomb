import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "./App";
import StartPage from "./StartPage";
import LostPage from "./LostPage";

export default function RouterPage() {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/game" element={<App />} />
      <Route path="/lost/:score" element={<LostPage />} />
    </Routes>
  );
}
