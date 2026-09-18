"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

export default function NavBar() {
    const pathname = usePathname();
    const t = useTranslations("nav");
    const navItems = [
        { href: "/", label: t("home") },
        { href: "/guild", label: t("guild") },
        { href: "/favorites", label: t("favorites") },
        { href: "/guide", label: t("guide") },
    ];

    return (
        <nav aria-label={t("ariaLabel")} className="w-full flex pt-[16px] gap-[12px] border-t border-neutral-600">
            {navItems.map(({ href, label }) => (
                <Link
                    key={href}
                    href={href}
                    className={`${pathname === href ? "text-black font-bold dark:text-white" : "text-[#757575]"} transition-colors`}
                >
                    {label}
                </Link>
            ))}
        </nav>
    );
}
