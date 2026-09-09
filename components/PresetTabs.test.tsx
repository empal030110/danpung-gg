// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import PresetTabs from "./PresetTabs";

describe("PresetTabs", () => {
    it("기본값(count=3)이면 버튼 3개를 렌더링한다", () => {
        render(<PresetTabs active={1} onSelect={() => {}} />);

        expect(screen.getAllByRole("button")).toHaveLength(3);
    });

    it("count를 지정하면 그 개수만큼 버튼을 렌더링한다", () => {
        render(<PresetTabs count={5} active={1} onSelect={() => {}} />);

        expect(screen.getAllByRole("button")).toHaveLength(5);
    });

    it("labelPrefix가 버튼 텍스트 앞에 붙는다", () => {
        render(<PresetTabs active={1} onSelect={() => {}} labelPrefix="프리셋 " />);

        expect(screen.getByText("프리셋 1")).toBeInTheDocument();
        expect(screen.getByText("프리셋 2")).toBeInTheDocument();
    });

    it("active에 해당하는 버튼만 강조 클래스를 갖는다", () => {
        render(<PresetTabs active={2} onSelect={() => {}} />);

        expect(screen.getByText("1").className).not.toContain("bg-neutral-300");
        expect(screen.getByText("2").className).toContain("bg-neutral-300");
    });

    it("버튼을 클릭하면 그 번호로 onSelect가 호출된다", async () => {
        const onSelect = vi.fn();
        const user = userEvent.setup();
        render(<PresetTabs active={1} onSelect={onSelect} />);

        await user.click(screen.getByText("3"));

        expect(onSelect).toHaveBeenCalledWith(3);
    });
});
