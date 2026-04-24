import "./ContactItem.css";
import ContactIcon from "../ContactIcon/ContactIcon";

type Props = {
    contact: {
        id: number;
        name: string;
        time: string;
        desc: string;
    };
    onClick: () => void;
    selected?: boolean;
    id?: string;
    className?: string;
    style?: React.CSSProperties;
};

export default function ContactItem({ contact, onClick, selected, id, className, style }: Props) {
    return (
        <div id={id || ""} className={`ContactItem ${selected ? "Selected" : ""} ${className || ""}`}  style={style} onClick={onClick}>
            <ContactIcon contact={{ id: contact.id, name: contact.name }} size={50} />
            <div className = "ContactItemInfo">
                <div className = "TopContactItemInfo">
                    <h2 className = "ContactItemName">{contact.name}</h2>
                    <h2 className = "ContactItemTime">{contact.time}</h2>
                </div>
                <div className = "BottomContactItemInfo">
                    <h2 className = "ContactItemDesc">{contact.desc}</h2>
                </div>
            </div>
    </div>
  );
}