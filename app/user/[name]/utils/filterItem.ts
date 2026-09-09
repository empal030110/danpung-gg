import { androidProps, itemProps, titleProps } from "../../userProps/props";

// android/title은 슬롯 구분이 없어 필터링 없이 그대로 통과, item만 item_equipment_slot으로 거른다
export function filterItem(items: itemProps[], filter: string): itemProps[];
export function filterItem(items: androidProps[], filter: string): androidProps[];
export function filterItem(items: titleProps[], filter: string): titleProps[];
export function filterItem(items: (itemProps | androidProps | titleProps)[], filter: string) {
    if (filter === '안드로이드' || filter === '칭호') {
        return items;
    }
    return (items as itemProps[]).filter((item) => item.item_equipment_slot === filter);
}
