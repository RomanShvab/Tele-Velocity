import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

import Notification from "../components/Notification/Notification";

type NotificationType = "success" | "error" | "info";

type NotificationItem = {
  id: number;
  message: string;
  type: NotificationType;
};

interface NotificationContextType {
  notify: (message: string, type?: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

const MAX_NOTIFICATIONS = 3;
const AUTO_DISMISS_MS = 2000;

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const timeoutsRef = useRef<Record<number, number>>({});
  const nextIdRef = useRef(0);

  useEffect(() => {
    return () => {
      Object.values(timeoutsRef.current).forEach((timeoutId) => {
        window.clearTimeout(timeoutId);
      });
      timeoutsRef.current = {};
    };
  }, []);

  function removeNotification(id: number) {
    setNotifications((current) => current.filter((notification) => notification.id !== id));
    if (timeoutsRef.current[id]) {
      window.clearTimeout(timeoutsRef.current[id]);
      delete timeoutsRef.current[id];
    }
  }

  function notify(message: string, type: NotificationType = "info") {
    const id = nextIdRef.current++;

    setNotifications((current) => {
      const next = [...current, { id, message, type }];
      if (next.length > MAX_NOTIFICATIONS) {
        const [oldest, ...rest] = next;
        if (timeoutsRef.current[oldest.id]) {
          window.clearTimeout(timeoutsRef.current[oldest.id]);
          delete timeoutsRef.current[oldest.id];
        }
        return rest;
      }
      return next;
    });

    timeoutsRef.current[id] = window.setTimeout(() => {
      removeNotification(id);
    }, AUTO_DISMISS_MS);
  }

  function handleClose(id: number) {
    removeNotification(id);
  }

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <div className="NotificationContainer">
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            message={notification.message}
            type={notification.type}
            onClose={() => handleClose(notification.id)}
          />
        ))}
      </div>
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error("useNotification must be used inside NotificationProvider");
  }

  return context;
}
