'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiSearch, FiX } from "react-icons/fi";
import { useRecentSearchStore } from '@/store/useRecentSearchStore';

export default function SearchBar() {
	const router = useRouter();
	const [inputValue, setInputValue] = useState('');
	const [showRecent, setShowRecent] = useState(false);
	const { recentSearches, addSearch, removeSearch, clearSearches } = useRecentSearchStore();

	const goToUser = (name: string) => {
		addSearch(name); // 최근 검색어 클릭 재검색 시에도 최신순으로 다시 올라가도록 매번 기록
		router.push(`/user/${encodeURIComponent(name)}`);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const trimmed = inputValue.replace(/\s+/g, '');
		if (!trimmed) {
		  alert('캐릭터 이름을 입력하세요.');
		  return;
		}

		goToUser(trimmed);
	};

	return (
		<div className="w-full max-w-[550px] px-[20px] relative">
			<p className="text-center text-[14px] mb-[16px]">
				메이플스토리 캐릭터 정보 검색 서비스
			</p>
			<form onSubmit={handleSubmit} className="relative flex items-center w-full">
				<input
					type="text"
					placeholder="캐릭터 이름을 입력하세요"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					onFocus={() => setShowRecent(true)}
					onBlur={() => setTimeout(() => setShowRecent(false), 150)} // 약간 지연 후 닫음
					className="w-full border py-[12px] px-[16px] rounded-[12px] bg-[#fff] text-black dark:bg-[#171717] dark:text-white"
				/>
				<button type="submit" className="absolute right-[16px] text-neutral-500 dark:text-neutral-400 cursor-pointer">
					<FiSearch size={16} />
				</button>
			</form>
			{showRecent && recentSearches.length > 0 && (
				<div className="absolute top-full left-[20px] right-[20px] mt-[4px] bg-white dark:bg-[#171717] border rounded-[12px] p-[12px] z-10 border-[1px] border-black dark:border-white">
					<div className="flex items-center justify-between mb-[8px]">
						<p className="text-[12px] text-neutral-500 dark:text-neutral-400">최근 검색어</p>
						<button type="button" onClick={clearSearches} className="text-[12px] text-neutral-500 dark:text-neutral-400 cursor-pointer hover:underline">
							전체삭제
						</button>
					</div>
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
				</div>
			)}
		</div>
	);
}
