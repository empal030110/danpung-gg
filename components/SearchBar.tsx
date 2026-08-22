'use client';

import { useCharacterSearch } from '@/hooks/useCharacterSearch';
import { useSearchDropdown } from '@/hooks/useSearchDropdown';
import SearchForm from './SearchForm';
import SearchDropdown from './SearchDropdown';

export default function SearchBar() {
	const { inputValue, setInputValue, goToUser, handleSubmit } = useCharacterSearch();
	const {
		showDropdown, openDropdown, closeDropdown,
		activeTab, setActiveTab,
		recentSearches, removeSearch, clearSearches,
		favorites, removeFavorite, clearFavorites,
	} = useSearchDropdown();

	return (
		<div className="w-full max-w-[550px] px-[20px] relative">
			<p className="text-center text-[14px] mb-[16px]">
				메이플스토리 캐릭터 정보 검색 서비스
			</p>
			<SearchForm
				inputValue={inputValue}
				onChange={setInputValue}
				onSubmit={(e) => {
					handleSubmit(e);
					closeDropdown();
					(document.activeElement as HTMLElement)?.blur();
				}}
				onFocus={openDropdown}
				onBlur={closeDropdown}
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
