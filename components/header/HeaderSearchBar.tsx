"use client";

import { usePathname } from "next/navigation";
import { useCharacterSearch } from "@/hooks/useCharacterSearch";
import { useSearchDropdown } from "@/hooks/useSearchDropdown";
import SearchForm from "../SearchForm";
import SearchDropdown from "../SearchDropdown";

export default function HeaderSearchBar() {
    const pathname = usePathname();
    const { inputValue, setInputValue, goToUser, handleSubmit } = useCharacterSearch();
    const {
        showDropdown,
        openDropdown,
        closeDropdown,
        activeTab,
        setActiveTab,
        recentSearches,
        removeSearch,
        clearSearches,
        favorites,
        removeFavorite,
        clearFavorites,
    } = useSearchDropdown();

    if (pathname === "/") return null; // 메인 페이지엔 이미 큰 검색바가 있어서 헤더에는 안 보이게 함

    return (
        <div
            className="w-full relative"
            // 포커스가 검색창 밖으로 완전히 나갈 때만 닫는다 (Tab으로 드롭다운 안쪽 버튼으로 이동하는 것까지 막지 않도록)
            onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                    closeDropdown();
                }
            }}
        >
            <SearchForm
                inputValue={inputValue}
                onChange={setInputValue}
                onSubmit={(e) => {
                    handleSubmit(e);
                    closeDropdown();
                    (document.activeElement as HTMLElement)?.blur();
                }}
                onFocus={openDropdown}
            />
            {showDropdown && (
                <SearchDropdown
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    recentSearches={recentSearches}
                    removeSearch={removeSearch}
                    clearSearches={clearSearches}
                    favorites={favorites}
                    removeFavorite={removeFavorite}
                    clearFavorites={clearFavorites}
                    onSelect={(name) => {
                        goToUser(name);
                        closeDropdown();
                        (document.activeElement as HTMLElement)?.blur(); // 드롭다운 클릭은 blur를 막고 있어서 직접 포커스를 해제
                    }}
                />
            )}
        </div>
    );
}
