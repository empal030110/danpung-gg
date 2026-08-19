'use client';

import { usePathname } from "next/navigation";
import { useCharacterSearch } from "@/hooks/useCharacterSearch";
import SearchForm from "../SearchForm";

export default function HeaderSearchBar() {
    const pathname = usePathname();
    const { inputValue, setInputValue, handleSubmit } = useCharacterSearch();

    if (pathname === '/') return null; // 메인 페이지엔 이미 큰 검색바가 있어서 헤더에는 안 보이게 함

    return (
        <SearchForm
            inputValue={inputValue}
            onChange={setInputValue}
            onSubmit={handleSubmit}
        />
    );
}
