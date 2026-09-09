import { describe, expect, it } from "vitest";
import formatStatValue from "./formatStatValue";

describe("formatStatValue", () => {
    it("순수 정수 문자열에는 천 단위 콤마를 붙인다", () => {
        expect(formatStatValue("43147111")).toBe("43,147,111");
    });

    it("음수 정수 문자열도 콤마를 붙인다", () => {
        expect(formatStatValue("-1234")).toBe("-1,234");
    });

    it("소수 문자열은 그대로 둔다 (toLocaleString이 소수 자릿수를 바꿔버리는 것을 방지)", () => {
        expect(formatStatValue("77.35")).toBe("77.35");
        expect(formatStatValue("81.00")).toBe("81.00");
    });

    it("숫자가 아닌 문자열은 그대로 둔다", () => {
        expect(formatStatValue("실버")).toBe("실버");
    });

    it("값이 없으면(undefined/null) '-'를 반환한다", () => {
        expect(formatStatValue(undefined)).toBe("-");
        expect(formatStatValue(null as unknown as string)).toBe("-");
    });
});
