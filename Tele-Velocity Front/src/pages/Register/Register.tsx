import "./Register.css";
import { IoSend } from "react-icons/io5";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import TextButton from "../../components/TextButton/TextButton";
import TextInput from "../../components/TextInput/TextInput";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function register() {
    try {

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
      } else {
        console.log(data);
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

        <TextButton text = "Register" onClick={register}/>

        <Link id="Link" to="/">
          Log In
        </Link>
      </div>
    </div>
  );
}

export default Register;