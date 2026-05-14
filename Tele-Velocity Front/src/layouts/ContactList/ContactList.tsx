import "./ContactList.css";

import ContactItem from "../../components/ContactItem/ContactItem";

export interface ChatPreview {
    id: number;

    name: string;

    avatar?: string;

    lastMessage: string;

    time: string;
}

interface ContactListProps {
    /** Array of chat previews to be displayed in the contact list */
    chats: ChatPreview[];

    /** ID of the currently selected chat, or null if no chat is selected */
    selectedChatId?: number | null;

    /** HTML id attribute */
    id?: string;

    /** Additional CSS class names */
    className?: string;

    /** Inline styles */
    style?: React.CSSProperties;

    /** Callback function to be called when a chat is selected, receiving the selected chat's ID as an argument */
    onSelectChat?: (id: number) => void;
}

export default function ContactList({
    chats,
    selectedChatId,
    onSelectChat,
    id,
    className = "",
    style,
}: ContactListProps) {
    return (
        <div
            id={id}
            className={`ContactList ${className}`}
            style={style}
        >
            {chats.map((chat) => (
                <ContactItem
                    key={chat.id}
                    name={chat.name}
                    lastMessage={chat.lastMessage}
                    time={chat.time}
                    avatar={chat.avatar}
                    selected={selectedChatId === chat.id}
                    onClick={() => onSelectChat?.(chat.id)}
                />
            ))}
        </div>
    );
}