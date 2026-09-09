// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import FavoriteButton from "./FavoriteButton";
import { useFavoriteStore } from "@/store/useFavoriteStore";

describe("FavoriteButton", () => {
    beforeEach(() => {
        useFavoriteStore.setState({ favorites: [] });
    });

    it("즐겨찾기가 아니면 마운트 후 aria-pressed가 false다", () => {
        render(<FavoriteButton characterName="오지환" />);

        expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false");
    });

    it("이미 즐겨찾기된 캐릭터면 마운트 후 aria-pressed가 true다", () => {
        useFavoriteStore.setState({ favorites: ["오지환"] });

        render(<FavoriteButton characterName="오지환" />);

        expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
    });

    it("클릭하면 즐겨찾기가 토글되고 스토어에도 반영된다", async () => {
        const user = userEvent.setup();
        render(<FavoriteButton characterName="오지환" />);

        await user.click(screen.getByRole("button"));

        expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
        expect(useFavoriteStore.getState().favorites).toEqual(["오지환"]);
    });

    it("다시 클릭하면 즐겨찾기가 해제된다", async () => {
        useFavoriteStore.setState({ favorites: ["오지환"] });
        const user = userEvent.setup();
        render(<FavoriteButton characterName="오지환" />);

        await user.click(screen.getByRole("button"));

        expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false");
        expect(useFavoriteStore.getState().favorites).toEqual([]);
    });
});
