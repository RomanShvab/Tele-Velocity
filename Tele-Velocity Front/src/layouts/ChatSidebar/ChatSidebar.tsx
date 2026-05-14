import "./ChatSidebar.css";

import TextInput from "../../components/TextInput/TextInput";
import IconButton from "../../components/IconButton/IconButton";
import ContactList from "../ContactList/ContactList";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    MdDarkMode,
    MdLightMode,
    MdSettings,
    MdAdd,
} from "react-icons/md";

import type { ChatPreview } from "../ContactList/ContactList";

interface ChatSidebarProps {
    /** Array of chats displayed in the sidebar */
    chats: ChatPreview[];

    /** HTML id attribute */
    id?: string;

    /** Additional CSS classes */
    className?: string;

    /** Inline styles */
    style?: React.CSSProperties;

    /** Called when user selects a chat */
    onChatSelect: (chatId: number) => void;

    /** ID of the currently selected chat */
    SelectedChatId?: number | null;
}

export default function ChatSidebar({
    chats,
    id,
    className,
    style,
    onChatSelect,
    SelectedChatId,
}: ChatSidebarProps) {

    const navigate = useNavigate();

    const [darkMode, setDarkMode] = useState(
        document.body.classList.contains("dark")
    );

    function toggleTheme() {
        const isDark =
            document.body.classList.toggle("dark");

        localStorage.setItem(
            "theme",
            isDark ? "dark" : "light"
        );

        setDarkMode(isDark);
    }

    return (
        <div className={`ChatSidebar ${className}`} id={id} style={style}>
            <div className="ChatSidebarTopBar">
                <IconButton
                    icon={<MdSettings size={22} />}
                    size={40}
                    onClick={() => navigate("/settings")}
                />

                <TextInput
                    placeholder="Find a user..."
                />

                <IconButton
                    icon={
                        darkMode ? (
                            <MdDarkMode size={22} />
                        ) : (
                            <MdLightMode size={22} />
                        )
                    }
                    size={40}
                    onClick={toggleTheme}
                />
            </div>

            <ContactList chats={chats} onSelectChat={onChatSelect} selectedChatId={SelectedChatId}/>

            <IconButton
                icon={<MdAdd size={40} />}
                size={55}
                className="ChatSidebarAddButton"                
                onClick={() => navigate("/add-contact")}
            />
        </div>
    );
}