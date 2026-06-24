import "./Resizer.css";

import { useEffect, useState } from "react";

interface ResizerProps {
    /** Function used to update sidebar width in percentages */
    setWidth: (width: number) => void;

    /** Minimum allowed width percentage */
    min?: number;

    /** Maximum allowed width percentage */
    max?: number;
}

export default function Resizer({
    setWidth,
    min = 320,
    max = 300,
}: ResizerProps) {
    const [isDragging, setIsDragging] =
        useState(false);

    useEffect(() => {
        function handleMove(e: MouseEvent) {
            if (!isDragging) return;

            const newWidth = Math.min(
                max,
                Math.max(min, e.clientX)
            );

            setWidth(newWidth);

            setWidth(newWidth);
        }

        function handleUp() {
            setIsDragging(false);
        }

        window.addEventListener(
            "mousemove",
            handleMove
        );

        window.addEventListener(
            "mouseup",
            handleUp
        );

        return () => {
            window.removeEventListener(
                "mousemove",
                handleMove
            );

            window.removeEventListener(
                "mouseup",
                handleUp
            );
        };
    }, [isDragging, min, max, setWidth]);

    return (
        <div
            className="Resizer"
            onMouseDown={() =>
                setIsDragging(true)
            }
        />
    );
}