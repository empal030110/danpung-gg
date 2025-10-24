'use client'

import { useEffect, useState } from "react";

export default function ErrorPage() {
    const [count, setCount] = useState(3);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount(prev => prev - 1);
        }, 1000);

        const timer = setTimeout(() => {
            window.location.reload();
        }, 3000);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, []);

    return (
        <div className="flex flex-col justify-center items-center gap-[16px]">
            <div className="text-[50px]">Oops!</div>
            <div>{count}초 뒤 재시도 합니다.</div>
        </div>
    );
}
