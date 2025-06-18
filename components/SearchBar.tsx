'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiSearch } from "react-icons/fi";

export default function SearchBar() {
	const router = useRouter();
	const [inputValue, setInputValue] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const trimmed = inputValue.replace(/\s+/g, '');
		if (!trimmed) {
		  alert('캐릭터 이름을 입력하세요.');
		  return;
		}

		router.push(`/user/${encodeURIComponent(trimmed)}`);
	};

	return (
		<div className="w-full max-w-[550px] px-[20px] ">
			<p className="text-center text-[14px] mb-[16px]">
				메이플스토리 캐릭터 정보 검색 서비스
			</p>
			<form onSubmit={handleSubmit} className="relative flex items-center w-full">
				<input type="text" placeholder="캐릭터 이름을 입력하세요" value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="w-full border py-[12px] px-[16px] rounded-[12px] bg-[#fff] text-black dark:bg-[#171717] dark:text-white" />
				<button type="submit" className="absolute right-[16px] text-neutral-500 dark:text-neutral-400 cursor-pointer">
					<FiSearch size={16} />
				</button>
			</form>
		</div>
	);
}
