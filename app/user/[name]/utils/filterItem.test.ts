import { describe, expect, it } from "vitest";
import { filterItem } from "./filterItem";
import { androidProps, itemProps, titleProps } from "../../userProps/props";

const item = (item_equipment_slot: string | null, item_name: string): itemProps =>
    ({ item_equipment_slot, item_name }) as itemProps;

describe("filterItem", () => {
    it("item_equipment_slot이 일치하는 아이템만 걸러낸다", () => {
        const items = [item("무기", "제네시스 보우"), item("모자", "아케인셰이드 메이지햇")];

        expect(filterItem(items, "무기")).toEqual([item("무기", "제네시스 보우")]);
    });

    it("일치하는 슬롯이 없으면 빈 배열을 반환한다", () => {
        const items = [item("무기", "제네시스 보우")];

        expect(filterItem(items, "모자")).toEqual([]);
    });

    it("슬롯이 null인 아이템(프리셋 미사용 등)은 어떤 filter와도 매칭되지 않는다", () => {
        const items = [item(null, "빈 슬롯")];

        expect(filterItem(items, "무기")).toEqual([]);
    });

    it("filter가 '안드로이드'면 슬롯과 무관하게 원본을 그대로 반환한다", () => {
        const androids: androidProps[] = [{ android_name: "싱크로이드", android_icon: "icon.png" }];

        expect(filterItem(androids, "안드로이드")).toBe(androids);
    });

    it("filter가 '칭호'면 슬롯과 무관하게 원본을 그대로 반환한다", () => {
        const titles: titleProps[] = [{ title_name: "핑아일체", title_icon: "icon.png" }];

        expect(filterItem(titles, "칭호")).toBe(titles);
    });

    it("빈 배열이 들어오면 빈 배열을 반환한다", () => {
        expect(filterItem([] as itemProps[], "무기")).toEqual([]);
    });
});
