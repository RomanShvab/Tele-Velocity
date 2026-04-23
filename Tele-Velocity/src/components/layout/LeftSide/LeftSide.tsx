import { useState } from "react";
import ContactList from "../contacts/ContactList";
import { FiMenu } from "react-icons/fi";

export default function LeftSide({ width, contacts, selectedId, setSelectedId }: any) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ width: `${width}vw` }}>
      <button onClick={() => setOpen(!open)}>
        <FiMenu />
      </button>

      {open && <div>Menu</div>}

      <ContactList
        contacts={contacts}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    </div>
  );
}