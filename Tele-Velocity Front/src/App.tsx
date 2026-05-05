import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Login from "./pages/Login/Login.tsx";
import Chat from "./pages/Chat/Chat.tsx";
import Register from "./pages/Register/Register.tsx";

import "./styles/theme.css";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <>
      {/* 🔘 PRZYCISK (na razie globalnie) */}
      <button
        id="ThemeToggle"
        onClick={() => setDarkMode(!darkMode)}
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: 999
        }}
      >
        {darkMode ? "🌙" : "☀️"}
      </button>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;