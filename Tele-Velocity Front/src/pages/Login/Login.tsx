import "./Login.css"
import { IoSend } from "react-icons/io5";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import TextInput from "../../components/TextInput/TextInput";
import TextButton from "../../components/TextButton/TextButton";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function login() {
  try {

    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    });

    const data = await response.text();

    console.log(data);

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
        <p>Username</p>
        <TextInput 
          type="email"
          placeholder="Username" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}/>
        <p>Password</p>
        <TextInput 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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