import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import GuildSearchBar from "@/components/GuildSearchBar";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations("metadata.guild");
    return {
        title: t("title"),
        description: t("description"),
    };
}

export default function Guild() {
    return (
        <div className="w-full py-[80px] flex items-center justify-center">
            <GuildSearchBar />
        </div>
    );
}
