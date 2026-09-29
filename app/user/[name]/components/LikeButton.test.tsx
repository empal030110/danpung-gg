// @vitest-environment jsdom
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { renderWithIntl } from "@/test/renderWithIntl";
import LikeButton from "./LikeButton";

describe("LikeButton", () => {
    beforeEach(() => {
        vi.stubGlobal("fetch", vi.fn());
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it("초기 상태를 props대로 보여준다", () => {
        renderWithIntl(<LikeButton characterName="오지환" initialLiked={false} initialCount={5} />);

        expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false");
        expect(screen.getByText("5")).toBeInTheDocument();
    });

    it("클릭하면 낙관적으로 즉시 반영되고, 서버 응답으로 확정된다", async () => {
        vi.mocked(fetch).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ liked: true, count: 6 }),
        } as Response);
        const user = userEvent.setup();
        renderWithIntl(<LikeButton characterName="오지환" initialLiked={false} initialCount={5} />);

        await user.click(screen.getByRole("button"));

        expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
        expect(screen.getByText("6")).toBeInTheDocument();
        await waitFor(() => expect(fetch).toHaveBeenCalledWith("/api/likes/%EC%98%A4%EC%A7%80%ED%99%98", { method: "POST" }));
    });

    it("요청이 실패하면 원래 상태로 되돌린다", async () => {
        vi.mocked(fetch).mockResolvedValueOnce({ ok: false } as Response);
        const user = userEvent.setup();
        renderWithIntl(<LikeButton characterName="오지환" initialLiked={false} initialCount={5} />);

        await user.click(screen.getByRole("button"));

        await waitFor(() => expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false"));
        expect(screen.getByText("5")).toBeInTheDocument();
    });
});
