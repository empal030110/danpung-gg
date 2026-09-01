import type { Metadata } from "next";
import GuildSearchBar from "@/components/GuildSearchBar";

export const metadata: Metadata = {
    title: "길드 검색 - 단풍지지",
    description: "월드와 길드명으로 메이플스토리 길드원 목록과 노블레스 스킬 정보를 조회하세요.",
};

export default function Guild() {
    return (
        <div className="w-full py-[80px] flex items-center justify-center">
            <GuildSearchBar />
        </div>
    );
}
