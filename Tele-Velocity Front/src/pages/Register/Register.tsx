import "./Register.css";
import { IoSend } from "react-icons/io5";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import TextButton from "../../components/TextButton/TextButton";
import TextInput from "../../components/TextInput/TextInput";
import AuthHeader from "../../components/Header/Header";
import FormLayout from "../../layouts/FormLayout/FormLayout";
import { useNotification } from "../../contexts/NotificationContext";
import { API_URL } from "../../api";

function Register() {

  const navigate = useNavigate();
  const { notify } = useNotification();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [inputNameError, setInputNameError] = useState(false);
  const [inputEmailError, setInputEmailError] = useState(false);
  const [inputPasswordError, setInputPasswordError] = useState(false);

  async function register() {

    try {

      if (name == "") {
        setInputNameError(true);
      }

      if (email == "") {
        setInputEmailError(true);
      }

      if (password == "") {
        setInputPasswordError(true);
      }

      if (inputNameError || inputEmailError || inputPasswordError)
        return;

      const response = await fetch(`${API_URL}/auth/register`, {
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

      const text = await response.text();
      const message = text || "Rejestracja nie powiodĹ‚a siÄ™";

      if (!response.ok) {
        notify(message, "error");
        return;
      }

      notify(message, "success");
      navigate("/");

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div id="RegisterPage">

      <AuthHeader
        icon={<IoSend />}
        title="Register to Tele-Velocity"
        description="Create your account"
      />

      <FormLayout>

        <p>Name</p>

        <TextInput
          type="text"
          placeholder={inputNameError ? "Please enter your username" : "Name"}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setInputNameError(false);
          }}
          className={inputNameError ? "ErrorInput" : ""}
          required
        />

        <p>Email</p>

        <TextInput
          type="email"
          placeholder={inputEmailError ? "Please enter your email" : "Email"}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setInputEmailError(false);
          }}
          className={inputEmailError ? "ErrorInput" : ""}
          required
        />

        <p>Password</p>

        <TextInput
          type="password"
          placeholder={inputPasswordError ? "Please enter your password" : "Password"}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setInputPasswordError(false);
          }}
          className={inputPasswordError ? "ErrorInput" : ""}
          required
        />

        <TextButton
          text="Register"
          onClick={register}
        />

        <Link id="Link" to="/">
          Log In
        </Link>

      </FormLayout>

    </div>
  );
}

export default Register;
