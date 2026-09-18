"use server";

import { cookies } from "next/headers";
import { Locale } from "@/i18n/config";

export async function setLocale(locale: Locale) {
    (await cookies()).set("locale", locale, { maxAge: 60 * 60 * 24 * 365, path: "/" });
}
