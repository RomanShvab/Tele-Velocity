import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect} from "react";

import Login from "./pages/Login/Login.tsx";
import MainChatScreen from "./pages/MainChatScreen/MainChatScreen.tsx";
import Register from "./pages/Register/Register.tsx";
import AddContact from "./pages/AddContact/AddContact.tsx";
import Settings from "./pages/Settings/Settings.tsx";

import { CurrentUserProvider } from "./contexts/CurrentUserContext.tsx";
import { SelectedContactProvider } from "./contexts/SelectedContactContext.tsx";
import { NotificationProvider } from "./contexts/NotificationContext.tsx";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.tsx"

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
        <NotificationProvider>
          <CurrentUserProvider>
            <Routes>

              <Route 
                path="/" 
                element={
                  <Login/>
                }
              />

              <Route 
                path="/register" 
                element={
                  <Register/>
                }
              />

              <Route
                path="/chat"
                element={
                  <ProtectedRoute>
                    <SelectedContactProvider>
                      <MainChatScreen/>
                    </SelectedContactProvider>
                  </ProtectedRoute>
                }
              />            
              
              <Route 
                path="/add-contact" 
                element={
                  <ProtectedRoute>
                    <AddContact/>
                  </ProtectedRoute>
                }
              />
              
              <Route 
                path="/settings" 
                element={
                  <ProtectedRoute>
                    <Settings/>
                  </ProtectedRoute>
                } 
              />

            </Routes>
          </CurrentUserProvider>
        </NotificationProvider>
      </BrowserRouter>
    </>
  );
}

export default App;