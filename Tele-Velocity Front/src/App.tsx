import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect} from "react";

import Login from "./pages/Login/Login.tsx";
import MainChatScreen from "./pages/MainChatScreen/MainChatScreen.tsx";
import Register from "./pages/Register/Register.tsx";
import AddContact from "./pages/AddContact/AddContact.tsx";
import Settings from "./pages/Settings/Settings.tsx";

import {CurrentUserProvider} from "./CurrentUserContext.tsx";

import "./App.css";

function App() {

  useEffect(() => {
    const theme = localStorage.getItem("theme");

    if (theme === "dark") {
        document.body.classList.add("dark");
    }
  }, []);

  return (
    <>

      <BrowserRouter>
        <CurrentUserProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/chat" element={<MainChatScreen />} />
            <Route path="/register" element={<Register />} />
            <Route path="/add-contact" element={<AddContact />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </CurrentUserProvider>
      </BrowserRouter>
    </>
  );
}

export default App;