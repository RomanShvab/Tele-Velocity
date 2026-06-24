import { useEffect, useRef, useState } from "react";
import "./VoiceMessage.css";

interface VoiceMessageProps {
    src: string;
}

export default function VoiceMessage({
    src
}: VoiceMessageProps) {

    const audioRef = useRef<HTMLAudioElement>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    function togglePlay() {

        if (!audioRef.current)
            return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }

        setIsPlaying(!isPlaying);
    }

    useEffect(() => {

        const audio = audioRef.current;

        if (!audio)
            return;

        const updateTime = () => {
            setCurrentTime(audio.currentTime);
        };

        const loaded = () => {
            setDuration(audio.duration);
        };

        const ended = () => {
            setIsPlaying(false);
            setCurrentTime(0);
        };

        audio.addEventListener("timeupdate", updateTime);
        audio.addEventListener("loadedmetadata", loaded);
        audio.addEventListener("ended", ended);

        return () => {
            audio.removeEventListener("timeupdate", updateTime);
            audio.removeEventListener("loadedmetadata", loaded);
            audio.removeEventListener("ended", ended);
        };

    }, []);

    const progress =
        duration > 0
            ? (currentTime / duration) * 100
            : 0;

    function formatTime(time: number) {

        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);

        return `${minutes}:${seconds
            .toString()
            .padStart(2, "0")}`;
    }

    return (
        <div className="VoiceMessage">

            <button
                className="VoiceMessagePlay"
                onClick={togglePlay}
            >
                {isPlaying ? "⏸" : "▶"}
            </button>

            <div className="VoiceMessageCenter">

                <div className="VoiceMessageBar">

                    <div
                        className="VoiceMessageProgress"
                        style={{
                            width: `${progress}%`
                        }}
                    />

                </div>

                <div className="VoiceMessageTime">
                    {formatTime(duration)}
                </div>

            </div>

            <audio
                ref={audioRef}
                src={src}
            />

        </div>
    );
}