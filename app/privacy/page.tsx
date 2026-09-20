import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

const CONTACT_EMAIL = "empal03@gmail.com";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations("metadata.privacy");
    return { title: t("title") };
}

export default async function PrivacyPage() {
    const t = await getTranslations("privacy");

    const sections: { title: string; body: React.ReactNode }[] = [
        {
            title: t("sections.collection.title"),
            body: <p>{t("sections.collection.body")}</p>,
        },
        {
            title: t("sections.localStorage.title"),
            body: <p>{t("sections.localStorage.body")}</p>,
        },
        {
            title: t("sections.autoCollected.title"),
            body: (
                <>
                    <p>{t("sections.autoCollected.body")}</p>
                    <ul className="list-disc pl-[20px] mt-[8px] flex flex-col gap-[4px]">
                        <li>{t("sections.autoCollected.items.vercel")}</li>
                        <li>{t("sections.autoCollected.items.nexon")}</li>
                    </ul>
                </>
            ),
        },
        {
            title: t("sections.cookiesAds.title"),
            body: (
                <p>
                    {t.rich("sections.cookiesAds.body", {
                        link: (chunks) => (
                            <a
                                href="https://adssettings.google.com"
                                target="_blank"
                                rel="noreferrer"
                                className="underline mx-[4px]"
                            >
                                {chunks}
                            </a>
                        ),
                    })}
                </p>
            ),
        },
        {
            title: t("sections.thirdParty.title"),
            body: <p>{t("sections.thirdParty.body")}</p>,
        },
        {
            title: t("sections.externalApi.title"),
            body: <p>{t("sections.externalApi.body")}</p>,
        },
        {
            title: t("sections.contact.title"),
            body: (
                <p>
                    {t("sections.contact.intro")}
                    <br />
                    {t("sections.contact.emailLabel", { email: CONTACT_EMAIL })}
                </p>
            ),
        },
    ];

    return (
        <div className="w-full py-[40px] flex flex-col gap-[32px]">
            <div>
                <h1 className="text-[24px] font-bold mb-[8px]">{t("heading")}</h1>
                <p className="text-[13px] text-neutral-500 dark:text-neutral-400">{t("effectiveDate")}</p>
            </div>
            <div className="flex flex-col gap-[24px] text-[14px] leading-[1.7]">
                {sections.map((section) => (
                    <div key={section.title}>
                        <h2 className="font-bold mb-[8px]">{section.title}</h2>
                        <div className="text-neutral-700 dark:text-neutral-300">{section.body}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
