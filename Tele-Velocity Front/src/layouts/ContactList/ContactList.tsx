import "./ContactList.css";

import ContactItem from "../../components/ContactItem/ContactItem";

import { useSelectedContact } from "../../contexts/SelectedContactContext";
import { API_URL } from "../../api";

export interface ChatPreview {
    id: number;

    name: string;

    avatarUrl?: string;

    lastMessage: string;

    time: string;
}

interface ContactListProps {
    /** Array of chat previews to be displayed in the contact list */
    chats: ChatPreview[];

    /** HTML id attribute */
    id?: string;

    /** Additional CSS class names */
    className?: string;

    /** Inline styles */
    style?: React.CSSProperties;
}

export default function ContactList({
    chats,
    id,
    className = "",
    style,
}: ContactListProps) {
    const { selectedContact, setSelectedContact } = useSelectedContact();
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
                    avatarUrl={chat.avatarUrl}
                    selected={selectedContact?.id == chat.id}
                    onClick={async () => {
                        const response = await fetch(`${API_URL}/contacts/users/${chat.id}`);
                        const user = await response.json();

                        console.log(user);

                        setSelectedContact(user);
                    }}
                />
            ))}
        </div>
    );
}