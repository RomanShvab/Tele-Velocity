import "./ContactIcon.css"

type Props = {
    contact: {
        id: number;
        name: string;
    }
    size?: number;
    id?: string;
    className?: string;
    style?: React.CSSProperties;
};

function getColor(id: number) {
    const hue = (id * 137) % 360;
    return `hsl(${hue}, 60%, 60%)`;
}

export default function ContactIcon({ contact, size = 50, id, className,style }: Props) {
    return (
        <div id={id || ""} className={`ContactIcon ${className || ""}`}
            style={{
                backgroundColor: getColor(contact.id),
                width: size,
                height: size,
                fontSize: size * 0.6,
                ...(style || {})}}
        >
            {contact.name?.[0] || "?"}
        </div>
    );
}