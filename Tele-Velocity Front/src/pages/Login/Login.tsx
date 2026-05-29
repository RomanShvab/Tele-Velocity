import "./Login.css"
import { IoSend } from "react-icons/io5";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import TextInput from "../../components/TextInput/TextInput";
import TextButton from "../../components/TextButton/TextButton";
import Header from "../../components/Header/Header";
import FormLayout from "../../layouts/FormLayout/FormLayout";

import { useCurrentUser } from "../../contexts/CurrentUserContext";

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

      <Header
        icon={<IoSend />}
        title="Log in to Tele-Velocity"
        description="Please enter your username and password to log in."
      />

      <FormLayout>

        <p>Email</p>

        <TextInput
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <p>Password</p>

        <TextInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <TextButton
          text="Log In"
          onClick={login}
        />

        <Link id="Link" to="/register">
          Register
        </Link>

      </FormLayout>
    </div>
  );
}

export default Login;