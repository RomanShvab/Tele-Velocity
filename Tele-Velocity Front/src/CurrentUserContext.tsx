import { createContext, useContext, useEffect, useState } from "react";

import type { ReactNode } from "react";

interface User {
  id?: number;
  avatarUrl?: string;
  bio?: string;
  email: string;
  name: string;
  phone?: string;
}

interface CurrentUserContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
}

const CurrentUserContext = createContext<CurrentUserContextType | null>(null);

export function CurrentUserProvider({ children }: { children: ReactNode }) {

  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {

    const savedUser = localStorage.getItem("currentUser");

    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }

  }, []);

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, setCurrentUser }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
}

export function useCurrentUser() {

  const context = useContext(CurrentUserContext);

  if (!context) {
    throw new Error("useCurrentUser must be used inside CurrentUserProvider");
  }

  return context;
}