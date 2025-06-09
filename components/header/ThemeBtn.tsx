'use client'

import { useEffect } from "react";
import { FaMoon } from "react-icons/fa";

const themeMode = "theme";

const modeChange = () => {
    const html = document.documentElement;
    const isDark = html.classList.contains("dark");

    if (isDark) {
        html.classList.remove("dark");
        localStorage.setItem(themeMode, "light");
        return;
    } 
    html.classList.add("dark");
    localStorage.setItem(themeMode, "dark");
    return;
}

export default function ThemeBtn() {
    useEffect(() => {
        const savedTheme = localStorage.getItem(themeMode);
        const html = document.documentElement;

        if (savedTheme === "dark") {
            html.classList.add("dark");
        } else if (savedTheme === "light") {
            html.classList.remove("dark");
        }
    }, []);

    return (
        <div className="border w-fit p-[8px] rounded-[6px] cursor-pointer" onClick={modeChange}>
            <FaMoon />
        </div>
    )
}