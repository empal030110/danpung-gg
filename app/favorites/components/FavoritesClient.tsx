'use client';

import { useEffect, useState } from "react";
import { DotLoader } from "react-spinners";
import { useFavoriteStore } from "@/store/useFavoriteStore";
import NotInfoText from "@/components/NotInfoText";
import { FavoriteSummary } from "@/app/api/favorites/route";
import FavoriteCard from "./FavoriteCard";

export default function FavoritesClient() {
    const { favorites, removeFavorite } = useFavoriteStore();
    const [hasMounted, setHasMounted] = useState(false);
    const [summaries, setSummaries] = useState<FavoriteSummary[]>([]);
    const [loading, setLoading] = useState(true);
    const [color, setColor] = useState("#ffffff");

    useEffect(() => {
        setHasMounted(true);
        setColor(document.documentElement.classList.contains("dark") ? "#ffffff" : "#000000");
    }, []);

    useEffect(() => {
        // 서버는 localStorage(즐겨찾기)를 모르니 마운트 후에만 조회 (하이드레이션 불일치 방지)
        if (!hasMounted) return;

        if (favorites.length === 0) {
            setSummaries([]);
            setLoading(false);
            return;
        }

        let cancelled = false;
        setLoading(true);

        fetch("/api/favorites", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ names: favorites }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (!cancelled) setSummaries(data.results ?? []);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [hasMounted, favorites]);

    if (!hasMounted) return null;

    if (loading) {
        return (
            <div className="w-full flex justify-center py-[80px]">
                <DotLoader color={color} />
            </div>
        );
    }

    if (favorites.length === 0) {
        return (
            <div className="w-full py-[40px]">
                <NotInfoText center>즐겨찾기한 캐릭터가 없습니다. 캐릭터 페이지의 별 아이콘을 눌러 추가해보세요.</NotInfoText>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 pc:grid-cols-4 gap-[12px]">
            {summaries.map((summary) => (
                <FavoriteCard key={summary.name} summary={summary} onRemove={() => removeFavorite(summary.name)} />
            ))}
        </div>
    );
}
