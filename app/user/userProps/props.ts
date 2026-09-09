import type { z } from "zod";
import type { itemOptionSchema, itemSchema } from "./itemSchema";

export interface userNameProps {
    params: Promise<{ name: string }>;
}

export interface userDataProps {
    date: string,
    characterName: string,
    worldName: string,
    characterGender: string,
    characterClass: string,
    characterClassLevel: string,
    characterLevel: 0,
    characterExp: 0,
    characterExpRate: string,
    characterGuildName: string,
    characterImage: string,
    characterDateCreate: string,
    accessFlag: string,
    liberationQuestClearFlag: string
}

export interface userStatProps {
  stat_name: string;
  stat_value: string;
}

export interface userSetOptions {
	set_count: number;
	set_option: string;
}
export interface userSetProps {
	set_name: string,
	total_set_count: number,
	set_effect_info: userSetOptions[];
	set_option_full: userSetOptions[];
}

export interface ability {
  ability_no: string;
  ability_grade: '레전드리' | '유니크' | '에픽';
  ability_value: string;
}
export interface abilityProps {
  ability_preset_grade: '레전드리' | '유니크' | '에픽';
  ability_info: ability[];
}

export type presetNumberProps = number;

// item/title/android 데이터는 넥슨 API 응답을 zod로 검증한 뒤 타입을 그대로 뽑아 쓴다 (itemSchema.ts 참고)
export type itemOptionProps = z.infer<typeof itemOptionSchema>;
export type itemProps = z.infer<typeof itemSchema>;

export interface titleProps {
  title_name?: string | null,
  title_icon?: string | null,
  title_description?: string | null,
  date_expire?: string | null,
  date_option_expire?: string | null,
}

export interface androidProps {
  android_name?: string,
  android_icon?: string,
}

export interface symbolProps {
  symbol_icon?: string,
  symbol_level?: number,
  symbol_force?: string,
}

export interface petEquipmentOption {
  option_type: string,
  option_value: string,
}
export interface petEquipmentProps {
  item_name?: string | null,
  item_icon?: string | null,
  item_option?: petEquipmentOption[],
}
export interface petProps {
  pet_name?: string,
  pet_icon?: string,
  pet_type?: string,
  pet_equipment?: petEquipmentProps,
}

export interface hyperStatEntryProps {
  stat_type: string,
  stat_point: number | null,
  stat_level: number,
  stat_increase: string | null,
}

export interface skillProps {
  skill_name: string,
  skill_level: number,
  skill_icon: string,
}

export interface hexaStatCoreProps {
  main_stat_name: string | null,
  main_stat_level: number,
  sub_stat_name_1: string | null,
  sub_stat_level_1: number,
  sub_stat_name_2: string | null,
  sub_stat_level_2: number,
}

export interface userUnionProps {
  union_level: number,
  union_grade: string,
  union_artifact_level: number,
}

export interface unionChampionProps {
  champion_slot: number,
  champion_name: string,
  champion_class: string,
  champion_grade: string,
}

export interface unionArtifactEffectProps {
  name: string,
  level: number,
}

export interface unionStateStatPresetProps {
  preset_no: number,
  union_state_stat: string[],
}

export interface cashItemProps {
  cash_item_equipment_part: string,
  cash_item_equipment_slot: string,
  cash_item_name: string,
  cash_item_icon: string,
}

export interface achievementRankProps {
  ranking: number,
  trophy_score: number,
  trophy_grade: string,
}

export interface dojangRankProps {
  ranking: number,
  dojang_floor: number,
  dojang_time_record: number,
}