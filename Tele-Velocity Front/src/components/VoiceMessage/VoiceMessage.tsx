import { useEffect, useRef, useState } from "react";
import "./VoiceMessage.css";

import { IoPlay, IoPause } from "react-icons/io5";

interface VoiceMessageProps {
    src: string;
    waveform?: string;
    className?: string;
    style?: React.CSSProperties;
}

export default function VoiceMessage({
    src,
    waveform,
    className,
    style
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

    const bars: number[] = waveform
        ? JSON.parse(waveform)
        : [];

    const progress =
        duration > 0
            ? (currentTime / duration)
            : 0;

    function formatTime(time: number) {

        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);

        return `${minutes}:${seconds
            .toString()
            .padStart(2, "0")}`;
    }

    return (
        <div className={`VoiceMessage ${className}`} style={style}>

            <button
                className="VoiceMessagePlay"
                onClick={togglePlay}
            >
                {isPlaying
                    ? <IoPause size={16} />
                    : <IoPlay size={16} />
                }
            </button>

            <div className="VoiceMessageCenter">

                <div className="VoiceWaveform">
                    {bars.map((height, index) => {

                        const playedBars =
                            Math.floor(progress * bars.length);

                        const color = !isPlaying
                            ? "#ffffff"
                            : index < playedBars
                                ? "#ffffff"
                                : "#ffffff86";

                        return (
                            <div
                                key={index}
                                className="VoiceBar"
                                style={{
                                    height: `${height}px`,
                                    backgroundColor: color
                                }}
                            />
                        );
                    })}
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