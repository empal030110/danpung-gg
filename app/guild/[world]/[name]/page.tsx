import { guildIdUrl, guildBasicUrl } from "@/api/url/apiUrl";
import ssrFetcher from "@/api/ssrFetcher";
import { guildNameProps, guildBasicProps, guildSkillProps } from "../../guildProps/props";
import GuildHeader from "./components/GuildHeader";
import GuildMemberList from "./components/GuildMemberList";
import GuildNobleSkillList from "./components/GuildNobleSkillList";

export default async function GuildPage({ params }: guildNameProps) {
    const { world, name } = await params;
    const worldName = decodeURIComponent(world);
    const guildName = decodeURIComponent(name);

    const guildIdData = await ssrFetcher(guildIdUrl(guildName, worldName));
    const oguildId = guildIdData[0].oguild_id;

    const guildBasicData = await ssrFetcher(guildBasicUrl(oguildId));

    // 노블레스 스킬 및 노블 점수
    const guildNobleSkills: guildSkillProps[] = guildBasicData[0].guild_noblesse_skill ?? [];
    const guildNobleScore: number = guildNobleSkills.reduce((sum, skill) => sum + skill.skill_level, 0);

    // 길드원 목록 (마스터를 가장 앞으로, 나머지는 API가 내려주는 순서 그대로)
    const guildMasterName: string = guildBasicData[0].guild_master_name;
    const rawGuildMembers: string[] = guildBasicData[0].guild_member ?? [];
    const guildMembers: string[] = [guildMasterName, ...rawGuildMembers.filter((member) => member !== guildMasterName)];

    const guildData: guildBasicProps = {
        worldName: guildBasicData[0].world_name,
        guildName: guildBasicData[0].guild_name,
        guildLevel: guildBasicData[0].guild_level,
        guildMasterName,
        guildMemberCount: guildBasicData[0].guild_member_count,
        guildUserCount: guildBasicData[0].guild_user_count,
        guildNobleScore,
        guildMembers,
    };

    return (
        <div className="w-full h-auto pb-[40px]">
            <div className="w-full px-[20px] py-[32px] flex flex-col gap-[24px]">
                <GuildHeader data={guildData} />
                <GuildMemberList members={guildData.guildMembers} masterName={guildData.guildMasterName} />
                <GuildNobleSkillList skills={guildNobleSkills} />
            </div>
        </div>
    );
}
