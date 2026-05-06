import "./AddContact.css";
import { IoPersonAdd } from "react-icons/io5";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AddContact() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const handleAddContact = () => {
    if (!username.trim() || !email.trim()) {
      alert("Uzupełnij wszystkie pola");
      return;
    }

    // 🔥 NA RAZIE MOCK (bez backendu)
    console.log("Dodano kontakt:", { username, email });

    // tu później fetch do backendu

    navigate("/chat");
  };

  return (
    <div id="LoginPage">
      <div>
        <IoPersonAdd id="LoginIcon" />
        <h1>Add new contact</h1>
        <p>Enter contact details to add a new person.</p>
      </div>

      <div id="LoginForm">
        <p>Username</p>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <p>Email</p>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button id="LoginButton" onClick={handleAddContact}>
          Add Contact
        </button>

        <Link id="RegisterLink" to="/chat">
          Cancel
        </Link>
      </div>
    </div>
  );
}

export default AddContact;