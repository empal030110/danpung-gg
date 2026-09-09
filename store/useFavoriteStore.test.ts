import { beforeEach, describe, expect, it } from "vitest";
import { useFavoriteStore } from "./useFavoriteStore";

describe("useFavoriteStore", () => {
    beforeEach(() => {
        useFavoriteStore.setState({ favorites: [] });
    });

    it("초기 상태는 빈 배열이다", () => {
        expect(useFavoriteStore.getState().favorites).toEqual([]);
    });

    it("toggleFavorite: 즐겨찾기에 없으면 맨 앞에 추가한다", () => {
        useFavoriteStore.getState().toggleFavorite("드표디");

        expect(useFavoriteStore.getState().favorites).toEqual(["드표디"]);
    });

    it("toggleFavorite: 이미 즐겨찾기면 제거한다 (토글 해제)", () => {
        useFavoriteStore.setState({ favorites: ["드표디"] });

        useFavoriteStore.getState().toggleFavorite("드표디");

        expect(useFavoriteStore.getState().favorites).toEqual([]);
    });

    it("toggleFavorite로 여러 번 추가하면 가장 최근에 추가한 게 맨 앞에 온다", () => {
        useFavoriteStore.getState().toggleFavorite("A");
        useFavoriteStore.getState().toggleFavorite("B");
        useFavoriteStore.getState().toggleFavorite("C");

        expect(useFavoriteStore.getState().favorites).toEqual(["C", "B", "A"]);
    });

    it("removeFavorite: 지정한 이름만 제거하고 나머지는 유지한다", () => {
        useFavoriteStore.setState({ favorites: ["C", "B", "A"] });

        useFavoriteStore.getState().removeFavorite("B");

        expect(useFavoriteStore.getState().favorites).toEqual(["C", "A"]);
    });

    it("clearFavorites: 전체를 비운다", () => {
        useFavoriteStore.setState({ favorites: ["A", "B"] });

        useFavoriteStore.getState().clearFavorites();

        expect(useFavoriteStore.getState().favorites).toEqual([]);
    });
});
