'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRecentSearchStore } from '@/store/useRecentSearchStore';

export function useCharacterSearch() {
    const router = useRouter();
    const [inputValue, setInputValue] = useState('');
    const { addSearch } = useRecentSearchStore();

    const goToUser = (name: string) => {
        addSearch(name); // 재검색 시에도 최신순으로 다시 올라가도록 매번 기록
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
        setInputValue('');
    };

    return { inputValue, setInputValue, goToUser, handleSubmit };
}
