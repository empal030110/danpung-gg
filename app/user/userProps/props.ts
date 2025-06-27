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
