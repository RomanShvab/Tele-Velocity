import "./AddContact.css";
import { IoPersonAdd } from "react-icons/io5";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import TextInput from "../../components/TextInput/TextInput";
import TextButton from "../../components/TextButton/TextButton";

import { useCurrentUser } from "../../CurrentUserContext";

function AddContact() {

  const navigate = useNavigate();

  const { currentUser } = useCurrentUser();

  const [email, setEmail] = useState("");

  async function handleAddContact() {

    if (!email.trim()) {
      alert("Enter email");
      return;
    }

    try {

      const response = await fetch(
        `http://localhost:8080/contacts/add?userId=${currentUser?.id}&email=${email}`,
        {
          method: "POST",
        }
      );

      const data = await response.text();

      alert(data);

      if (data === "Contact added") {
        navigate("/chat");
      }

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div id="AddPage">

      <div>
        <div id="AddIcon">
          <IoPersonAdd />
        </div>

        <h1>Add new contact</h1>

        <p>
          Enter contact email to add a new person.
        </p>
      </div>

      <div id="AddForm">

        <p>Email</p>

        <TextInput
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextButton
          text="Add Contact"
          onClick={handleAddContact}
        />

        <Link id="Link" to="/chat">
          Cancel
        </Link>

      </div>
    </div>
  );
}

export default AddContact;