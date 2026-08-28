'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiSearch } from 'react-icons/fi';
import { IoIosArrowDown } from 'react-icons/io';

const WORLD_LIST = ['스카니아', '베라', '루나', '제니스', '크로아', '유니온', '엘리시움', '이노시스', '레드', '오로라', '아케인', '노바', '에오스', '헬리오스', '챌린저스', '챌린저스2', '챌린저스3', '챌린저스4'];

export default function GuildSearchBar() {
    const router = useRouter();
    const [world, setWorld] = useState(WORLD_LIST[0]);
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const trimmed = inputValue.replace(/\s+/g, '');
        if (!trimmed) {
            alert('길드 이름을 입력하세요.');
            return;
        }

        router.push(`/guild/${encodeURIComponent(world)}/${encodeURIComponent(trimmed)}`);
    };

    return (
        <div className="w-full max-w-[550px] px-[20px]">
            <form onSubmit={handleSubmit} className="flex items-center w-full gap-[8px]">
                <div className="relative flex items-center">
                    <select
                        value={world}
                        onChange={(e) => setWorld(e.target.value)}
                        className="h-full max-h-[47px] border py-[12px] pl-[12px] pr-[28px] rounded-[12px] bg-[#fff] text-black dark:bg-[#171717] dark:text-white appearance-none"
                    >
                        {WORLD_LIST.map((worldName) => (
                            <option key={worldName} value={worldName}>{worldName}</option>
                        ))}
                    </select>
                    <IoIosArrowDown className="absolute right-[10px] pointer-events-none text-neutral-500 dark:text-neutral-400" size={14} />
                </div>
                <div className="relative flex items-center flex-1">
                    <input
                        type="text"
                        placeholder="길드 이름을 입력하세요"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="w-full h-full max-h-[47px] border py-[12px] px-[16px] rounded-[12px] bg-[#fff] text-black dark:bg-[#171717] dark:text-white"
                    />
                    <button type="submit" className="absolute right-[16px] text-neutral-500 dark:text-neutral-400 cursor-pointer">
                        <FiSearch size={16} />
                    </button>
                </div>
            </form>
        </div>
    );
}
