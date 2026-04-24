import "./Login.css"
import { IoSend } from "react-icons/io5";

function Login() {
  return (
    <div id="LoginPage">
      <div>
        <IoSend id = "LoginIcon"/>
        <h1>Log in to Tele-Velocity</h1>
        <p>Please enter your username and password to log in.</p>
      </div>
      <div id="LoginForm">
        <p>Username</p>
        <input type="text" placeholder="Username" />
        <p>Password</p>
        <input type="password" placeholder="Password" />
        <button id="LoginButton">Log In</button>
      </div>
    </div>
  );
}

export default Login;