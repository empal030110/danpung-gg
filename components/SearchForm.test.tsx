// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import SearchForm from "./SearchForm";

describe("SearchForm", () => {
    it("inputValue prop을 입력창 값으로 반영한다", () => {
        render(<SearchForm inputValue="드표디" onChange={() => {}} onSubmit={() => {}} />);

        expect(screen.getByPlaceholderText("캐릭터 이름을 입력하세요")).toHaveValue("드표디");
    });

    it("타이핑하면 글자마다 onChange가 호출된다", async () => {
        const onChange = vi.fn();
        const user = userEvent.setup();
        render(<SearchForm inputValue="" onChange={onChange} onSubmit={() => {}} />);

        await user.type(screen.getByPlaceholderText("캐릭터 이름을 입력하세요"), "AB");

        expect(onChange).toHaveBeenCalledWith("A");
        expect(onChange).toHaveBeenCalledWith("B");
    });

    it("검색 버튼을 누르면 onSubmit이 호출된다", async () => {
        const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault());
        const user = userEvent.setup();
        render(<SearchForm inputValue="드표디" onChange={() => {}} onSubmit={onSubmit} />);

        await user.click(screen.getByRole("button"));

        expect(onSubmit).toHaveBeenCalled();
    });

    it("입력창에 포커스/블러가 일어나면 onFocus/onBlur가 호출된다", async () => {
        const onFocus = vi.fn();
        const onBlur = vi.fn();
        const user = userEvent.setup();
        render(<SearchForm inputValue="" onChange={() => {}} onSubmit={() => {}} onFocus={onFocus} onBlur={onBlur} />);

        await user.click(screen.getByPlaceholderText("캐릭터 이름을 입력하세요"));
        await user.tab();

        expect(onFocus).toHaveBeenCalled();
        expect(onBlur).toHaveBeenCalled();
    });
});
