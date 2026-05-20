import "./MainChatScreen.css";

import ChatSidebar from "../../layouts/ChatSidebar/ChatSidebar";
import Resizer from "../../layouts/Resizer/Resizer";
import ChatRightSide from "../../layouts/ChatRightSide/ChatRightSide";

import { contacts } from "../../contacts";
import { chats } from "../../chats";

import { useState } from "react";

export default function MainChatScreen() {
    
    const [sidebarWidth, setSidebarWidth] = useState(20);
    const [selectedChatId, setSelectedChatId] = useState<number | null>(null);    
    const currentUser = contacts[0];
    const selectedChat =
    selectedChatId === null
        ? null
        : chats.find(
              (chat) =>
                  chat.users.includes(currentUser.id) &&
                  chat.users.includes(selectedChatId)
          );

    const selectedContact = contacts.find(
        (contact) => contact.id === selectedChatId
    );
    return (
        <div className="MainChatScreen">
            <ChatSidebar
                chats={contacts.map((contact) => ({
                    id: contact.id,
                    name: contact.name,
                    lastMessage: contact.desc,
                    time: contact.time,
                }))}
                style={{
                    width: `${sidebarWidth}%`,
                }}
                onChatSelect={setSelectedChatId}
                SelectedChatId={selectedChatId}
            />

            <Resizer
                setWidth={setSidebarWidth}
            />

            <ChatRightSide contact={selectedContact} currentUser={contacts[0]} messages={selectedChat != null ? selectedChat.messages : []} />
        </div>
    );
}