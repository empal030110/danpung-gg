'use client';

import { useEffect, useState } from "react";
import { DotLoader } from "react-spinners";

export default function Loading() {
    const [color, setColor] = useState("#ffffff");

    useEffect(() => {
        const isDark = document.documentElement.classList.contains("dark");
        setColor(isDark ? "#ffffff" : "#000000");
    }, []);

    return (
        <div className="w-full h-full flex flex-col justify-center items-center gap-[16px] mt-[100px]">
            <DotLoader color={color} />
        </div>
    );
}
