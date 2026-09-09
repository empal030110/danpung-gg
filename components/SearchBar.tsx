"use client";

import { useCharacterSearch } from "@/hooks/useCharacterSearch";
import { useSearchDropdown } from "@/hooks/useSearchDropdown";
import SearchForm from "./SearchForm";
import SearchDropdown from "./SearchDropdown";

export default function SearchBar() {
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

    return (
        <div
            className="w-full max-w-[550px] px-[20px] relative"
            // 포커스가 검색창 밖으로 완전히 나갈 때만 닫는다 (Tab으로 드롭다운 안쪽 버튼으로 이동하는 것까지 막지 않도록)
            onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                    closeDropdown();
                }
            }}
        >
            <h1 className="text-center text-[14px] mb-[16px] font-normal">메이플스토리 캐릭터 정보 검색 서비스</h1>
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
                        (document.activeElement as HTMLElement)?.blur(); // 드롭다운 클릭은 blur를 막고 있어서 포커스 해제
                    }}
                    positionClassName="left-[20px] right-[20px]"
                />
            )}
        </div>
    );
}
