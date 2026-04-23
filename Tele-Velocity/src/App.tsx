import {useState} from "react";
import "./style.css";
import {FiPaperclip, FiSend, FiMenu, FiMoreVertical, FiX} from "react-icons/fi"
import { BsChatFill } from "react-icons/bs";
import {contacts} from "./contacts.ts";
import ContactList from "./components/ContactList/ContactList.tsx";


function getColor(id: number) {
    const hue = (id * 137) % 360;
    return `hsl(${hue}, 60%, 60%)`;
}

function App() {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false)

    const [selectedId, setSelectedId] = useState<number | null>(null);
    const selectedContact = contacts.find(c => c.id === selectedId);
    return (
        <div id = "MainPage">
            <ContactList contacts={contacts} selectedId={selectedId} onSelect={setSelectedId} />
            <div id = "RightSide">
                {selectedContact === undefined ? (
                    <div id = "EmptyChat">

                    </div>
                ) : (
                    <div id = "Chat">
                        <div id = "RightTopSide">
                            <div id = "SelectedTopContactInfoButton" onClick={() => setIsSettingsOpen(true)}>
                                <div id = "SelectedContactIcon" style = {{backgroundColor: getColor(selectedContact.id)}}>
                                    <h2>{selectedContact.name[0]}</h2>
                                </div>
                                <div id = "SelectedTopContactInfo">
                                    <h2 id = "SelectedContactName">{selectedContact.name}</h2>
                                    <h2 id = "SelectedContactOnline">online</h2>
                                </div>
                            </div>
                            <div id = "SelectedContactSettings">
                                <button onClick={() => setIsSettingsOpen(!isSettingsOpen)}>
                                    {isSettingsOpen ? (
                                        <FiX className = "SelectedContactSettingsIcon" size={20} />
                                    ) : (
                                        <FiMoreVertical className = "SelectedContactSettingsIcon" size={24} />
                                    )}

                                </button>
                            </div>
                        </div>
                        {isSettingsOpen ? (
                            <div>
                                <div>
                                    <div id = "TopLeftSettingsContactSideWrapper">
                                        <div id = "TopLeftSettingsContactSide">
                                            <div id = "SelectedContactSettingsProfileIcon" style = {{backgroundColor: getColor(selectedContact.id)}}>
                                                <h2>{selectedContact.name[0]}</h2>
                                            </div>
                                            <div id = "Description">
                                                <h2>{selectedContact.name}</h2>
                                                <p>offline</p>
                                                <p>{selectedContact.description}</p>
                                                <button>
                                                    <BsChatFill id = "MessageIcon" size={20} />
                                                    Message
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <div className = "SelectedContactSettingsInfo">
                                                <p>username</p>
                                                <p className = "SelectedContactSettingsInfoP">{selectedContact.username}</p>
                                            </div>
                                            <div className = "SelectedContactSettingsInfo">
                                                <p>phone</p>
                                                <p className = "SelectedContactSettingsInfoP">{selectedContact.phone}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>

                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div id = "BackgroundChat">
                                <div id = "RightMidleSide">

                                </div>
                                <div id = "RightBottomSide">
                                    <button id = "Attach">
                                        <FiPaperclip id = "Clip" size={20}/>
                                    </button>
                                    <input id = "MessageInput" placeholder={"Write a message..."}/>
                                    <button id = "Send">
                                        <FiSend id = "SendIcon" size={20}/>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
   }

export default App;