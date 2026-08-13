import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface FavoriteState {
    favorites: string[];
    toggleFavorite: (name: string) => void;
    removeFavorite: (name: string) => void;
    clearFavorites: () => void;
}

export const useFavoriteStore = create<FavoriteState>()(
    persist(
        (set) => ({
            favorites: [],
            toggleFavorite: (name) =>
                set((state) => ({
                    // 이미 즐겨찾기면 해제, 아니면 맨 앞에 추가
                    favorites: state.favorites.includes(name)
                        ? state.favorites.filter((n) => n !== name)
                        : [name, ...state.favorites],
                })),
            removeFavorite: (name) =>
                set((state) => ({
                    favorites: state.favorites.filter((n) => n !== name),
                })),
            clearFavorites: () => set({ favorites: [] }),
        }),
        {
            name: 'favorites', // localStorage에 저장될 키 이름
            storage: createJSONStorage(() => localStorage), // 새로고침/재방문 시에도 유지되도록 영속화
        }
    )
);
