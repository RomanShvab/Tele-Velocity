import "./AddContact.css";
import { IoPersonAdd } from "react-icons/io5";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import TextInput from "../../components/TextInput/TextInput";
import TextButton from "../../components/TextButton/TextButton";
import AuthHeader from "../../components/Header/Header";

import FormLayout from "../../layouts/FormLayout/FormLayout";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useNotification } from "../../contexts/NotificationContext";
import { API_URL } from "../../api";

function AddContact() {

  const navigate = useNavigate();

  const { currentUser } = useCurrentUser();
  const { notify } = useNotification();

  const [email, setEmail] = useState("");

  async function handleAddContact() {

    if (!email.trim()) {
      notify("Enter email", "error");
      return;
    }

    try {

      const response = await fetch(
        `${API_URL}/contacts/add?userId=${currentUser?.id}&email=${email}`,
        {
          method: "POST",
        }
      );

      const data = await response.text();
      const success = data === "Contact added";
      notify(data, success ? "success" : "error");

      if (success) {
        navigate("/chat");
      }

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div id="AddPage">

      <AuthHeader
        icon={<IoPersonAdd />}
        title="Add new contact"
        description="Enter contact email to add a new person."
      />

      <FormLayout>

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

      </FormLayout>

    </div>
  );
}

export default AddContact;