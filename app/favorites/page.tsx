import type { Metadata } from "next";
import FavoritesClient from "./components/FavoritesClient";

export const metadata: Metadata = {
    title: "즐겨찾기 - 단풍지지",
    description: "즐겨찾기한 캐릭터의 최신 정보를 한눈에 확인하세요.",
    robots: { index: false, follow: true },
};

export default function FavoritesPage() {
    return (
        <div className="w-full py-[40px]">
            <h1 className="text-[24px] font-bold mb-[8px]">즐겨찾기</h1>
            <p className="text-[13px] text-neutral-500 dark:text-neutral-400 mb-[24px]">즐겨찾기한 캐릭터의 최신 정보를 한눈에 확인하세요.</p>
            <FavoritesClient />
        </div>
    );
}
