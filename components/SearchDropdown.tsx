"use client";

import { FiX } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { DropdownTab } from "@/hooks/useSearchDropdown";

interface SearchDropdownProps {
    activeTab: DropdownTab;
    setActiveTab: (tab: DropdownTab) => void;
    recentSearches: string[];
    removeSearch: (name: string) => void;
    clearSearches: () => void;
    favorites: string[];
    removeFavorite: (name: string) => void;
    clearFavorites: () => void;
    onSelect: (name: string) => void;
    positionClassName?: string; // 검색바 wrapper의 padding에 맞춰 좌우 위치를 호출부에서 조정할 수 있게 함 (기본값은 padding 없는 wrapper 기준)
}

export default function SearchDropdown({
    activeTab,
    setActiveTab,
    recentSearches,
    removeSearch,
    clearSearches,
    favorites,
    removeFavorite,
    clearFavorites,
    onSelect,
    positionClassName = "left-0 right-0",
}: SearchDropdownProps) {
    const t = useTranslations("searchDropdown");
    // 바깥 행 안에 삭제용 <button>이 중첩돼 있어 행 자체를 <button>으로 만들 수 없음(버튼 중첩은 유효하지 않은 HTML) ->
    // role/tabIndex/onKeyDown으로 키보드 접근성을 직접 부여
    const handleRowKeyDown = (e: React.KeyboardEvent, name: string) => {
        if (e.target !== e.currentTarget) return; // 중첩된 삭제 버튼에서 올라온 keydown은 무시 (버블링돼서 행 선택까지 같이 발동하는 것 방지)
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect(name);
        }
    };

    return (
        <div
            onMouseDown={(e) => e.preventDefault()} // 내부 클릭이 input blur를 유발해 드롭다운이 닫히는 것을 방지
            className={`absolute top-full ${positionClassName} mt-[4px] bg-white dark:bg-[#171717] border border-black dark:border-white rounded-[12px] p-[12px] z-10`}
        >
            <div className="flex items-center justify-between mb-[8px]">
                <div className="flex gap-[12px]">
                    <button
                        type="button"
                        onClick={() => setActiveTab("recent")}
                        className={`text-[12px] cursor-pointer ${activeTab === "recent" ? "font-bold text-black dark:text-white" : "text-neutral-500 dark:text-neutral-400"}`}
                    >
                        {t("recentTab")}
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab("favorite")}
                        className={`text-[12px] cursor-pointer ${activeTab === "favorite" ? "font-bold text-black dark:text-white" : "text-neutral-500 dark:text-neutral-400"}`}
                    >
                        {t("favoriteTab")}
                    </button>
                </div>
                {activeTab === "recent" && recentSearches.length > 0 && (
                    <button
                        type="button"
                        onClick={clearSearches}
                        className="text-[12px] text-neutral-500 dark:text-neutral-400 cursor-pointer hover:underline"
                    >
                        {t("clearAll")}
                    </button>
                )}
                {activeTab === "favorite" && favorites.length > 0 && (
                    <button
                        type="button"
                        onClick={clearFavorites}
                        className="text-[12px] text-neutral-500 dark:text-neutral-400 cursor-pointer hover:underline"
                    >
                        {t("clearAll")}
                    </button>
                )}
            </div>
            {activeTab === "recent" ? (
                recentSearches.length > 0 ? (
                    <div className="flex flex-col gap-[2px]">
                        {recentSearches.map((name) => (
                            <div
                                key={name}
                                role="button"
                                tabIndex={0}
                                onClick={() => onSelect(name)}
                                onKeyDown={(e) => handleRowKeyDown(e, name)}
                                className="flex items-center justify-between gap-[8px] px-[8px] py-[6px] rounded-[8px] cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800"
                            >
                                <span className="text-[14px] text-black dark:text-white">{name}</span>
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation(); // 상위 항목의 재검색 클릭으로 전파되지 않도록 막음
                                        removeSearch(name);
                                    }}
                                    aria-label={t("removeRecent", { name })}
                                    className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 cursor-pointer"
                                >
                                    <FiX size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-[12px] text-neutral-400 py-[8px]">{t("recentEmpty")}</p>
                )
            ) : favorites.length > 0 ? (
                <div className="flex flex-col gap-[2px] max-h-[180px] overflow-y-auto scrollbar-hide">
                    {favorites.map((name) => (
                        <div
                            key={name}
                            role="button"
                            tabIndex={0}
                            onClick={() => onSelect(name)}
                            onKeyDown={(e) => handleRowKeyDown(e, name)}
                            className="flex items-center justify-between gap-[8px] px-[8px] py-[6px] rounded-[8px] cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800"
                        >
                            <span className="text-[14px] text-black dark:text-white">{name}</span>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation(); // 상위 항목의 재검색 클릭으로 전파되지 않도록 막음
                                    removeFavorite(name);
                                }}
                                aria-label={t("removeFavorite", { name })}
                                className="text-yellow-400 cursor-pointer"
                            >
                                <FaStar size={12} />
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-[12px] text-neutral-400 py-[8px]">{t("favoriteEmpty")}</p>
            )}
        </div>
    );
}
