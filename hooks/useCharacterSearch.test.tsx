// @vitest-environment jsdom
import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useCharacterSearch } from "./useCharacterSearch";
import { useRecentSearchStore } from "@/store/useRecentSearchStore";

const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
    useRouter: () => ({ push: mockPush }),
}));

describe("useCharacterSearch", () => {
    beforeEach(() => {
        mockPush.mockClear();
        useRecentSearchStore.setState({ recentSearches: [] });
        vi.spyOn(window, "alert").mockImplementation(() => {});
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("setInputValue로 입력값을 갱신한다", () => {
        const { result } = renderHook(() => useCharacterSearch());

        act(() => result.current.setInputValue("드표디"));

        expect(result.current.inputValue).toBe("드표디");
    });

    it("handleSubmit: 공백만 입력하면 이동하지 않고 alert를 띄운다", () => {
        const { result } = renderHook(() => useCharacterSearch());
        act(() => result.current.setInputValue("   "));

        act(() => result.current.handleSubmit({ preventDefault: vi.fn() } as unknown as React.FormEvent));

        expect(window.alert).toHaveBeenCalledWith("캐릭터 이름을 입력하세요.");
        expect(mockPush).not.toHaveBeenCalled();
    });

    it("handleSubmit: 유효한 이름이면 최근 검색에 기록하고 유저 페이지로 이동한 뒤 입력값을 비운다", () => {
        const { result } = renderHook(() => useCharacterSearch());
        act(() => result.current.setInputValue("드표디"));

        act(() => result.current.handleSubmit({ preventDefault: vi.fn() } as unknown as React.FormEvent));

        expect(mockPush).toHaveBeenCalledWith("/user/%EB%93%9C%ED%91%9C%EB%94%94");
        expect(useRecentSearchStore.getState().recentSearches).toEqual(["드표디"]);
        expect(result.current.inputValue).toBe("");
    });

    it("handleSubmit: 이름 중간의 공백은 제거하고 이동한다", () => {
        const { result } = renderHook(() => useCharacterSearch());
        act(() => result.current.setInputValue("드 표 디"));

        act(() => result.current.handleSubmit({ preventDefault: vi.fn() } as unknown as React.FormEvent));

        expect(useRecentSearchStore.getState().recentSearches).toEqual(["드표디"]);
    });

    it("goToUser: 직접 호출해도 최근 검색 기록과 페이지 이동이 동일하게 일어난다", () => {
        const { result } = renderHook(() => useCharacterSearch());

        act(() => result.current.goToUser("오지환"));

        expect(mockPush).toHaveBeenCalledWith("/user/%EC%98%A4%EC%A7%80%ED%99%98");
        expect(useRecentSearchStore.getState().recentSearches).toEqual(["오지환"]);
    });
});
