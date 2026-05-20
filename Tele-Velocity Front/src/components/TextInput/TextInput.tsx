import "./TextInput.css";

interface TextInputProps {
    /** Placeholder text for the input field */
    placeholder?: string;

    /** Input value */
    value?: string;

    /** Input type (e.g., "text", "password", "email") */
    type?: string;

    /** Required value in input */
    required?: boolean;

    /** HTML id attribute */
    id?: string;
    
    /** Additional CSS class names */
    className?: string;

    /** Inline styles */
    style?: React.CSSProperties;

    /** Callback function to be called when the input value changes */
    onChange?: (
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;
}

export default function TextInput({
    type = "text",
    placeholder = "",
    required = false,
    id,
    className = "",
    style,
    value,
    onChange
}: TextInputProps) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            id={id}
            className={`TextInput ${className}`}
            style={style}
            value={value}
            onChange={onChange}
            required = {required}
        />
    );
}