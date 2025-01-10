import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "./App";
import StartPage from "./StartPage";
import LostPage from "./LostPage";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import { AuthProvider } from "./contexts/authContext";

export default function RouterPage() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/start" element={<StartPage />} />
        <Route path="/game" element={<App />} />
        <Route path="/lost/:score" element={<App />} />
      </Routes>
    </AuthProvider>
  );
}
