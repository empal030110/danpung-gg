"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
	const pathname = usePathname();
	const navItems = [
		{ href: "/", label: "메인" },
		{ href: "/guild", label: "길드" },
		{ href: "/guide", label: "가이드" },
	];

	return (
		<div className="w-full flex pt-[16px] gap-[12px] border-t border-neutral-600">
			{navItems.map(({ href, label }) => (
				<Link key={href} href={href} className={`${pathname === href ? "text-black font-bold dark:text-white" : "text-[#757575]"} transition-colors`}>
					{label}
				</Link>
			))}
		</div>
	);
}
