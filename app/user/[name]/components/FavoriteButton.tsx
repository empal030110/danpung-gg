'use client';

import { useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useFavoriteStore } from "@/store/useFavoriteStore";

// UserHeader는 비동기 서버 컴포넌트, 별 버튼만 분리
export default function FavoriteButton({ characterName }: { characterName: string }) {
    const { favorites, toggleFavorite } = useFavoriteStore();
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    // 서버는 localStorage를 모르니 항상 false로 렌더링됨 -> 마운트 전엔 클라이언트도 false로 맞춰서 하이드레이션 불일치 방지
    const isFavorite = hasMounted && favorites.includes(characterName);

    return (
        <button
            type="button"
            onClick={() => toggleFavorite(characterName)}
            aria-label={isFavorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}
            aria-pressed={isFavorite}
            className="absolute top-[40px] right-[40px] text-yellow-400 cursor-pointer"
        >
            {isFavorite ? <FaStar size={24} /> : <FaRegStar size={24} />}
        </button>
    );
}
