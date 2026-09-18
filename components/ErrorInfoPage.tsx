"use client";

import Link from "next/link";
import { FaUserAltSlash } from "react-icons/fa";
import { useTranslations } from "next-intl";

export default function ErrorInfoPage({ message }: { message: string }) {
    const t = useTranslations("errors");

    return (
        <div className="w-full">
            <div className="flex flex-col items-center">
                <div className="mb-[16px]">
                    <FaUserAltSlash size={64} />
                </div>
                <h2>{t("notFoundHeading")}</h2>
                <p className="mt-[8px]">{message}</p>
                <div className="mt-[32px] flex gap-[8px]">
                    <button
                        onClick={() => window.location.reload()}
                        className="p-[12px] bg-gray-400 rounded-[12px] text-black text-[14px] cursor-pointer"
                    >
                        {t("refresh")}
                    </button>
                    <Link href="/" className="p-[12px] bg-gray-400 rounded-[12px] text-black text-[14px]">
                        {t("toHome")}
                    </Link>
                </div>
            </div>
        </div>
    );
}
