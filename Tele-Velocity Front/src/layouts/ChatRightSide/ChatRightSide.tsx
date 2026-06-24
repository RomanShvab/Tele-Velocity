import "./ChatRightSide.css";

import { useRef, useState, useEffect } from "react";

import {FiMoreVertical, FiX, FiSend, FiPaperclip, FiMic} from "react-icons/fi";
import { BsChatFill } from "react-icons/bs";

import ContactIcon from "../../components/ContactIcon/ContactIcon";
import TextInput from "../../components/TextInput/TextInput";
import IconButton from "../../components/IconButton/IconButton";
import Chat from "../Chat/Chat";

import {useSelectedContact} from "../../contexts/SelectedContactContext";

import type {ChatMessage} from "../Chat/Chat";
import type { User } from "../../types/user";

import { API_URL } from "../../api";



interface ChatRightSideProps {
    /** Current user of the chat application */
    currentUser?: User;

    /** Currently selected contact */
    contact?: User;

    /** Messages of selected chat */
    messages: ChatMessage[];

    setMessages: React.Dispatch<
        React.SetStateAction<ChatMessage[]>
    >;

    loadContacts: () => Promise<void>;

    /** HTML id attribute */
    id?: string;

    /** Additional CSS classes */
    className?: string;

    /** Inline styles */
    style?: React.CSSProperties;
}

export default function ChatRightSide({
    currentUser,
    contact,
    messages,
    setMessages,
    id,
    className = "",
    style,
    loadContacts
}: ChatRightSideProps) {
    const { selectedContact } = useSelectedContact();

    const [isSettingsOpen, setIsSettingsOpen] =
        useState(false);
    const [message, setMessage] = useState("");

    const recorderRef = useRef<MediaRecorder | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    

    if (!contact) {
        return (
            <div
                className={`ChatRightSide ${className}`}
                id={id}
                style={style}
            >
                <div className="ChatRightSideEmpty">
                    Select a contact
                </div>
            </div>
        );
    }

    async function startVoiceRecording() {
        if (recorderRef.current) return;
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true
        });
        const recorder = new MediaRecorder(stream);

        chunksRef.current = [];

        recorder.ondataavailable = (event) => {
            chunksRef.current.push(event.data);
        };

        recorder.onstop = async () => {
            const audioBlob = new Blob(
                chunksRef.current,
                {
                    type: "audio/webm"
                }
            );

            console.log("type:", audioBlob.type);
            console.log("size:", audioBlob.size);

            const formData = new FormData();

            formData.append(
                "file",
                audioBlob,
                "voice_message.webm"
            );

            formData.append(
                "senderId",
                String(currentUser?.id)
            );

            formData.append(
                "receiverId",
                String(contact?.id)
            );

            const response = await fetch(
                `${API_URL}/messages/voice`,
                {
                    method: "POST",
                    body: formData
                }
            );

            if (!response.ok) {
                console.error("Voice upload failed");
                return;
            }

            const message = await response.json();
            setMessages(prev => [...prev, message]);
        }
        recorderRef.current = recorder;
        recorder.start();
        streamRef.current = stream;
    }
    
    async function stopVoiceRecording() {

        if (recorderRef.current) {
            recorderRef.current.stop();
            recorderRef.current = null;
        }

        if (streamRef.current) {
            streamRef.current
                .getTracks()
                .forEach(track => track.stop());

            streamRef.current = null;
        }
    }

    async function sendMessage() {

        if (!message.trim())
            return;

        if (!contact)
        return;

        try {

            const response = await fetch(
                `${API_URL}/messages/send?senderId=${currentUser?.id}&receiverId=${contact?.id}&content=${message}`,
                {
                    method: "POST",
                }
            );

            const data = await response.json();

            setMessages((prev) => [...prev, data]);

            setMessage("");

            await loadContacts();

        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {

        const handleMouseUp = () => {
            stopVoiceRecording();
        };

        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mouseup", handleMouseUp);
        };

    }, []);

    return (
        <div
            className={`ChatRightSide ${className}`}
            id={id}
            style={style}
        >
            <div className="ChatRightSideTopBar">
                <div
                    className="ChatRightSideContactButton"
                    onClick={() =>
                        setIsSettingsOpen(true)
                    }
                >
                    <ContactIcon
                        name={contact.name}
                        size={40}
                        //avatar={contact.avatar}
                    />

                    <div className="ChatRightSideContactInfo">
                        <div className="ChatRightSideContactName">
                            {contact.name}
                        </div>

                        <div className="ChatRightSideContactStatus">
                            {"online"}
                        </div>
                    </div>
                </div>

                <IconButton id="ChatRightSideSettingsButton"
                    icon={
                        isSettingsOpen ? (
                            <FiX size={20} />
                        ) : (
                            <FiMoreVertical size={20} />
                        )
                    }
                    size={40}
                    onClick={() =>
                        setIsSettingsOpen(
                            (prev) => !prev
                        )
                    }
                />
            </div>

            <div className="ChatRightSideMain">                
                {isSettingsOpen ? (
                    <div>
                        <div>
                            <div id = "TopLeftSettingsContactSideWrapper">
                                <div id = "TopLeftSettingsContactSide">
                                    <ContactIcon
                                        name={selectedContact?.name}
                                        size={160}
                                        //avatar={selectedContact.avatar}
                                    />
                                    <div id = "Description">
                                        <h2>{selectedContact?.name}</h2>
                                        <p>offline</p>

                                        <div id="DescriptionBio">
                                            <span id="DescriptionBioLabel">Bio</span>
                                            <p>{selectedContact?.bio ? selectedContact.bio : "No bio available"}</p>
                                        </div>

                                        <button>
                                            <BsChatFill id = "MessageIcon" size={20} />
                                            Message
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <div className = "SelectedContactSettingsInfo">
                                        <p>username</p>
                                        <p className = "SelectedContactSettingsInfoP">{selectedContact?.email}</p>
                                    </div>
                                    <div className = "SelectedContactSettingsInfo">
                                        <p>phone</p>
                                        <p className = "SelectedContactSettingsInfoP">{selectedContact?.phone ? selectedContact.phone : "Not provided"}</p>
                                    </div>
                                </div>
                            </div>
                            <div>

                            </div>
                        </div>
                    </div>
                ) : (
                    <Chat
                        messages={messages}
                        currentUser={currentUser}
                        selectedContact={contact}
                    />
                )}
            </div>

            <div className="ChatRightSideBottomBar">
                <IconButton
                    icon={<FiPaperclip size={20}/>}
                    size = {40}
                />

                <TextInput
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {

                    if (e.key === "Enter") {

                        e.preventDefault();

                        sendMessage();
                    }
                }}
                />
                {message.trim().length > 0 ? (
                    <IconButton
                        icon={<FiSend size={20}/>}
                        size = {40}
                        onClick={sendMessage}
                    />
                ) : (
                    <IconButton
                        icon={<FiMic size={20}/>}
                        size = {40}
                        onMouseDown = {startVoiceRecording}
                    />
                )}
            </div>
        </div>
    );
}