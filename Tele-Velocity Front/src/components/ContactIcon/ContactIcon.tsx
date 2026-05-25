import "./ContactIcon.css";

interface ContactIconProps {
    /** User display name */
    name?: string;

    /** Avatar image url */
    avatarUrl?: string | null;

    /** Icon size in pixels */
    size?: number;

    /** HTML id attribute */
    id?: string;

    /** Additional CSS classes */
    className?: string;

    /** Inline styles */
    style?: React.CSSProperties;

    onClick?: () => void;
}

function getColor(name: string) {
    let hash = 0;

    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    const hue = Math.abs(hash % 360);

    return `hsl(${hue}, 60%, 60%)`;
}

export default function ContactIcon({
    name,
    avatarUrl,
    size = 50,
    id,
    className = "",
    style,
    onClick,
    
}: ContactIconProps) {
    const firstLetter = name ? name.charAt(0).toUpperCase() : "?";

    return (
        <div
            id={id}
            className={`ContactIcon ${className}`}
            style={{
                width: size,
                height: size,
                fontSize: size * 0.6,
                backgroundColor: getColor(name ? name : ""),
                ...style,
            }}
            onClick = {onClick}
        >
            {avatarUrl != null && avatarUrl != undefined ? (
                <img
                    src={avatarUrl}
                    alt={firstLetter}
                    className="ContactIcon-image"
                />
            ) : (
                <span
                    style={{
                        transform: `translateY(-${size * 0.03}px)`,
                    }}
                >
                    {firstLetter}
                </span>
            )}
        </div>
    );
}