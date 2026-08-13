import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const MAX_RECENT_SEARCHES = 5;

interface RecentSearchState {
    recentSearches: string[];
    addSearch: (name: string) => void;
    removeSearch: (name: string) => void;
    clearSearches: () => void;
}

export const useRecentSearchStore = create<RecentSearchState>()(
    persist(
        (set) => ({
            recentSearches: [],
            addSearch: (name) =>
                set((state) => ({
                    // 기존에 있던 동일 검색어는 지우고 맨 앞으로 다시 넣어서 중복 없이 최신순 유지
                    recentSearches: [name, ...state.recentSearches.filter((n) => n !== name)].slice(0, MAX_RECENT_SEARCHES),
                })),
            removeSearch: (name) =>
                set((state) => ({
                    recentSearches: state.recentSearches.filter((n) => n !== name),
                })),
            clearSearches: () => set({ recentSearches: [] }),
        }),
        {
            name: 'searches', // localStorage에 저장될 키 이름
            storage: createJSONStorage(() => localStorage), // 새로고침/재방문 시에도 유지되도록 영속화
        }
    )
);
