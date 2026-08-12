'use client'

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
    return (
        <div className="border w-fit p-[8px] rounded-[6px] cursor-pointer" onClick={modeChange}>
            <FaMoon />
        </div>
    )
}