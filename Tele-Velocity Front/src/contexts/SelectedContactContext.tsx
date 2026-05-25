import { useState, useContext, useEffect, createContext } from "react";

import type { ReactNode } from "react";

import type {User} from "../types/user";

interface SelectedContactContextType {
    selectedContact: User | null;
    setSelectedContact: (user: User | null) => void;
}

const SelectedContactContext = createContext<SelectedContactContextType | null>(null);

export function SelectedContactProvider({children} : {children: ReactNode}) {

    const [selectedContact, setSelectedContact] = useState<User | null>(null);

    useEffect(() => {

        const savedSelectedContact = localStorage.getItem("selectedContact");

        if (savedSelectedContact) {
            setSelectedContact(JSON.parse(savedSelectedContact));
        }
    }, []);

    return (
        <SelectedContactContext.Provider 
            value={{ selectedContact, setSelectedContact}}
        >
            {children}
        </SelectedContactContext.Provider>
    );
}

export function useSelectedContact() {

    const context = useContext(SelectedContactContext);

    if(!context) {
        throw new Error("useSelectedContact must be used inside CurrentUserProvider")
    }

    return context;
}