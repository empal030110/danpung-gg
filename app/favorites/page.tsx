import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import FavoritesClient from "./components/FavoritesClient";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations("metadata.favorites");
    return {
        title: t("title"),
        description: t("description"),
        robots: { index: false, follow: true },
    };
}

export default async function FavoritesPage() {
    const t = await getTranslations("favorites");

    return (
        <div className="w-full py-[40px]">
            <h1 className="text-[24px] font-bold mb-[8px]">{t("heading")}</h1>
            <p className="text-[13px] text-neutral-500 dark:text-neutral-400 mb-[24px]">{t("description")}</p>
            <FavoritesClient />
        </div>
    );
}
