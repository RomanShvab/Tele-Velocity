import "./MainChatScreen.css";

import { useState, useEffect } from "react";

import ChatSidebar from "../../layouts/ChatSidebar/ChatSidebar";
import Resizer from "../../layouts/Resizer/Resizer";
import ChatRightSide from "../../layouts/ChatRightSide/ChatRightSide";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import {useSelectdedContact } from "../../contexts/SelectedContactContest";

import type { User } from "../../types/user";
import type { Message } from "../../types/message";

export default function MainChatScreen() {

    const { currentUser } = useCurrentUser();
    const { selectedContact } = useSelectdedContact();

    const [contacts, setContacts] = useState<User[]>([]);

    const [sidebarWidth, setSidebarWidth] = useState(20);

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

    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {

        async function loadMessages() {

            if (!currentUser || !selectedContact)
                return;

            try {

                const response = await fetch(
                    `http://localhost:8080/messages/chat?user1=${currentUser.id}&user2=${selectedContact.id}`
                );

                const data = await response.json();

                setMessages(data);

            } catch (error) {
                console.error(error);
            }
        }

        loadMessages();

    }, [selectedContact]);

    function getLastMessage(contactId: number) {

        const chatMessages = messages.filter(
            (message) =>
                (message.senderId === currentUser?.id &&
                    message.receiverId === contactId)
                ||
                (message.senderId === contactId &&
                    message.receiverId === currentUser?.id)
        );

        if (chatMessages.length === 0) {
            return {
                content: "No messages yet",
                time: "",
            };
        }

        const lastMessage =
            chatMessages[chatMessages.length - 1];

        return {
            content: lastMessage.content,
            time: new Date(
                lastMessage.createdAt
            ).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),
        };
    }

    return (
        <div className="MainChatScreen">
            <ChatSidebar
                chats={contacts.map((contact) => ({
                    id: contact.id,
                    name: contact.name,
                    lastMessage: getLastMessage(contact.id).content,
                    time: getLastMessage(contact.id).time,
                }))}
                style={{
                    width: `${sidebarWidth}%`,
                }}
            />
              <Resizer setWidth={setSidebarWidth} />
            
            <ChatRightSide
                contact={selectedContact ?? undefined}
                currentUser={currentUser ?? undefined}
                messages={messages}
                setMessages={setMessages}
            />
        </div>
    );
}