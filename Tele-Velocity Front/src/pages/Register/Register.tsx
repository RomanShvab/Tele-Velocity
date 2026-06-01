import "./Register.css";
import { IoSend } from "react-icons/io5";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import TextButton from "../../components/TextButton/TextButton";
import TextInput from "../../components/TextInput/TextInput";
<<<<<<< HEAD
import { API_URL } from "../../api";
=======
import AuthHeader from "../../components/Header/Header";

import FormLayout from "../../layouts/FormLayout/FormLayout";
>>>>>>> 782b8fdc65de7c724a1bd205e0b83406cd9065e4

function Register() {

  const navigate = useNavigate();

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

      const data = await response.text();

      if (data === "User created") {
        navigate("/");
        alert(data);
      } else {
        alert(data);
      }

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