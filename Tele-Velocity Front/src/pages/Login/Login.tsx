import "./Login.css"
import { IoSend } from "react-icons/io5";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import TextInput from "../../components/TextInput/TextInput";
import TextButton from "../../components/TextButton/TextButton";
import Header from "../../components/Header/Header";
import FormLayout from "../../layouts/FormLayout/FormLayout";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useNotification } from "../../contexts/NotificationContext";
import { API_URL } from "../../api";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [inputEmailError, setInputEmailError] = useState(false);
  const [inputPasswordError, setInputPasswordError] = useState(false);

  const { setCurrentUser } = useCurrentUser();
  const { notify } = useNotification();

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

      if (hasError) 
      {
        notify("Please fill in all fields.", "error");
        return;
      }

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
      let data: any = null;

      try {
        data = text ? JSON.parse(text) : null;
      } catch (parseError) {
        data = text;
      }

      if (!response.ok) {
        const message = typeof data === "string" ? data : data?.message || "Logowanie nie powiodło się";
        notify(message, "error");
        return;
      }

      if (!data || typeof data === "string") {
        notify("Otrzymano pustą lub niepoprawną odpowiedь серwera podczas logowania.", "error");
        return;
      }

      notify("Zalogowano pomyślnie!", "success");

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
          placeholder={inputEmailError ? "Please enter your email" : "Email"}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (inputEmailError) setInputEmailError(false);
          }}
          className={inputEmailError ? "ErrorInput" : ""}
        />

        <p>Password</p>

        <TextInput
          type="password"
          placeholder={inputPasswordError ? "Please enter your password" : "Password"}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            if (inputPasswordError) setInputPasswordError(false);
          } }
          className={inputPasswordError ? "ErrorInput" : ""}
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