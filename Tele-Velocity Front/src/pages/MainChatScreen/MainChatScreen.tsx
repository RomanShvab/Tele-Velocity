import "./MainChatScreen.css";

import ChatSidebar from "../../layouts/ChatSidebar/ChatSidebar";
import Resizer from "../../layouts/Resizer/Resizer";
import ChatRightSide from "../../layouts/ChatRightSide/ChatRightSide";
import type { Contact as RightContact } from "../../layouts/ChatRightSide/ChatRightSide";

import { useCurrentUser } from "../../CurrentUserContext";

import { chats } from "../../chats";

import { useState, useEffect } from "react";

interface Contact {
    id: number;
    name: string;
    email: string;
    avatarUrl?: string;
    bio?: string;
    phone?: string;
}

export default function MainChatScreen() {

    const { currentUser } = useCurrentUser();

    const [contacts, setContacts] = useState<Contact[]>([]);

    const [sidebarWidth, setSidebarWidth] = useState(20);

    const [selectedChatId, setSelectedChatId] =
        useState<number | null>(null);

    useEffect(() => {

        async function loadContacts() {

            if (!currentUser)
                return;

            try {

                const response = await fetch(
                    `http://localhost:8080/contacts/${currentUser.id}`
                );

                const data = await response.json();

                setContacts(data);

            } catch (error) {
                console.error(error);
            }
        }

        loadContacts();

    }, [currentUser]);

    const rawSelectedContact = contacts.find(
        (contact) => contact.id === selectedChatId
    );

    const selectedContact: RightContact | undefined = rawSelectedContact
        ? {
              id: rawSelectedContact.id,
              name: rawSelectedContact.name,
              description: rawSelectedContact.bio ?? "",
              username: rawSelectedContact.email ?? "",
              phone: rawSelectedContact.phone ?? "",
              avatar: rawSelectedContact.avatarUrl ?? null,
              isOnline: false,
          }
        : undefined;
    const currentUserContact: RightContact = currentUser
        ? {
              id: currentUser.id ?? 0,
              name: currentUser.name,
              description: currentUser.bio ?? "",
              username: currentUser.email,
              phone: currentUser.phone ?? "",
              avatar: currentUser.avatarUrl ?? null,
              isOnline: true,
          }
        : {
              id: 0,
              name: "",
              description: "",
              username: "",
              phone: "",
              avatar: null,
              isOnline: false,
          };

    return (
        <div className="MainChatScreen">

            <ChatSidebar
                chats={contacts.map((contact) => ({
                    id: contact.id,
                    name: contact.name,
                    lastMessage: "Last Message",
                    time: "12:36",
                }))}
                style={{
                    width: `${sidebarWidth}%`,
                }}
                onChatSelect={setSelectedChatId}
                SelectedChatId={selectedChatId}
            />

            <Resizer setWidth={setSidebarWidth} />
            
            <ChatRightSide
                contact={selectedContact}
                currentUser={currentUserContact}
                messages={[]}
            />

        </div>
    );
}