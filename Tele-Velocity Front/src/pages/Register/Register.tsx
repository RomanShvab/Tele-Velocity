import "./Register.css";
import { IoSend } from "react-icons/io5";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import TextButton from "../../components/TextButton/TextButton";
import TextInput from "../../components/TextInput/TextInput";

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

      if(name == "")
      {
        setInputNameError(true);
      }
      
      if(email == "")
      {
        setInputEmailError(true);
      }
      
      if(password == "")
      {
        setInputPasswordError(true);
      }

      if(inputNameError || inputEmailError || inputPasswordError)
        return;

      const response = await fetch("http://localhost:8080/auth/register", {
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
        navigate("/")
        alert(data)
      } else {
        alert(data);
      }


    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div id="RegisterPage">
      <div>
        <div id="RegisterIcon">          
          <IoSend/>
        </div>
        <h1>Register to Tele-Velocity</h1>
        <p>Create your account</p>
      </div>

      <div id="RegisterForm">

        <p>Name</p>
        <TextInput
          type="name"
          placeholder={inputNameError ? "Plaese enter your username" : "Name"}
          value={name}
          onChange={(e) => 
          {
            setName(e.target.value);
            setInputNameError(false);
          }}
          className = {inputNameError ? "ErrorInput" : ""}
          required
        />

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

        <TextButton text = "Register" onClick={register}/>

        <Link id="Link" to="/">
          Log In
        </Link>
      </div>
    </div>
  );
}

export default Register;