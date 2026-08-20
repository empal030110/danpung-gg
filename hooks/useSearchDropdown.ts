'use client';

import { useState } from 'react';
import { useRecentSearchStore } from '@/store/useRecentSearchStore';
import { useFavoriteStore } from '@/store/useFavoriteStore';

export type DropdownTab = 'recent' | 'favorite';

export function useSearchDropdown() {
    const [showDropdown, setShowDropdown] = useState(false);
    const [activeTab, setActiveTab] = useState<DropdownTab>('recent');
    const { recentSearches, removeSearch, clearSearches } = useRecentSearchStore();
    const { favorites, removeFavorite, clearFavorites } = useFavoriteStore();

    return {
        showDropdown: showDropdown && (recentSearches.length > 0 || favorites.length > 0), // 포커스는 됐어도 보여줄 항목이 없으면 드롭다운을 띄우지 않음
        openDropdown: () => setShowDropdown(true),
        closeDropdown: () => setShowDropdown(false),
        activeTab,
        setActiveTab,
        recentSearches,
        removeSearch,
        clearSearches,
        favorites,
        removeFavorite,
        clearFavorites,
    };
}
