import { guildIdUrl, guildBasicUrl } from "@/api/url/apiUrl";
import ssrFetcher from "@/api/ssrFetcher";
import { guildNameProps, guildBasicProps } from "../../guildProps/props";
import GuildHeader from "./components/GuildHeader";

export default async function GuildPage({ params }: guildNameProps) {
    const { world, name } = await params;
    const worldName = decodeURIComponent(world);
    const guildName = decodeURIComponent(name);

    const guildIdData = await ssrFetcher(guildIdUrl(guildName, worldName));
    const oguildId = guildIdData[0].oguild_id;

    const guildBasicData = await ssrFetcher(guildBasicUrl(oguildId));

    // 노블 점수
    const guildNobleScore: number = (guildBasicData[0].guild_noblesse_skill ?? [])
        .reduce((sum: number, skill: { skill_level: number }) => sum + skill.skill_level, 0);

    const guildData: guildBasicProps = {
        worldName: guildBasicData[0].world_name,
        guildName: guildBasicData[0].guild_name,
        guildLevel: guildBasicData[0].guild_level,
        guildMasterName: guildBasicData[0].guild_master_name,
        guildMemberCount: guildBasicData[0].guild_member_count,
        guildUserCount: guildBasicData[0].guild_user_count,
        guildNobleScore,
    };

    return (
        <div className="w-full h-auto pb-[40px]">
            <div className="w-full px-[20px] py-[32px]">
                <GuildHeader data={guildData} />
            </div>
        </div>
    );
}
