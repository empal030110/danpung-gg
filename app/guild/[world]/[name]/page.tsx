import { guildIdUrl, guildBasicUrl } from "@/lib/url/apiUrl";
import ssrFetcher from "@/lib/ssrFetcher";
import { guildNameProps, guildBasicProps, guildSkillProps } from "../../guildProps/props";
import GuildHeader from "./components/GuildHeader";
import GuildMemberList from "./components/GuildMemberList";
import GuildNobleSkillList from "./components/GuildNobleSkillList";
import type { Metadata } from "next";

// 페이지 본문과 동일한 URL로 fetch하기 때문에 Next.js가 자동으로 요청을 중복 제거함(추가 API 호출 없음)
export async function generateMetadata({ params }: guildNameProps): Promise<Metadata> {
    const { world, name } = await params;
    const worldName = decodeURIComponent(world);
    const guildName = decodeURIComponent(name);

    try {
        const guildIdData = await ssrFetcher(guildIdUrl(guildName, worldName));
        const guildBasicData = await ssrFetcher(guildBasicUrl(guildIdData[0].oguild_id));
        const info = guildBasicData[0];

        const title = `${info.guild_name} 길드 - ${info.world_name} | 단풍지지`;
        const description = `${info.world_name} 서버 ${info.guild_name} 길드의 길드원 목록과 노블레스 스킬 정보를 단풍지지에서 확인하세요.`;

        return { title, description, openGraph: { title, description } };
    } catch {
        return {
            title: `${guildName} 길드 - ${worldName} | 단풍지지`,
            description: `${worldName} 서버 ${guildName} 길드의 길드원 목록과 노블레스 스킬 정보를 단풍지지에서 확인하세요.`,
        };
    }
}

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

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "홈", item: "https://www.danpung.shop" },
            { "@type": "ListItem", position: 2, name: "길드 검색", item: "https://www.danpung.shop/guild" },
            { "@type": "ListItem", position: 3, name: `${guildData.guildName} 길드`, item: `https://www.danpung.shop/guild/${encodeURIComponent(worldName)}/${encodeURIComponent(guildData.guildName)}` },
        ],
    };

    return (
        <div className="w-full h-auto pb-[40px]">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <div className="w-full px-[20px] py-[32px] flex flex-col gap-[24px]">
                <GuildHeader data={guildData} />
                <GuildMemberList members={guildData.guildMembers} masterName={guildData.guildMasterName} />
                <GuildNobleSkillList skills={guildNobleSkills} />
            </div>
        </div>
    );
}
