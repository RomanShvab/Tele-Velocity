import "./ContactList.css";
import ContactItem from "../ContactItem/ContactItem";
import Search from "../Search/Search";
import DropDownMenu from "../DropDownMenu/DropDownMenu";
import { useState, useEffect } from "react";


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

    return (
        <div
            style={{ display: "flex", height: "100vh" }}
        >
            <div id = "LeftSide" style={{width: `${width}vw`}}>
                <div id = "LeftTopSide">
                    <DropDownMenu />
                    <Search id = "ContactSearch" onChange={(value) => console.log(value)} placeholder="Search" />
                </div>
                <div id = "LeftBottomSide">
                    {contacts.map((contact) => (
                        <ContactItem
                            contact={contact}
                            selected={selectedId === contact.id}
                            onClick={() => onSelect?.(contact.id)}
                        />
                    ))}
            
            
                </div>
            
            </div>
            <div id = "Resizer" onMouseDown={() => setIsDragging(true)}></div>

        </div>
    );
}