import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations("metadata.guide");
    return { title: t("title"), description: t("description") };
}

const USER_INFO_TAB_KEYS = ["equipment", "stat", "skill", "union", "codi", "etc"] as const;

export default async function GuidePage() {
    const t = await getTranslations("guide");
    const tUserTabs = await getTranslations("userTabs");
    const faqItems = t.raw("sections.faq.items") as { q: string; a: string }[];

    const sections: { title: string; body: React.ReactNode }[] = [
        {
            title: t("sections.intro.title"),
            body: <p>{t("sections.intro.body")}</p>,
        },
        {
            title: t("sections.userInfo.title"),
            body: (
                <>
                    <p>{t("sections.userInfo.intro")}</p>
                    <ul className="list-disc pl-[20px] mt-[8px] flex flex-col gap-[4px]">
                        {USER_INFO_TAB_KEYS.map((key) => (
                            <li key={key}>
                                <b>{tUserTabs(key)}</b> — {t(`sections.userInfo.items.${key}`)}
                            </li>
                        ))}
                    </ul>
                </>
            ),
        },
        {
            title: t("sections.guild.title"),
            body: <p>{t.rich("sections.guild.body", { b: (chunks) => <b>{chunks}</b> })}</p>,
        },
        {
            title: t("sections.recentFavorites.title"),
            body: <p>{t("sections.recentFavorites.body")}</p>,
        },
        {
            title: t("sections.faq.title"),
            body: (
                <div className="flex flex-col gap-[16px]">
                    {faqItems.map((item) => (
                        <div key={item.q}>
                            <p className="font-semibold">{item.q}</p>
                            <p className="mt-[4px]">{item.a}</p>
                        </div>
                    ))}
                </div>
            ),
        },
    ];

    return (
        <div className="w-full py-[40px] flex flex-col gap-[32px]">
            <div>
                <h1 className="text-[24px] font-bold mb-[8px]">{t("heading")}</h1>
                <p className="text-[13px] text-neutral-500 dark:text-neutral-400">{t("subheading")}</p>
            </div>
            <div className="flex flex-col gap-[24px] text-[14px] leading-[1.7]">
                {sections.map((section) => (
                    <div key={section.title}>
                        <h2 className="font-bold mb-[8px]">{section.title}</h2>
                        <div className="text-neutral-700 dark:text-neutral-300">{section.body}</div>
                    </div>
                ))}
            </div>
            <p className="text-[13px] text-neutral-500 dark:text-neutral-400">
                {t.rich("footer", {
                    link: (chunks) => (
                        <Link
                            href="/privacy"
                            className="underline hover:text-neutral-700 dark:hover:text-neutral-200"
                        >
                            {chunks}
                        </Link>
                    ),
                })}
            </p>
        </div>
    );
}
