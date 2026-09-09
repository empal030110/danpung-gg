import { describe, expect, it } from "vitest";
import { gradeBgColor, gradeBorderColor, gradeColor } from "./gradeColor";

describe("gradeColor", () => {
    it("등급별로 정해진 텍스트 색상을 반환한다", () => {
        expect(gradeColor("레전드리")).toBe("text-green-400");
        expect(gradeColor("유니크")).toBe("text-yellow-400");
        expect(gradeColor("에픽")).toBe("text-purple-400");
    });

    it("레어 등급이나 알 수 없는 값, null/undefined는 기본(레어) 색상을 반환한다", () => {
        expect(gradeColor("레어")).toBe("text-blue-300");
        expect(gradeColor(undefined)).toBe("text-blue-300");
        expect(gradeColor(null)).toBe("text-blue-300");
    });
});

describe("gradeBorderColor", () => {
    it("등급별로 정해진 테두리 색상을 반환한다", () => {
        expect(gradeBorderColor("레전드리")).toBe("border-green-400");
        expect(gradeBorderColor("유니크")).toBe("border-yellow-400");
        expect(gradeBorderColor("에픽")).toBe("border-purple-400");
    });

    it("기본값은 레어 테두리 색상이다", () => {
        expect(gradeBorderColor(undefined)).toBe("border-blue-300");
    });
});

describe("gradeBgColor", () => {
    it("등급별로 정해진 배경 색상을 반환한다", () => {
        expect(gradeBgColor("레전드리")).toBe("bg-green-400");
        expect(gradeBgColor("유니크")).toBe("bg-yellow-400");
        expect(gradeBgColor("에픽")).toBe("bg-purple-400");
    });

    it("기본값은 레어 배경 색상이다", () => {
        expect(gradeBgColor(null)).toBe("bg-blue-300");
    });
});
