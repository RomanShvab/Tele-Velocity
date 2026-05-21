import "./Chat.css";

import ContactIcon from "../../components/ContactIcon/ContactIcon";

export interface ChatMessage {
    id: number;
    senderId: number;
    receiverId: number;
    content: string;
    createdAt: string;
}

export interface Contact {
    id: number;
    name: string;
    avatar?: string | null;
}

export interface ChatProps {
    /** Array of chat messages to be displayed */
    messages: ChatMessage[];

    /** The current user participating in the chat */
    currentUser: Contact;

    /** The contact with whom the current user is chatting */
    selectedContact: Contact;

    /** HTML id attribute for the chat container */
    id?: string;

    /** Additional CSS class names for the chat container */
    className?: string; 

    /** Inline styles for the chat container */
    style?: React.CSSProperties;
}

export default function ChatComponent({ 
    messages, 
    currentUser, 
    selectedContact, 
    id, 
    className, 
    style 
}: ChatProps) {
    return (
        <div className={`Chat ${className || ""}`} style={style} id={id}>
            {messages.map((message) => (
                <div key={message.id} className={`ChatMessage ${message.senderId === currentUser.id ? "ChatMessageSent" : "ChatMessageReceived"}`}>
                    <ContactIcon className="ChatMessageAvatar" name={message.senderId === currentUser.id ? currentUser.name : selectedContact.name} size={40}/>
                    <div className="ChatMessageContent">{message.content}</div>
                </div>
            ))}
        </div>
    );
}