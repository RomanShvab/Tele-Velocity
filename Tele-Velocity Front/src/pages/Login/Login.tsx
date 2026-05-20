import "./Login.css"
import { IoSend } from "react-icons/io5";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import TextInput from "../../components/TextInput/TextInput";
import TextButton from "../../components/TextButton/TextButton";

import { useCurrentUser } from "../../CurrentUserContext";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [inputEmailError, setInputEmailError] = useState(false);
  const [inputPasswordError, setInputPasswordError] = useState(false);

  const { setCurrentUser } = useCurrentUser();

  async function login() {
    try {
      
      if(email == "")
      {
        setInputEmailError(true);
      }
      
      if(password == "")
      {
        setInputPasswordError(true);
      }

      if(inputEmailError || inputPasswordError)
        return;

      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        alert("Logowanie nie powiodło się");
        return;
      }

      const data = await response.json();

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