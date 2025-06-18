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
