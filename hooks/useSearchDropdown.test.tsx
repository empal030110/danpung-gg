// @vitest-environment jsdom
import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useSearchDropdown } from "./useSearchDropdown";
import { useRecentSearchStore } from "@/store/useRecentSearchStore";
import { useFavoriteStore } from "@/store/useFavoriteStore";

describe("useSearchDropdown", () => {
    beforeEach(() => {
        useRecentSearchStore.setState({ recentSearches: [] });
        useFavoriteStore.setState({ favorites: [] });
    });

    it("초기 상태는 드롭다운이 닫혀있다", () => {
        const { result } = renderHook(() => useSearchDropdown());

        expect(result.current.showDropdown).toBe(false);
    });

    it("최근 검색어/즐겨찾기가 둘 다 없으면 openDropdown을 호출해도 드롭다운을 보여주지 않는다", () => {
        const { result } = renderHook(() => useSearchDropdown());

        act(() => result.current.openDropdown());

        expect(result.current.showDropdown).toBe(false);
    });

    it("최근 검색어가 있으면 openDropdown 호출 시 드롭다운을 보여준다", () => {
        useRecentSearchStore.setState({ recentSearches: ["드표디"] });
        const { result } = renderHook(() => useSearchDropdown());

        act(() => result.current.openDropdown());

        expect(result.current.showDropdown).toBe(true);
    });

    it("즐겨찾기만 있어도 openDropdown 호출 시 드롭다운을 보여준다", () => {
        useFavoriteStore.setState({ favorites: ["오지환"] });
        const { result } = renderHook(() => useSearchDropdown());

        act(() => result.current.openDropdown());

        expect(result.current.showDropdown).toBe(true);
    });

    it("closeDropdown을 호출하면 다시 닫힌다", () => {
        useRecentSearchStore.setState({ recentSearches: ["드표디"] });
        const { result } = renderHook(() => useSearchDropdown());
        act(() => result.current.openDropdown());

        act(() => result.current.closeDropdown());

        expect(result.current.showDropdown).toBe(false);
    });

    it("setActiveTab으로 탭을 전환할 수 있다", () => {
        const { result } = renderHook(() => useSearchDropdown());

        act(() => result.current.setActiveTab("favorite"));

        expect(result.current.activeTab).toBe("favorite");
    });

    it("removeSearch/removeFavorite/clearSearches/clearFavorites가 실제 스토어에 반영된다", () => {
        useRecentSearchStore.setState({ recentSearches: ["A", "B"] });
        useFavoriteStore.setState({ favorites: ["X", "Y"] });
        const { result } = renderHook(() => useSearchDropdown());

        act(() => result.current.removeSearch("A"));
        act(() => result.current.removeFavorite("X"));

        expect(result.current.recentSearches).toEqual(["B"]);
        expect(result.current.favorites).toEqual(["Y"]);

        act(() => result.current.clearSearches());
        act(() => result.current.clearFavorites());

        expect(result.current.recentSearches).toEqual([]);
        expect(result.current.favorites).toEqual([]);
    });
});
