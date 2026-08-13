'use client';

import { FaRegStar, FaStar } from "react-icons/fa";
import { useFavoriteStore } from "@/store/useFavoriteStore";

// UserHeader는 비동기 서버 컴포넌트, 별 버튼만 분리
export default function FavoriteButton({ characterName }: { characterName: string }) {
    const { favorites, toggleFavorite } = useFavoriteStore();
    const isFavorite = favorites.includes(characterName);

    return (
        <button
            type="button"
            onClick={() => toggleFavorite(characterName)}
            className="absolute top-[40px] right-[40px] text-yellow-400 cursor-pointer"
        >
            {isFavorite ? <FaStar size={24} /> : <FaRegStar size={24} />}
        </button>
    );
}
