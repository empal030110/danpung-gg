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
}

export interface titleProps {
  title_name?: string,
  title_icon?: string,
}

export interface androidProps {
  android_name?: string,
  android_icon?: string,
}