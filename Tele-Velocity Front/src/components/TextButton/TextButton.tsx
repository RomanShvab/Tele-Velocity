import "./TextButton.css";

interface TextButtonProps {
    /** Text displayed inside button */
    text?: string;

    /** Tooltip text */
    title?: string;

    /** Button width in pixels */
    width?: number | string;

    /** Button height in pixels */
    height?: number | string;

    /** HTML id attribute */
    id?: string;

    /** Additional CSS class names */
    className?: string;

    /** Inline styles */
    style?: React.CSSProperties;

    /** Is button disabled */
    disabled?: boolean;

    /** Callback function on click */
    onClick?: () => void;
}

export default function TextButton({
    text,
    width,
    height,
    onClick,
    id,
    className = "",
    title,
    style,
    disabled = false,
}: TextButtonProps) {
    return (
        <button
            id={id}
            className={`TextButton ${className}`}
            onClick={onClick}
            title={title}
            disabled={disabled}
            style={{
                width,
                height,
                ...style,
            }}
        >
            {text ? text : "TextNotFound"}
        </button>
    );
}