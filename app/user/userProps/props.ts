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

export interface itemProps {
  additional_potential_option_1?: string,
  additional_potential_option_2?: string,
  additional_potential_option_3?: string,
  additional_potential_option_flag?: string,
  additional_potential_option_grade?: string,
  item_equipment_slot?: string,
  item_icon?: string,
  item_name?: string,
  potential_option_1?: string,
  potential_option_2?: string,
  potential_option_3?: string,
  potential_option_flag?: string,
  potential_option_grade?: string,
  starforce?: string,
  title_name?: string,
  title_icon?: string,
  android_name?: string,
  android_icon?: string,
  special_ring_level?: number,
}

export interface titleProps {
  title_name?: string,
  title_icon?: string,
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