import "./Search.css";

type Props = {
    onChange: (value: string) => void;
    placeholder: string;
    id?: string;
    className?: string;
    style?: React.CSSProperties;
};

export default function Search({ id, className, style, onChange, placeholder}: Props) {
    return (        
        <input id = {id} className = {`Search ${className || ""}`} onChange = {(e) => onChange(e.target.value)} type="text" placeholder={placeholder} style = {style}/>
    );
}