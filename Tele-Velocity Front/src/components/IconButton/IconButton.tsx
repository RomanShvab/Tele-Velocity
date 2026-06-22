import "./IconButton.css";

interface IconButtonProps {
    /** React node to be displayed as the button's icon */
    icon?: React.ReactNode;

    /** Tooltip text */
    title?: string;
    
    /** Button size in pixels (width and height) */
    size?: number;
    
    /** HTML id attribute */
    id?: string;
    
    /** Additional CSS class names */
    className?: string;

    /** Inline styles */
    style?: React.CSSProperties;

    /** Callback function to be called when the button is clicked */
    onClick?: () => void;

    onMouseDown?: () => void;

    onMouseUp?: () => void;
}

export default function IconButton({
    icon,
    onClick,
    onMouseDown,
    onMouseUp,
    size = 50,
    id,
    className = "",
    title,
    style,
}: IconButtonProps) {
    return (
        <button
            id={id}
            className={`IconButton ${className}`}
            onClick={onClick}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            title={title}
            style={{
                width: size,
                height: size,
                ...style,
            }}
        >
            {icon ? icon : "?"}
        </button>
    );
}