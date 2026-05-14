import "./ChatRightSide.css";

import {
    FiMoreVertical,
    FiX,
    FiSend,
    FiPaperclip,
} from "react-icons/fi";

import ContactIcon from "../../components/ContactIcon/ContactIcon";
import TextInput from "../../components/TextInput/TextInput";
import IconButton from "../../components/IconButton/IconButton";
import Chat from "../Chat/Chat";

import type {ChatMessage} from "../Chat/Chat";

import { useState } from "react";

export interface Contact {
    id: number;

    name: string;

    description: string;

    username: string;

    phone: string;

    avatar?: string | null;

    isOnline?: boolean;
}

interface ChatRightSideProps {
    /** Current user of the chat application */
    currentUser: Contact;

    /** Currently selected contact */
    contact?: Contact;

    /** Messages of selected chat */
    messages: ChatMessage[];

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
    id,
    className = "",
    style,
}: ChatRightSideProps) {
    const [isSettingsOpen, setIsSettingsOpen] =
        useState(false);

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
                        avatar={contact.avatar}
                    />

                    <div className="ChatRightSideContactInfo">
                        <div className="ChatRightSideContactName">
                            {contact.name}
                        </div>

                        <div className="ChatRightSideContactStatus">
                            {contact.isOnline
                                ? "online"
                                : "offline"}
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
                />

                <IconButton
                    icon={<FiSend size={20}/>}
                    size = {40}
                />
            </div>
        </div>
    );
}