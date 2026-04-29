import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login.tsx";
import Chat from "./pages/Chat/Chat.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;