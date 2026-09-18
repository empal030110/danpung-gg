"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { setLocale } from "@/app/actions/locale";
import { locales, Locale } from "@/i18n/config";

export default function LocaleSwitcher() {
    const locale = useLocale() as Locale;
    const t = useTranslations("locale");
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const nextLocale = locales.find((candidate) => candidate !== locale) ?? locale;

    const handleClick = () => {
        startTransition(async () => {
            await setLocale(nextLocale);
            router.refresh();
        });
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            disabled={isPending}
            aria-label={t("ariaLabel")}
            className="border w-fit px-[10px] py-[8px] rounded-[6px] cursor-pointer text-[12px] font-bold disabled:opacity-50"
        >
            {nextLocale.toUpperCase()}
        </button>
    );
}
