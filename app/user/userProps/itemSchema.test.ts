import { describe, expect, it } from "vitest";
import { itemOptionSchema, itemSchema } from "./itemSchema";

describe("itemSchema", () => {
    it("잠재옵션이 없는 아이템(추가 잠재옵션이 null)을 에러 없이 파싱한다", () => {
        // 실제 넥슨 API는 값이 없는 잠재옵션을 undefined가 아니라 명시적 null로 내려준다
        const raw = {
            item_name: "아케인셰이드 메이지햇",
            item_icon: "icon.png",
            potential_option_grade: "레어",
            potential_option_1: "올스탯 +5",
            potential_option_2: null,
            potential_option_3: null,
            additional_potential_option_grade: null,
            additional_potential_option_1: null,
            additional_potential_option_2: null,
            additional_potential_option_3: null,
            soul_name: null,
            soul_option: null,
        };

        const parsed = itemSchema.parse(raw);

        expect(parsed.potential_option_1).toBe("올스탯 +5");
        expect(parsed.additional_potential_option_1).toBeNull();
        expect(parsed.soul_name).toBeNull();
    });

    it("필드가 아예 없어도(undefined) 파싱된다", () => {
        expect(() => itemSchema.parse({})).not.toThrow();
    });

    it("스키마에 없는 필드는 제거하고 정의된 필드만 남긴다 (넥슨 API 원본은 필드가 훨씬 많음)", () => {
        const raw = {
            item_name: "제네시스 보우",
            item_description: "이 필드는 화면에서 안 씀",
            growth_exp: 12345,
            cuttable_count: "10",
            golden_hammer_flag: "미적용",
        };

        const parsed = itemSchema.parse(raw);

        expect(parsed.item_name).toBe("제네시스 보우");
        expect(parsed).not.toHaveProperty("item_description");
        expect(parsed).not.toHaveProperty("growth_exp");
        expect(parsed).not.toHaveProperty("cuttable_count");
    });

    it("item_total_option 같은 중첩 옵션 객체도 함께 검증한다", () => {
        const raw = {
            item_name: "아케인셰이드 메이지햇",
            item_total_option: { str: "0", int: "145", base_equipment_level: 200 },
        };

        const parsed = itemSchema.parse(raw);

        expect(parsed.item_total_option).toEqual({ str: "0", int: "145", base_equipment_level: 200 });
    });

    it("잠재옵션 필드가 아예 없는 title/android 데이터도 통과시킨다 (ItemBox가 세 종류를 공용으로 다룸)", () => {
        const title = { title_name: "핑아일체", title_icon: "icon.png", date_expire: null };
        const android = { android_name: "싱크로이드", android_icon: "icon.png" };

        expect(() => itemSchema.parse(title)).not.toThrow();
        expect(() => itemSchema.parse(android)).not.toThrow();
    });
});

describe("itemOptionSchema", () => {
    it("스탯 필드는 문자열로, base_equipment_level/exceptional_upgrade는 숫자로 검증한다", () => {
        const raw = { str: "0", int: "145", base_equipment_level: 200, exceptional_upgrade: 0 };

        const parsed = itemOptionSchema.parse(raw);

        expect(parsed.str).toBe("0");
        expect(parsed.base_equipment_level).toBe(200);
    });
});
