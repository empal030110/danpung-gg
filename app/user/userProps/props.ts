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

export interface itemOptionProps {
  str?: string,
  dex?: string,
  int?: string,
  luk?: string,
  max_hp?: string,
  max_mp?: string,
  attack_power?: string,
  magic_power?: string,
  armor?: string,
  speed?: string,
  jump?: string,
  boss_damage?: string,
  ignore_monster_armor?: string,
  all_stat?: string,
  damage?: string,
  base_equipment_level?: number,
  exceptional_upgrade?: number,
}

export interface itemProps {
  additional_potential_option_1?: string,
  additional_potential_option_2?: string,
  additional_potential_option_3?: string,
  additional_potential_option_flag?: string,
  additional_potential_option_grade?: string,
  soul_name?: string,
  soul_option?: string,
  item_equipment_part?: string,
  item_equipment_slot?: string,
  item_icon?: string,
  item_name?: string,
  potential_option_1?: string,
  potential_option_2?: string,
  potential_option_3?: string,
  potential_option_flag?: string,
  potential_option_grade?: string,
  starforce?: string,
  scroll_upgrade?: string,
  scroll_upgradeable_count?: string,
  scroll_resilience_count?: string,
  item_total_option?: itemOptionProps,
  item_base_option?: itemOptionProps,
  item_add_option?: itemOptionProps,
  item_etc_option?: itemOptionProps,
  item_starforce_option?: itemOptionProps,
  item_exceptional_option?: itemOptionProps,
  date_expire?: string | null,
  title_name?: string,
  title_icon?: string,
  title_description?: string,
  date_option_expire?: string | null,
  android_name?: string,
  android_icon?: string,
  special_ring_level?: number,
}

export interface titleProps {
  title_name?: string,
  title_icon?: string,
  title_description?: string,
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