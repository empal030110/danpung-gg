import { describe, expect, it } from "vitest";
import { cutOptionName } from "./cutOptionName";

describe("cutOptionName", () => {
    it("긴 옵션명을 축약형으로 바꾼다", () => {
        expect(cutOptionName("보스 몬스터 데미지 +40%")).toBe("보공 +40%");
        expect(cutOptionName("최대 HP +250")).toBe("HP +250");
        expect(cutOptionName("크리티컬 확률 +9%")).toBe("크확 +9%");
    });

    it("한 문자열에 축약 대상이 여러 개면 전부 바꾼다", () => {
        expect(cutOptionName("최대 HP +250, 최대 MP +250, 크리티컬 데미지 +5%")).toBe("HP +250, MP +250, 크뎀 +5%");
    });

    it("매핑에 없는 텍스트는 그대로 둔다", () => {
        expect(cutOptionName("올스탯 +5")).toBe("올스탯 +5");
    });

    it("값이 없으면(undefined/null/빈 문자열) 그대로 반환한다", () => {
        expect(cutOptionName(undefined)).toBeUndefined();
        expect(cutOptionName(null)).toBeNull();
        expect(cutOptionName("")).toBe("");
    });
});
