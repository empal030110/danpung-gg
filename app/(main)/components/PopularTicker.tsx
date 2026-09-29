"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

type PopularEntry = { rank: number; name: string; count: number };

export default function PopularTicker({ entries }: { entries: PopularEntry[] }) {
    const t = useTranslations("popular");

    if (entries.length === 0) return null;

    const items = [...entries, ...entries]; // 끊김 없이 루프되도록 두 번 반복

    return (
        <div className="w-full overflow-hidden border-y border-neutral-600 py-[8px]">
            <div className="flex w-max gap-[40px] animate-ticker">
                {items.map((entry, index) => (
                    <Link
                        key={`${entry.name}-${index}`}
                        href={`/user/${encodeURIComponent(entry.name)}`}
                        prefetch={false}
                        className="flex items-center gap-[6px] text-[13px] whitespace-nowrap shrink-0"
                    >
                        <span className="font-bold">{t("rankLabel", { rank: entry.rank })}</span>
                        <span>{entry.name}</span>
                        <span className="text-neutral-400">{t("likeCount", { count: entry.count })}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
