import { z } from "zod";

// 넥슨 API는 값이 없는 필드를 대부분 명시적 null로 내려준다 (itemSchema.ts와 동일한 방침)
const nullishString = z.string().nullish();
const nullishNumber = z.number().nullish();

// character/basic
export const userInfoRawSchema = z.object({
    date: nullishString,
    character_name: nullishString,
    world_name: nullishString,
    character_gender: nullishString,
    character_class: nullishString,
    character_class_level: nullishString,
    character_level: nullishNumber,
    character_exp: nullishNumber,
    character_exp_rate: nullishString,
    character_guild_name: nullishString,
    character_image: nullishString,
    character_date_create: nullishString,
    access_flag: nullishString,
    liberation_quest_clear_flag: nullishString,
});

// character/set-effect
export const userSetOptionsSchema = z.object({
    set_count: nullishNumber,
    set_option: nullishString,
});
export const userSetSchema = z.object({
    set_name: nullishString,
    total_set_count: nullishNumber,
    set_effect_info: z.array(userSetOptionsSchema).nullish(),
    set_option_full: z.array(userSetOptionsSchema).nullish(),
});
export const setDataRawSchema = z.object({
    set_effect: z.array(userSetSchema).nullish(),
});

// character/symbol-equipment
export const symbolSchema = z.object({
    symbol_icon: nullishString,
    symbol_level: nullishNumber,
    symbol_force: nullishString,
});
const symbolRawItemSchema = symbolSchema.extend({
    symbol_name: nullishString, // 아케인/어센틱 분류용 (symbolProps엔 없음)
});
export const symbolDataRawSchema = z.object({
    symbol: z.array(symbolRawItemSchema).nullish(),
});

// character/ability
export const abilityInfoSchema = z.object({
    ability_no: nullishString,
    ability_grade: nullishString,
    ability_value: nullishString,
});
export const abilityPresetSchema = z.object({
    ability_preset_grade: nullishString,
    ability_info: z.array(abilityInfoSchema).nullish(),
});
export const abilityDataRawSchema = z.object({
    preset_no: nullishNumber,
    ability_preset_1: abilityPresetSchema.nullish(),
    ability_preset_2: abilityPresetSchema.nullish(),
    ability_preset_3: abilityPresetSchema.nullish(),
});

// character/item-equipment 겉봉투 (아이템 배열 자체는 itemSchema.parse가 개별 검증)
export const itemDataRawSchema = z.object({
    preset_no: nullishNumber,
    item_equipment: z.array(z.unknown()).nullish(),
    item_equipment_preset_1: z.array(z.unknown()).nullish(),
    item_equipment_preset_2: z.array(z.unknown()).nullish(),
    item_equipment_preset_3: z.array(z.unknown()).nullish(),
    title: z
        .object({
            title_name: nullishString,
            title_icon: nullishString,
            title_description: nullishString,
            date_expire: nullishString,
            date_option_expire: nullishString,
        })
        .nullish(),
});

// character/android-equipment
export const androidSchema = z.object({
    android_name: nullishString,
    android_icon: nullishString,
});

// character/pet-equipment (pet_1/2/3 고정 슬롯)
export const petEquipmentOptionSchema = z.object({
    option_type: nullishString,
    option_value: nullishString,
});
export const petEquipmentSchema = z.object({
    item_name: nullishString,
    item_icon: nullishString,
    item_option: z.array(petEquipmentOptionSchema).nullish(),
});
export const petDataRawSchema = z.object({
    pet_1_name: nullishString,
    pet_1_icon: nullishString,
    pet_1_pet_type: nullishString,
    pet_1_equipment: petEquipmentSchema.nullish(),
    world_share_pet_1_equipment: petEquipmentSchema.nullish(),
    pet_2_name: nullishString,
    pet_2_icon: nullishString,
    pet_2_pet_type: nullishString,
    pet_2_equipment: petEquipmentSchema.nullish(),
    world_share_pet_2_equipment: petEquipmentSchema.nullish(),
    pet_3_name: nullishString,
    pet_3_icon: nullishString,
    pet_3_pet_type: nullishString,
    pet_3_equipment: petEquipmentSchema.nullish(),
    world_share_pet_3_equipment: petEquipmentSchema.nullish(),
});

// character/hyper-stat
export const hyperStatEntrySchema = z.object({
    stat_type: nullishString,
    stat_point: nullishNumber,
    stat_level: nullishNumber,
    stat_increase: nullishString,
});
export const hyperStatDataRawSchema = z.object({
    use_preset_no: nullishString, // 문자열로 내려와서 호출부에서 Number() 변환
    hyper_stat_preset_1: z.array(hyperStatEntrySchema).nullish(),
    hyper_stat_preset_2: z.array(hyperStatEntrySchema).nullish(),
    hyper_stat_preset_3: z.array(hyperStatEntrySchema).nullish(),
});

