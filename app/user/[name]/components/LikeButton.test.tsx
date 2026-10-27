// @vitest-environment jsdom
import { act, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { renderWithIntl } from "@/test/renderWithIntl";
import LikeButton from "./LikeButton";

const URL = "/api/likes/%EC%98%A4%EC%A7%80%ED%99%98";
const okResponse = (data: unknown) => ({ ok: true, json: async () => data }) as Response;

describe("LikeButton", () => {
    beforeEach(() => {
        vi.stubGlobal("fetch", vi.fn());
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it("로드 전에는 비활성이고, 마운트 후 GET 응답으로 상태가 채워진다", async () => {
        vi.mocked(fetch).mockResolvedValueOnce(okResponse({ liked: false, count: 5 }));
        renderWithIntl(<LikeButton characterName="오지환" />);

        expect(screen.getByRole("button")).toBeDisabled();
        await waitFor(() => expect(screen.getByRole("button")).toBeEnabled());

        expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false");
        expect(screen.getByText("5")).toBeInTheDocument();
        expect(fetch).toHaveBeenCalledWith(URL);
    });

    it("이미 좋아요한 상태면 aria-pressed가 true다", async () => {
        vi.mocked(fetch).mockResolvedValueOnce(okResponse({ liked: true, count: 3 }));
        renderWithIntl(<LikeButton characterName="오지환" />);

        await waitFor(() => expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true"));
    });

    it("GET이 실패하면 버튼이 비활성으로 남는다", async () => {
        vi.mocked(fetch).mockResolvedValueOnce({ ok: false } as Response);
        renderWithIntl(<LikeButton characterName="오지환" />);

        await waitFor(() => expect(fetch).toHaveBeenCalled());
        await act(async () => {}); // 실패 처리(catch)까지 마이크로태스크를 모두 비움

        expect(screen.getByRole("button")).toBeDisabled();
    });

    it("클릭하면 낙관적으로 즉시 반영되고, 서버 응답으로 확정된다", async () => {
        vi.mocked(fetch)
            .mockResolvedValueOnce(okResponse({ liked: false, count: 5 }))
            .mockResolvedValueOnce(okResponse({ liked: true, count: 6 }));
        const user = userEvent.setup();
        renderWithIntl(<LikeButton characterName="오지환" />);
        await waitFor(() => expect(screen.getByRole("button")).toBeEnabled());

        await user.click(screen.getByRole("button"));

        expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
        expect(screen.getByText("6")).toBeInTheDocument();
        await waitFor(() => expect(fetch).toHaveBeenLastCalledWith(URL, { method: "POST" }));
    });

    it("POST가 실패하면 원래 상태로 되돌린다", async () => {
        vi.mocked(fetch)
            .mockResolvedValueOnce(okResponse({ liked: false, count: 5 }))
            .mockResolvedValueOnce({ ok: false } as Response);
        const user = userEvent.setup();
        renderWithIntl(<LikeButton characterName="오지환" />);
        await waitFor(() => expect(screen.getByRole("button")).toBeEnabled());

        await user.click(screen.getByRole("button"));

        await waitFor(() => expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false"));
        expect(screen.getByText("5")).toBeInTheDocument();
    });
});
