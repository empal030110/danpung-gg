import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getTopLiked } from "@/lib/likes";
import NotInfoText from "@/components/NotInfoText";

const POPULAR_PAGE_COUNT = 10;

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations("metadata.popular");
    return { title: t("title"), description: t("description") };
}

export default async function PopularPage() {
    const t = await getTranslations("popular");
    const entries = await getTopLiked(POPULAR_PAGE_COUNT).catch(() => []);

    return (
        <div className="w-full py-[40px]">
            <h1 className="text-[24px] font-bold mb-[8px]">{t("heading")}</h1>
            <p className="text-[13px] text-neutral-500 dark:text-neutral-400 mb-[24px]">{t("description")}</p>
            {entries.length === 0 ? (
                <NotInfoText>{t("empty")}</NotInfoText>
            ) : (
                <ol className="flex flex-col gap-[8px]">
                    {entries.map((entry, index) => (
                        <li key={entry.name}>
                            <Link
                                href={`/user/${encodeURIComponent(entry.name)}`}
                                prefetch={false}
                                className="flex items-center justify-between gap-[12px] p-[12px] border border-neutral-300 dark:border-neutral-700 rounded-[12px] hover:bg-gray-100 dark:hover:bg-neutral-800"
                            >
                                <span className="flex items-center gap-[12px]">
                                    <span className="font-bold w-[36px]">{t("rankLabel", { rank: index + 1 })}</span>
                                    <span>{entry.name}</span>
                                </span>
                                <span className="text-neutral-500 dark:text-neutral-400 text-[13px]">
                                    {t("likeCount", { count: entry.count })}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ol>
            )}
        </div>
    );
}
