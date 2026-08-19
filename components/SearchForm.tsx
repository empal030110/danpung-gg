'use client';

import { FiSearch } from "react-icons/fi";

interface SearchFormProps {
    inputValue: string;
    onChange: (value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    onFocus?: () => void;
    onBlur?: () => void;
}

export default function SearchForm({ inputValue, onChange, onSubmit, onFocus, onBlur}: SearchFormProps) {
    return (
        <form onSubmit={onSubmit} className={'relative z-10 flex items-center w-full pc:max-w-[540px]'}>
            <input
                type="text"
                placeholder= "캐릭터 이름을 입력하세요"
                value={inputValue}
                onChange={(e) => onChange(e.target.value)}
                onFocus={onFocus}
                onBlur={onBlur}
                className="w-full h-full max-h-[47px] border py-[12px] px-[16px] rounded-[12px] bg-[#fff] text-black dark:bg-[#171717] dark:text-white"
            />
            <button type="submit" className="absolute right-[16px] text-neutral-500 dark:text-neutral-400 cursor-pointer">
                <FiSearch size={16} />
            </button>
        </form>
    );
}
