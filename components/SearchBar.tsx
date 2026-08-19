'use client';

import { useState } from 'react';
import { FiX } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { useCharacterSearch } from '@/hooks/useCharacterSearch';
import { useRecentSearchStore } from '@/store/useRecentSearchStore';
import { useFavoriteStore } from '@/store/useFavoriteStore';
import SearchForm from './SearchForm';

type DropdownTab = 'recent' | 'favorite';

export default function SearchBar() {
	const { inputValue, setInputValue, goToUser, handleSubmit } = useCharacterSearch();
	const [showRecent, setShowRecent] = useState(false);
	const [activeTab, setActiveTab] = useState<DropdownTab>('recent');
	const { recentSearches, removeSearch, clearSearches } = useRecentSearchStore();
	const { favorites, removeFavorite, clearFavorites } = useFavoriteStore();

	return (
		<div className="w-full max-w-[550px] px-[20px] relative">
			<p className="text-center text-[14px] mb-[16px]">
				메이플스토리 캐릭터 정보 검색 서비스
			</p>
			<SearchForm
				inputValue={inputValue}
				onChange={setInputValue}
				onSubmit={handleSubmit}
				onFocus={() => setShowRecent(true)}
				onBlur={() => setShowRecent(false)}
			/>
			{showRecent && (recentSearches.length > 0 || favorites.length > 0) && (
				<div
					onMouseDown={(e) => e.preventDefault()} // 내부 클릭이 input blur를 유발해 드롭다운이 닫히는 것을 방지
					className="absolute top-full left-[20px] right-[20px] mt-[4px] bg-white dark:bg-[#171717] border border-black dark:border-white rounded-[12px] p-[12px] z-10"
				>
					<div className="flex items-center justify-between mb-[8px]">
						<div className="flex gap-[12px]">
							<button
								type="button"
								onClick={() => setActiveTab('recent')}
								className={`text-[12px] cursor-pointer ${activeTab === 'recent' ? 'font-bold text-black dark:text-white' : 'text-neutral-500 dark:text-neutral-400'}`}
							>
								최근 검색어
							</button>
							<button
								type="button"
								onClick={() => setActiveTab('favorite')}
								className={`text-[12px] cursor-pointer ${activeTab === 'favorite' ? 'font-bold text-black dark:text-white' : 'text-neutral-500 dark:text-neutral-400'}`}
							>
								즐겨찾기
							</button>
						</div>
						{activeTab === 'recent' && recentSearches.length > 0 && (
							<button type="button" onClick={clearSearches} className="text-[12px] text-neutral-500 dark:text-neutral-400 cursor-pointer hover:underline">
								전체삭제
							</button>
						)}
						{activeTab === 'favorite' && favorites.length > 0 && (
							<button type="button" onClick={clearFavorites} className="text-[12px] text-neutral-500 dark:text-neutral-400 cursor-pointer hover:underline">
								전체삭제
							</button>
						)}
					</div>
					{activeTab === 'recent' ? (
						recentSearches.length > 0 ? (
							<div className="flex flex-col gap-[2px]">
								{recentSearches.map((name) => (
									<div key={name} onClick={() => goToUser(name)} className="flex items-center justify-between gap-[8px] px-[8px] py-[6px] rounded-[8px] cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800">
										<span className="text-[14px] text-black dark:text-white">{name}</span>
										<button
											type="button"
											onClick={(e) => {
												e.stopPropagation(); // 상위 항목의 재검색 클릭으로 전파되지 않도록 막음
												removeSearch(name);
											}}
											className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 cursor-pointer"
										>
											<FiX size={14} />
										</button>
									</div>
								))}
							</div>
						) : (
							<p className="text-[12px] text-neutral-400 py-[8px]">최근 검색어가 없습니다.</p>
						)
					) : (
						favorites.length > 0 ? (
							<div className="flex flex-col gap-[2px] max-h-[180px] overflow-y-auto scrollbar-hide">
								{favorites.map((name) => (
									<div key={name} onClick={() => goToUser(name)} className="flex items-center justify-between gap-[8px] px-[8px] py-[6px] rounded-[8px] cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800">
										<span className="text-[14px] text-black dark:text-white">{name}</span>
										<button
											type="button"
											onClick={(e) => {
												e.stopPropagation(); // 상위 항목의 재검색 클릭으로 전파되지 않도록 막음
												removeFavorite(name);
											}}
											className="text-yellow-400 cursor-pointer"
										>
											<FaStar size={12} />
										</button>
									</div>
								))}
							</div>
						) : (
							<p className="text-[12px] text-neutral-400 py-[8px]">즐겨찾기가 없습니다.</p>
						)
					)}
				</div>
			)}
		</div>
	);
}
