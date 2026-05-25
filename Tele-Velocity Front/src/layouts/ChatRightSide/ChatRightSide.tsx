import "./ChatRightSide.css";

import { useState } from "react";

import {FiMoreVertical, FiX, FiSend, FiPaperclip} from "react-icons/fi";

import ContactIcon from "../../components/ContactIcon/ContactIcon";
import TextInput from "../../components/TextInput/TextInput";
import IconButton from "../../components/IconButton/IconButton";
import Chat from "../Chat/Chat";

import type {ChatMessage} from "../Chat/Chat";
import type { User } from "../../types/user";



interface ChatRightSideProps {
    /** Current user of the chat application */
    currentUser?: User;

    /** Currently selected contact */
    contact?: User;

    /** Messages of selected chat */
    messages: ChatMessage[];

    setMessages: React.Dispatch<
        React.SetStateAction<ChatMessage[]>
    >;

    /** HTML id attribute */
    id?: string;

    /** Additional CSS classes */
    className?: string;

    /** Inline styles */
    style?: React.CSSProperties;
}

export default function ChatRightSide({
    currentUser,
    contact,
    messages,
    setMessages,
    id,
    className = "",
    style,
}: ChatRightSideProps) {
    const [isSettingsOpen, setIsSettingsOpen] =
        useState(false);
    const [message, setMessage] = useState("");

    if (!contact) {
        return (
            <div
                className={`ChatRightSide ${className}`}
                id={id}
                style={style}
            >
                <div className="ChatRightSideEmpty">
                    Select a contact
                </div>
            </div>
        );
    }

    async function sendMessage() {

        if (!message.trim())
            return;

        if (!contact)
        return;

        try {

            const response = await fetch(
                `http://localhost:8080/messages/send?senderId=${currentUser?.id}&receiverId=${contact.id}&content=${message}`,
                {
                    method: "POST",
                }
            );

            const data = await response.json();

            setMessages((prev) => [...prev, data]);

            setMessage("");

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div
            className={`ChatRightSide ${className}`}
            id={id}
            style={style}
        >
            <div className="ChatRightSideTopBar">
                <div
                    className="ChatRightSideContactButton"
                    onClick={() =>
                        setIsSettingsOpen(true)
                    }
                >
                    <ContactIcon
                        name={contact.name}
                        size={40}
                        //avatar={contact.avatar}
                    />

                    <div className="ChatRightSideContactInfo">
                        <div className="ChatRightSideContactName">
                            {contact.name}
                        </div>

                        <div className="ChatRightSideContactStatus">
                            {"online"}
                        </div>
                    </div>
                </div>

                <IconButton id="ChatRightSideSettingsButton"
                    icon={
                        isSettingsOpen ? (
                            <FiX size={20} />
                        ) : (
                            <FiMoreVertical size={20} />
                        )
                    }
                    size={40}
                    onClick={() =>
                        setIsSettingsOpen(
                            (prev) => !prev
                        )
                    }
                />
            </div>

            <div className="ChatRightSideMain">                
                {isSettingsOpen ? (
                    <div>
                        Contact details and settings would go here. This is just a placeholder.
                    </div>
                ) : (
                    <Chat
                        messages={messages}
                        currentUser={currentUser}
                        selectedContact={contact}
                    />
                )}
            </div>

            <div className="ChatRightSideBottomBar">
                <IconButton
                    icon={<FiPaperclip size={20}/>}
                    size = {40}
                />

                <TextInput
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />

                <IconButton
                    icon={<FiSend size={20}/>}
                    size = {40}
                    onClick={sendMessage}
                />
            </div>
        </div>
    );
}