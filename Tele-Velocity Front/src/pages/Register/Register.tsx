import "./Register.css";
import { IoSend } from "react-icons/io5";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

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

      // po rejestracji wracasz do loginu
      navigate("/");

    } catch (err) {
      console.error(err);
      alert("Błąd połączenia z backendem");
    }
  };

  return (
    <div id="LoginPage">
      <div>
        <IoSend id="LoginIcon" />
        <h1>Register to Tele-Velocity</h1>
        <p>Create your account</p>
      </div>

      <div id="LoginForm">
        <p>Email</p>
        <input
          type="text"
          placeholder="Email"
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

        <button id="LoginButton" onClick={handleRegister}>
          Register
        </button>

        <Link id="RegisterLink" to="/">
          Log In
        </Link>
      </div>
    </div>
  );
}

export default Register;