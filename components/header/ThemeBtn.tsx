'use client'

import { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";

const themeMode = "theme";

export default function ThemeBtn() {
    // 서버는 저장된 테마를 모르니 항상 dark로 렌더링됨 -> 마운트 후 실제 클래스로 동기화
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        setIsDark(document.documentElement.classList.contains("dark"));
    }, []);

    const modeChange = () => {
        const html = document.documentElement;
        const nextIsDark = !html.classList.contains("dark");

        if (nextIsDark) {
            html.classList.add("dark");
            localStorage.setItem(themeMode, "dark");
        } else {
            html.classList.remove("dark");
            localStorage.setItem(themeMode, "light");
        }
        setIsDark(nextIsDark);
    };

    return (
        <button
            type="button"
            onClick={modeChange}
            aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
            aria-pressed={isDark}
            className="border w-fit p-[8px] rounded-[6px] cursor-pointer"
        >
            <FaMoon />
        </button>
    );
}
