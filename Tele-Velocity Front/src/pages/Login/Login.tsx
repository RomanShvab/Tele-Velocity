import "./Login.css"
import { IoSend } from "react-icons/io5";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!res.ok) {
        alert("Błąd logowania");
        return;
      }

      const token = await res.text();

      localStorage.setItem("token", token);

      console.log("Zalogowano, token:", token);

      navigate("/chat");

      // tu później routing
    } catch (err) {
      console.error(err);
      alert("Błąd połączenia z backendem");
    }
  };
  return (
    <div id="LoginPage">
      <div>
        <IoSend id = "LoginIcon"/>
        <h1>Log in to Tele-Velocity</h1>
        <p>Please enter your username and password to log in.</p>
      </div>
      <div id="LoginForm">
        <p>Username</p>
        <input 
          type="text" 
          placeholder="Username" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>Password</p>
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button id="LoginButton" onClick={handleLogin}>
          Log In
        </button>
      </div>
    </div>
  );
}

export default Login;