// character/stat
export const userStatSchema = z.object({
    stat_name: nullishString,
    stat_value: nullishString,
});
export const statDataRawSchema = z.object({
    final_stat: z.array(userStatSchema).nullish(),
});

// character/skill (6차/5차 공용), character/link-skill
export const skillSchema = z.object({
    skill_name: nullishString,
    skill_level: nullishNumber,
    skill_icon: nullishString,
});
export const skillDataRawSchema = z.object({
    character_skill: z.array(skillSchema).nullish(),
});
export const linkSkillDataRawSchema = z.object({
    character_link_skill: z.array(skillSchema).nullish(),
    character_link_skill_preset_1: z.array(skillSchema).nullish(),
    character_link_skill_preset_2: z.array(skillSchema).nullish(),
    character_link_skill_preset_3: z.array(skillSchema).nullish(),
});

// character/hexamatrix-stat
export const hexaStatCoreSchema = z.object({
    main_stat_name: nullishString,
    main_stat_level: nullishNumber,
    sub_stat_name_1: nullishString,
    sub_stat_level_1: nullishNumber,
    sub_stat_name_2: nullishString,
    sub_stat_level_2: nullishNumber,
});
export const hexaStatDataRawSchema = z.object({
    character_hexa_stat_core: z.array(hexaStatCoreSchema).nullish(),
    character_hexa_stat_core_2: z.array(hexaStatCoreSchema).nullish(),
    character_hexa_stat_core_3: z.array(hexaStatCoreSchema).nullish(),
});

// user/union
export const userUnionSchema = z.object({
    union_level: z.number(),
    union_grade: nullishString,
    union_artifact_level: nullishNumber,
});
// 미가입 등으로 union_level 자체가 null일 수 있어 겉봉투는 따로 느슨하게 검증
export const unionDataRawSchema = z.object({
    union_level: nullishNumber,
    union_grade: nullishString,
    union_artifact_level: nullishNumber,
});

// user/union-champion
export const unionChampionSchema = z.object({
    champion_slot: nullishNumber,
    champion_name: nullishString,
    champion_class: nullishString,
    champion_grade: nullishString,
});
const championBadgeSchema = z.object({
    stat: nullishString,
});
export const unionChampionDataRawSchema = z.object({
    union_champion: z.array(unionChampionSchema).nullish(),
    champion_badge_total_info: z.array(championBadgeSchema).nullish(),
});

// user/union-artifact
export const unionArtifactEffectSchema = z.object({
    name: nullishString,
    level: nullishNumber,
});
export const unionArtifactDataRawSchema = z.object({
    union_artifact_effect: z.array(unionArtifactEffectSchema).nullish(),
});

// user/union-raider
export const unionStateStatPresetSchema = z.object({
    preset_no: nullishNumber,
    union_state_stat: z.array(z.string()).nullish(),
});
export const unionRaiderDataRawSchema = z.object({
    union_raider_stat: z.array(z.string()).nullish(),
    use_preset_no: nullishNumber,
    union_state_stat_preset: z.array(unionStateStatPresetSchema).nullish(),
});

// character/cashitem-equipment
export const cashItemSchema = z.object({
    cash_item_equipment_part: nullishString,
    cash_item_equipment_slot: nullishString,
    cash_item_name: nullishString,
    cash_item_icon: nullishString,
});
export const cashItemDataRawSchema = z.object({
    preset_no: nullishNumber,
    cash_item_equipment_base: z.array(cashItemSchema).nullish(),
    cash_item_equipment_preset_1: z.array(cashItemSchema).nullish(),
    cash_item_equipment_preset_2: z.array(cashItemSchema).nullish(),
    cash_item_equipment_preset_3: z.array(cashItemSchema).nullish(),
});

// ranking/achievement, ranking/dojang
export const achievementRankSchema = z.object({
    ranking: nullishNumber,
    trophy_score: nullishNumber,
    trophy_grade: nullishString,
});
export const achievementDataRawSchema = z.object({
    ranking: z.array(achievementRankSchema).nullish(),
});

export const dojangRankSchema = z.object({
    ranking: nullishNumber,
    dojang_floor: nullishNumber,
    dojang_time_record: nullishNumber,
});
export const dojangDataRawSchema = z.object({
    ranking: z.array(dojangRankSchema).nullish(),
});
