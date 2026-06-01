import "./Login.css"
import { IoSend } from "react-icons/io5";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import TextInput from "../../components/TextInput/TextInput";
import TextButton from "../../components/TextButton/TextButton";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { API_URL } from "../../api";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [inputEmailError, setInputEmailError] = useState(false);
  const [inputPasswordError, setInputPasswordError] = useState(false);

  const { setCurrentUser } = useCurrentUser();

  async function login() {
    try {
      
      let hasError = false;

      if (email === "") {
        setInputEmailError(true);
        hasError = true;
      }

      if (password === "") {
        setInputPasswordError(true);
        hasError = true;
      }

      if (hasError) return;

      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const text = await response.text();
      let data = null;

      try {
        data = text ? JSON.parse(text) : null;
      } catch (parseError) {
        console.warn("Login response could not be parsed as JSON:", parseError, text);
      }

      if (!response.ok) {
        const message = data?.message || "Logowanie nie powiodło się";
        alert(message);
        return;
      }

      if (!data) {
        alert("Otrzymano pustą lub niepoprawną odpowiedź serwera podczas logowania.");
        return;
      }

      console.log(data);

      setCurrentUser(data);
      localStorage.setItem("currentUser", JSON.stringify(data));

      navigate("/chat");

    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <div id="LoginPage">
      <div>
        <div id = "LoginIcon">
          <IoSend/>
        </div>
        <h1>Log in to Tele-Velocity</h1>
        <p>Please enter your username and password to log in.</p>
      </div>
      <div id="LoginForm">
        <p>Email</p>
          <TextInput
            type="email"
            placeholder={inputEmailError ? "Plaese enter your email" : "Email"}
            value={email}
            onChange={(e) => 
            {
              setEmail(e.target.value)
              setInputEmailError(false);
            }}
            className = {inputEmailError ? "ErrorInput" : ""}
            required
          />
        
          <p>Password</p>
          <TextInput
            type="password"
            placeholder={inputPasswordError ? "Plaese enter your password" : "Password"}
            value={password}
            onChange={(e) => 
            {
              setPassword(e.target.value)
              setInputPasswordError(false);
            }}
            className = {inputPasswordError ? "ErrorInput" : ""}
            required
          />
        <TextButton text = "Log In" onClick={login}/>
        <Link id="Link" to="/register">
          Register
        </Link>
      </div>
    </div>
  );
}

export default Login;