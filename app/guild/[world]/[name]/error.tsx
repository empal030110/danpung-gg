"use client";

import { useTranslations } from "next-intl";
import ErrorInfoPage from "@/components/ErrorInfoPage";

export default function Error() {
    const t = useTranslations("errors");
    return <ErrorInfoPage message={t("guildNotFound")} />;
}
