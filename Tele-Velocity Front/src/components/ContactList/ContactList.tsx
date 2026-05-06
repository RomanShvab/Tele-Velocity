import "./ContactList.css";
import ContactItem from "../ContactItem/ContactItem";
import Search from "../Search/Search";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { MdSettings } from "react-icons/md";


type Props = {
    contacts:
    {
        id: number;
        name: string;
        time: string;
        desc: string;
    }[];
    selectedId?: number | null;
    onSelect?: (id: number) => void;
};

export default function ContactList({ contacts, selectedId, onSelect }: Props) {

    const [width, setWidth] = useState(20)
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            if (!isDragging) return;

            const widthInPercents = Math.min(
                40,
                Math.max(15, (e.clientX / window.innerWidth) * 100)
            );

            setWidth(widthInPercents);
        };

        const handleUp = () => {
            setIsDragging(false);
        };

        window.addEventListener("mousemove", handleMove);
        window.addEventListener("mouseup", handleUp);

        return () => {
            window.removeEventListener("mousemove", handleMove);
            window.removeEventListener("mouseup", handleUp);
        };
    }, [isDragging]);
    const [darkMode, setDarkMode] = useState(
        document.body.classList.contains("dark")
    );

    function toggleTheme() {
        const isDark = document.body.classList.toggle("dark");

        localStorage.setItem("theme", isDark ? "dark" : "light");
        setDarkMode(isDark);
    }  

    return (
        <div
            style={{ display: "flex", height: "100vh" }}
        >
            <div id = "LeftSide" style={{width: `${width}vw`}}>
                <div id = "LeftTopSide">
                    <Link to="/settings" id = "SettingsButton">
                        <MdSettings size={18} />
                    </Link>
                    <Search id = "ContactSearch" onChange={(value) => console.log(value)} placeholder="Search" />
                        
                    {/* 🔘 PRZYCISK (na razie globalnie) */}
                    <button
                        id="ThemeToggle"
                        onClick={toggleTheme}
                    >
                        {darkMode ? "🌙" : "☀️"}
                    </button>
                </div>
                <div id = "LeftBottomSide">
                    {contacts.map((contact) => (
                        <ContactItem
                            contact={contact}
                            selected={selectedId === contact.id}
                            onClick={() => onSelect?.(contact.id)}
                        />
                    ))}
                    
                    <Link id = "AddContactButton" to="/add-contact">
                        <FiPlus />
                    </Link>
                </div>
            
            </div>
            <div id = "Resizer" onMouseDown={() => setIsDragging(true)}></div>

        </div>
    );
}