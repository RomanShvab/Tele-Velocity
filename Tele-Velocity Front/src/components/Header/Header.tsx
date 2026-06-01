import "./Header.css";

interface HeaderProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

export default function Header({
    icon,
    title,
    description,
}: HeaderProps) {
    return (
        <div className="Header">
            <div className="HeaderIcon">
                {icon}
            </div>

            <h1>{title}</h1>

            <p>{description}</p>
        </div>
    );
}