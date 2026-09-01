import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { FavoriteSummary } from "@/app/api/favorites/route";

export default function FavoriteCard({ summary, onRemove }: { summary: FavoriteSummary; onRemove: () => void }) {
    return (
        <div className="relative flex flex-col items-center border border-neutral-300 dark:border-neutral-700 rounded-[16px] overflow-hidden">
            <button
                type="button"
                onClick={onRemove}
                aria-label={`${summary.name} 즐겨찾기 해제`}
                className="absolute top-[8px] right-[8px] text-yellow-400 cursor-pointer z-10"
            >
                <FaStar size={16} />
            </button>
            {summary.ok ? (
                <Link href={`/user/${encodeURIComponent(summary.name)}`} className="w-full flex flex-col items-center hover:bg-gray-100 dark:hover:bg-neutral-800">
                    <div className="w-[96px] h-[96px] overflow-hidden flex items-center justify-center mt-[16px]">
                        <Image src={summary.image ?? ""} alt={summary.name} width={96} height={96} className="scale-[2]" unoptimized />
                    </div>
                    <p className="mt-[8px] font-bold truncate max-w-full px-[12px]">{summary.name}</p>
                    <p className="text-[12px] text-neutral-500 dark:text-neutral-400 truncate max-w-full px-[12px]">{summary.worldName} · {summary.className}</p>
                    <div className="w-full flex justify-center gap-[24px] py-[12px] text-[12px] text-center border-t border-neutral-300 dark:border-neutral-700 mt-[12px]">
                        <div>
                            <p className="text-neutral-500 dark:text-neutral-400">레벨</p>
                            <p className="font-bold">{summary.level}</p>
                        </div>
                        <div>
                            <p className="text-neutral-500 dark:text-neutral-400">전투력</p>
                            <p className="font-bold">{summary.combatPower ?? "-"}</p>
                        </div>
                    </div>
                </Link>
            ) : (
                <div className="w-full flex flex-col items-center justify-center py-[40px] px-[12px] text-center">
                    <p className="font-bold truncate max-w-full">{summary.name}</p>
                    <p className="text-[12px] text-neutral-400 mt-[8px]">정보를 불러올 수 없습니다.</p>
                </div>
            )}
        </div>
    );
}
