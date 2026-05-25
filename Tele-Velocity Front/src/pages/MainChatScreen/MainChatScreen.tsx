import "./MainChatScreen.css";

import { useState, useEffect } from "react";

import ChatSidebar from "../../layouts/ChatSidebar/ChatSidebar";
import Resizer from "../../layouts/Resizer/Resizer";
import ChatRightSide from "../../layouts/ChatRightSide/ChatRightSide";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import {useSelectdedContact } from "../../contexts/SelectedContactContest";

import type { Message } from "../../types/message";
import type { ChatPreview } from "../../layouts/ContactList/ContactList";

export default function MainChatScreen() {

    const { currentUser } = useCurrentUser();
    const { selectedContact } = useSelectdedContact();

    const [chatPreviews, setChatPreviews] = useState<ChatPreview[]>([]);

    const [sidebarWidth, setSidebarWidth] = useState(20);

    async function loadContacts() {

            if (!currentUser)
                return;

            try {

                const response = await fetch(
                    `http://localhost:8080/contacts/chat-previews/${currentUser.id}`
                );

                const data = await response.json();

                setChatPreviews(data);

            } catch (error) {
                console.error(error);
            }
        }

    useEffect(() => {
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

    function formatMessageTime(time: string) {

        if (!time)
            return "";

        const messageDate = new Date(time);

        const now = new Date();

        const isToday =
            messageDate.toDateString() === now.toDateString();

        if (isToday) {

            return messageDate.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            });
        }

        return messageDate.toLocaleDateString("pl-PL", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    }

    return (
        <div className="MainChatScreen">
            <ChatSidebar
                chats={chatPreviews.map((chat) => ({
                    ...chat,
                    time: formatMessageTime(chat.time),
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
                loadContacts={loadContacts}
            />
        </div>
    );
}