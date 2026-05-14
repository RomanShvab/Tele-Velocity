import "./ContactItem.css";

import ContactIcon from "../ContactIcon/ContactIcon";

interface ContactItemProps {
    /** User display name */
    name: string;

    /** Last message content */
    lastMessage: string;

    /** Message timestamp */
    time: string;

    /** Avatar image URL */
    avatar?: string;

    /** Whether the contact item is selected */
    selected?: boolean;

    /** HTML id attribute */
    id?: string;

    /** Additional CSS class names */
    className?: string;

    /** Inline styles for the contact item */
    style?: React.CSSProperties;

    /** Callback function for when the contact item is clicked */
    onClick?: () => void;
}

export default function ContactItem({
    name,
    lastMessage,
    time,
    avatar,
    id,
    selected = false,
    onClick,
    className = "",
    style,
}: ContactItemProps) {
    return (
        <div
            id={id}
            className={`
                ContactItem
                ${selected ? "Selected" : ""}
                ${className}
            `}
            style={style}
            onClick={onClick}
        >
            <ContactIcon
                name={name}
                avatar={avatar}
                size={50}
            />

            <div className="ContactItemInfo">
                <div className="LeftContactItemInfo">
                    <p className="ContactItemName">
                        {name}
                    </p>

                    <p className="ContactItemLastMessage">
                        {lastMessage}
                    </p>
                </div>

                <div className="RightContactItemInfo">
                    <span className="ContactItemTime">
                        {time}
                    </span>
                </div>
            </div>
        </div>
    );
}