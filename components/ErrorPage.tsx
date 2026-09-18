"use client";

import { useEffect, useState } from "react";
import { DotLoader } from "react-spinners";
import { useTranslations } from "next-intl";

export default function ErrorPage() {
    const t = useTranslations("errors");
    const [count, setCount] = useState(3);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prev) => prev - 1);
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
        <div className="w-full h-full flex flex-col justify-center items-center gap-[16px] mt-[100px]">
            <DotLoader color="red" />
            <div className="text-[50px]">{t("retryHeading")}</div>
            <div>{t("retryCountdown", { count })}</div>
        </div>
    );
}
