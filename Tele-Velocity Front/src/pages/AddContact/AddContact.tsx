import "./AddContact.css";
import { IoPersonAdd } from "react-icons/io5";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import TextInput from "../../components/TextInput/TextInput";
import TextButton from "../../components/TextButton/TextButton";

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
    <div id="AddPage">
      <div>
        <div id="AddIcon">
          <IoPersonAdd/>
        </div>
        <h1>Add new contact</h1>
        <p>Enter contact details to add a new person.</p>
      </div>

      <div id="AddForm">
        <p>Username</p>
        <TextInput
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <p>Email</p>
        <TextInput
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextButton text = "Add Contact" onClick={handleAddContact}/>

        <Link id="Link" to="/chat">
          Cancel
        </Link>
      </div>
    </div>
  );
}

export default AddContact;