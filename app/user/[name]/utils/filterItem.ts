// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function filterItem(items: any[], filter: string) {
    if (filter === '안드로이드') {
        return items;
    }
    return items.filter((item) => item.item_equipment_slot === filter);
}
