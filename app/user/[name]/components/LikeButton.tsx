"use client";

import { useEffect, useState, useTransition } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useTranslations } from "next-intl";

type LikeState = { liked: boolean; count: number };

export default function LikeButton({ characterName }: { characterName: string }) {
    const t = useTranslations("likeButton");
    const [state, setState] = useState<LikeState | null>(null);
    const [isPending, startTransition] = useTransition();

    // SSR에서 DB를 조회하면 봇 트래픽만으로도 DB가 계속 깨어 있어서, JS를 실행하는 클라이언트에서만 조회
    useEffect(() => {
        let cancelled = false;

        fetch(`/api/likes/${encodeURIComponent(characterName)}`)
            .then((res) => (res.ok ? res.json() : Promise.reject(new Error("좋아요 상태 조회 실패"))))
            .then((data: LikeState) => {
                if (!cancelled) setState(data);
            })
            .catch(() => {}); // 실패하면 state가 null로 남아 버튼이 비활성 상태로 유지됨

        return () => {
            cancelled = true;
        };
    }, [characterName]);

    const handleClick = () => {
        if (!state) return;
        const prev = state;
        setState({ liked: !prev.liked, count: prev.liked ? prev.count - 1 : prev.count + 1 });

        startTransition(async () => {
            try {
                const res = await fetch(`/api/likes/${encodeURIComponent(characterName)}`, { method: "POST" });
                if (!res.ok) throw new Error("좋아요 요청 실패");
                setState(await res.json());
            } catch {
                // 실패 시 낙관적 업데이트를 되돌림
                setState(prev);
            }
        });
    };

    const liked = state?.liked ?? false;

    return (
        <button
            type="button"
            onClick={handleClick}
            disabled={!state || isPending}
            aria-label={liked ? t("remove") : t("add")}
            aria-pressed={liked}
            className="absolute top-[80px] right-[40px] flex flex-col justify-center items-center text-red-400 cursor-pointer disabled:opacity-50"
        >
            {liked ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
            <span className={`text-[12px] font-bold ${state ? "" : "invisible"}`}>{state?.count ?? 0}</span>
        </button>
    );
}
