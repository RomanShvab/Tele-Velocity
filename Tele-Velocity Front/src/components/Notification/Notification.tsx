import "./Notification.css";

interface NotificationProps {
  message: string;
  type: "success" | "error" | "info";
  onClose: () => void;
}

export default function Notification({ message, type, onClose }: NotificationProps) {
  return (
    <div className={`Notification Notification--${type}`} role="status">
      <span className="NotificationMessage">{message}</span>
      <button className="NotificationClose" onClick={onClose} aria-label="Close notification">
        ×
      </button>
    </div>
  );
}
