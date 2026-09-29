"use client";

import { useState, useTransition } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useTranslations } from "next-intl";

export default function LikeButton({
    characterName,
    initialLiked,
    initialCount,
}: {
    characterName: string;
    initialLiked: boolean;
    initialCount: number;
}) {
    const t = useTranslations("likeButton");
    const [liked, setLiked] = useState(initialLiked);
    const [count, setCount] = useState(initialCount);
    const [isPending, startTransition] = useTransition();

    const handleClick = () => {
        const prevLiked = liked;
        const prevCount = count;
        setLiked(!prevLiked);
        setCount(prevLiked ? prevCount - 1 : prevCount + 1);

        startTransition(async () => {
            try {
                const res = await fetch(`/api/likes/${encodeURIComponent(characterName)}`, { method: "POST" });
                if (!res.ok) throw new Error("좋아요 요청 실패");
                const data: { liked: boolean; count: number } = await res.json();
                setLiked(data.liked);
                setCount(data.count);
            } catch {
                // 실패 시 낙관적 업데이트를 되돌림
                setLiked(prevLiked);
                setCount(prevCount);
            }
        });
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            disabled={isPending}
            aria-label={liked ? t("remove") : t("add")}
            aria-pressed={liked}
            className="absolute top-[80px] right-[40px] flex flex-col justify-center items-center text-red-400 cursor-pointer disabled:opacity-50"
        >
            {liked ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
            <span className="text-[12px] font-bold">{count}</span>
        </button>
    );
}
