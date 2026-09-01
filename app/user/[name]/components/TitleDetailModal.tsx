'use client';

import { useEffect } from "react";
import Image from "next/image";
import { FaTimes } from "react-icons/fa";
import { titleProps } from "../../userProps/props";
import { formatExpireDate } from "@/api/formatExpireDate";

export default function TitleDetailModal({ title, onClose }: { title: titleProps; onClose: () => void }) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [onClose]);

    const expireAt = title.date_expire ?? title.date_option_expire;
    const expireText = expireAt ? formatExpireDate(expireAt) : null;
    const descriptionLines = (title.title_description ?? "").split(/\r?\n/).map((line) => line.trim()).filter(Boolean);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-[16px]"
            onClick={onClose}
        >
            <div
                className="w-full max-w-[420px] max-h-[90vh] overflow-y-auto scrollbar-hide rounded-[16px] border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#171717] p-[20px]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-end">
                    <button type="button" onClick={onClose} aria-label="닫기" className="cursor-pointer text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200">
                        <FaTimes size={16} />
                    </button>
                </div>

                <p className="text-[16px] font-bold text-center">{title.title_name}</p>
                {expireText && <p className="text-[12px] text-center text-neutral-500 dark:text-neutral-400 mt-[4px]">{expireText}</p>}

                <div className="flex items-center gap-[16px] mt-[16px] pt-[16px] border-t border-neutral-300 dark:border-neutral-700">
                    <div className="shrink-0 w-[64px] h-[64px] flex items-center justify-center rounded-[8px] border-2 border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800">
                        <Image src={title.title_icon ?? ""} alt={title.title_name ?? ""} width={48} height={48} style={{ objectFit: "contain" }} unoptimized />
                    </div>
                </div>

                <div className="mt-[16px] pt-[16px] border-t border-neutral-300 dark:border-neutral-700">
                    <p className="text-[13px] text-neutral-500 dark:text-neutral-400">장비 분류 : 칭호</p>
                </div>

                {descriptionLines.length > 0 && (
                    <div className="mt-[16px] pt-[16px] border-t border-neutral-300 dark:border-neutral-700">
                        <p className="text-[13px] font-bold text-orange-400 mb-[4px]">기타</p>
                        <div className="flex flex-col gap-[2px]">
                            {descriptionLines.map((line, index) => (
                                <p key={index} className="text-[13px]">{line}</p>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
