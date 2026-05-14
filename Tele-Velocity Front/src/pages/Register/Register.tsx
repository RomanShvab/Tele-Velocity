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

  const handleRegister = async () => {
    try {
      const res = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!res.ok) {
        alert("Błąd rejestracji");
        return;
      }

      alert("Konto utworzone");

      // po rejestracji wracasz do Registeru
      navigate("/");

    } catch (err) {
      console.error(err);
      alert("Błąd połączenia z backendem");
    }
  };

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

        <TextButton text = "Register" onClick={handleRegister}/>

        <Link id="Link" to="/">
          Log In
        </Link>
      </div>
    </div>
  );
}

export default Register;