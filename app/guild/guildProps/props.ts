export interface guildNameProps {
    params: Promise<{ world: string; name: string }>;
}

export interface guildDataProps {
    oguildId: string;
    guildName: string;
    worldName: string;
}

export interface guildBasicProps {
    worldName: string;
    guildName: string;
    guildLevel: number;
    guildMasterName: string;
    guildMemberCount: number;
    guildUserCount: number;
    guildNobleScore: number;
    guildMembers: string[];
}

export interface guildSkillProps {
    skill_name: string;
    skill_level: number;
    skill_icon: string;
}
