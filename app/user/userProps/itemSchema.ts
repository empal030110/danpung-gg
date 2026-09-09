import { z } from "zod";

// 넥슨 API는 값이 없는 필드를 "" 대신 명시적 null로 내려주는 경우가 많아 전부 nullish로 받는다
// (예: additional_potential_option_1은 잠재옵션이 없으면 null)
const nullishString = z.string().nullish();
const nullishNumber = z.number().nullish();

export const itemOptionSchema = z.object({
    str: nullishString,
    dex: nullishString,
    int: nullishString,
    luk: nullishString,
    max_hp: nullishString,
    max_mp: nullishString,
    attack_power: nullishString,
    magic_power: nullishString,
    armor: nullishString,
    speed: nullishString,
    jump: nullishString,
    boss_damage: nullishString,
    ignore_monster_armor: nullishString,
    all_stat: nullishString,
    damage: nullishString,
    base_equipment_level: nullishNumber,
    exceptional_upgrade: nullishNumber,
});

// item/title/android 세 종류를 ItemBox 하나에서 함께 다루기 때문에 필드가 섞여 있음 (기존 itemProps와 동일)
export const itemSchema = z.object({
    additional_potential_option_1: nullishString,
    additional_potential_option_2: nullishString,
    additional_potential_option_3: nullishString,
    additional_potential_option_flag: nullishString,
    additional_potential_option_grade: nullishString,
    soul_name: nullishString,
    soul_option: nullishString,
    item_equipment_part: nullishString,
    item_equipment_slot: nullishString,
    item_icon: nullishString,
    item_name: nullishString,
    potential_option_1: nullishString,
    potential_option_2: nullishString,
    potential_option_3: nullishString,
    potential_option_flag: nullishString,
    potential_option_grade: nullishString,
    starforce: nullishString,
    starforce_scroll_flag: nullishString,
    scroll_upgrade: nullishString,
    scroll_upgradeable_count: nullishString,
    scroll_resilience_count: nullishString,
    item_total_option: itemOptionSchema.nullish(),
    item_base_option: itemOptionSchema.nullish(),
    item_add_option: itemOptionSchema.nullish(),
    item_etc_option: itemOptionSchema.nullish(),
    item_starforce_option: itemOptionSchema.nullish(),
    item_exceptional_option: itemOptionSchema.nullish(),
    date_expire: nullishString,
    title_name: nullishString,
    title_icon: nullishString,
    title_description: nullishString,
    date_option_expire: nullishString,
    android_name: nullishString,
    android_icon: nullishString,
    special_ring_level: nullishNumber,
});
