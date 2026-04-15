import {useState} from "react";
import "./style.css";
import {FiPaperclip, FiSend, FiMenu, FiMoreVertical, FiX} from "react-icons/fi"
import { BsChatFill } from "react-icons/bs";
import {contacts} from "./contacts.ts";


function getColor(id: number) {
    const hue = (id * 137) % 360;
    return `hsl(${hue}, 60%, 60%)`;
}

function App() {
    const [open, setOpen] = useState(false); //BurgerButton
    const [select, setSelect] = useState<number | null>(null); //WybieranieKontaktu
    const [width, setWidth] = useState(20)
    const [isDragging, setIsDragging] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false)

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;
        const widthInPercents = e.clientX/window.innerWidth*100
        setWidth(widthInPercents);
    };

    // const handleMouseUp = () => {
    //     setIsDragging(false);
    // };

    const handleMouseDown = () => {
        setIsDragging(true);
    };


    const selectedContact = contacts.find(c => c.id === select);

    return (
        <div id = "MainPage"
             onMouseMove={(e) => handleMouseMove(e.nativeEvent)}
             onMouseUp={() => setIsDragging(false)}
             style={{ display: "flex", height: "100vh" }}
        >

            <div id = "LeftSide" style={{width: `${width}vw`}}>

                <div id = "LeftTopSide">

                    <div id = "DropDown">
                        <button id = "BurgerButton" onClick={() => setOpen(!open)}>
                            <FiMenu id = "BurgerIcon" size={24} />
                        </button>
                        {open && (
                            <div id = "DropDownMenu">
                                <div className = "DropDownMenuOptions">
                                    Profile
                                </div>
                                <div className = "DropDownMenuOptions">
                                    Settings
                                </div>
                                <div className = "DropDownMenuOptions">
                                    Logout
                                </div>
                            </div>
                        )}
                    </div>
                    <div id = "Search" >
                        <input id = "SearchInput" style = {{width: `calc(${width}vw - 55px)`}} type="text" placeholder="Search..."/>
                    </div>
                </div>
                <div id = "LeftBottomSide">
                    {contacts.map((contact) => (
                        <div className = {`Contact ${select === contact.id ? "Selected" : ""}`} onClick={() => setSelect(contact.id)}>
                            <div className = "ContactIcon" style = {{backgroundColor: getColor(contact.id)}}>
                                <h2>{contact.name[0]}</h2>
                            </div>


                            <div className = "ContactInfo">
                                <div className = "TopContactInfo">
                                    <h2 className = "ContactName">{contact.name}</h2>
                                    <h2 className = "ContactTime">{contact.time}</h2>
                                </div>
                                <div className = "BottomContactInfo">
                                    <h2 className = "ContactDesc">{contact.desc}</h2>
                                </div>
                            </div>

                        </div>
                    ))}


                </div>

            </div>
            <div id = "Resizer" onMouseDown={handleMouseDown}></div>
            <div id = "RightSide">
                {selectedContact === undefined ? (
                    <div id = "EmptyChat">

                    </div>
                ) : (
                    <div id = "Chat">
                        <div id = "RightTopSide">
                            <div id = "SelectedContactIcon" style = {{backgroundColor: getColor(selectedContact.id)}}>
                                <h2>{selectedContact.name[0]}</h2>
                            </div>
                            <div id = "SelectedTopContactInfo">
                                <h2 id = "SelectedContactName">{selectedContact.name}</h2>
                                <h2 id = "SelectedContactOnline">online</h2>
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
                                    <div>
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
                                            <div>
                                                <p>username</p>
                                                <p>{selectedContact.username}</p>
                                            </div>
                                            <div>
                                                <p>phone</p>
                                                <p>{selectedContact.phone}</p>
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