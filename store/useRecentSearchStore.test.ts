import { beforeEach, describe, expect, it } from "vitest";
import { useRecentSearchStore } from "./useRecentSearchStore";

describe("useRecentSearchStore", () => {
    beforeEach(() => {
        useRecentSearchStore.setState({ recentSearches: [] });
    });

    it("초기 상태는 빈 배열이다", () => {
        expect(useRecentSearchStore.getState().recentSearches).toEqual([]);
    });

    it("addSearch: 새 검색어를 맨 앞에 추가한다", () => {
        useRecentSearchStore.getState().addSearch("드표디");

        expect(useRecentSearchStore.getState().recentSearches).toEqual(["드표디"]);
    });

    it("addSearch: 이미 있는 검색어를 다시 검색하면 중복 없이 맨 앞으로 재배치한다", () => {
        useRecentSearchStore.setState({ recentSearches: ["C", "B", "A"] });

        useRecentSearchStore.getState().addSearch("A");

        expect(useRecentSearchStore.getState().recentSearches).toEqual(["A", "C", "B"]);
    });

    it("addSearch: 최근 검색어는 최대 5개까지만 유지하고 오래된 것부터 잘라낸다", () => {
        useRecentSearchStore.setState({ recentSearches: ["5", "4", "3", "2", "1"] });

        useRecentSearchStore.getState().addSearch("새검색");

        expect(useRecentSearchStore.getState().recentSearches).toEqual(["새검색", "5", "4", "3", "2"]);
    });

    it("removeSearch: 지정한 검색어만 제거하고 나머지는 유지한다", () => {
        useRecentSearchStore.setState({ recentSearches: ["C", "B", "A"] });

        useRecentSearchStore.getState().removeSearch("B");

        expect(useRecentSearchStore.getState().recentSearches).toEqual(["C", "A"]);
    });

    it("clearSearches: 전체를 비운다", () => {
        useRecentSearchStore.setState({ recentSearches: ["A", "B"] });

        useRecentSearchStore.getState().clearSearches();

        expect(useRecentSearchStore.getState().recentSearches).toEqual([]);
    });
});
