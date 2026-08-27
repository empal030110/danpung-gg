export interface guildNameProps {
    params: Promise<{ world: string; name: string }>;
}

export interface guildDataProps {
    oguildId: string;
    guildName: string;
    worldName: string;
}
