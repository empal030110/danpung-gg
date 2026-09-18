export const locales = ["ko", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ko";

export const isLocale = (value: string | undefined): value is Locale =>
    !!value && (locales as readonly string[]).includes(value);
