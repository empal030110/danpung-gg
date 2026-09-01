import { userDataProps, userStatProps } from "../../userProps/props";
import Image from "next/image";
import Link from "next/link";
import { popularityUrl, overallUrl, unionUrl, statUrl } from "@/api/url/apiUrl";
import ssrFetcher from "@/api/ssrFetcher";
import ssrRankingFetcher from "@/api/ssrRankingFetcher";
import FavoriteButton from "./FavoriteButton";

export default async function UserHeader({ data, ocid }: { data: userDataProps, ocid: string}) {
    // data는 기본 정보
    // 인기도 정보
    const userPopularityUrl = popularityUrl(ocid);
    const userPopularity = await ssrFetcher(userPopularityUrl);

    // 랭킹
    const userOverallData = await ssrRankingFetcher((date) => overallUrl(ocid, data.worldName, date)); // 전체 랭킹
    const userOverall = userOverallData[0].ranking[0] ? userOverallData[0].ranking[0].ranking.toLocaleString() : '-';

    const userWorldOverallData = await ssrRankingFetcher((date) => overallUrl(ocid, data.worldName, date, true)); // 월드 랭킹
    const userWorldOverall = userWorldOverallData[0].ranking[0] ? userWorldOverallData[0].ranking[0].ranking.toLocaleString() : '-';
    
    // 유니온
    const userUnionUrl = unionUrl(ocid);
    const userUnionData = await ssrFetcher(userUnionUrl);
    const userUnionLevel = userUnionData[0].union_level ? userUnionData[0].union_level.toLocaleString() : 0;

    // 전투력 정보
    const userStatUrl = statUrl(ocid);
    const userStatData = await ssrFetcher(userStatUrl);
    const finalStat = userStatData[0].final_stat;
    const combatStatData = finalStat.find((stat: userStatProps) => stat.stat_name === "전투력");
    const combatStat = combatStatData ? Number(combatStatData.stat_value).toLocaleString() : '-';

    return (
        <div className="w-full flex items-center justify-center flex-col pc:flex-row relative">
            <div className="mx-[30px] relative">
                <Image src={data.characterImage} alt={data.characterName} width={300} height={300} className="scale-[1.7] -z-10 pointer-events-none" priority unoptimized />
                <FavoriteButton characterName={data.characterName} />
            </div>
            <div className="flex flex-col gap-[12px]">
                <div>
                    <div className="flex gap-[6px] text-[13px] text-[#f9f9f9] font-bold mb-[6px]">
                        <p className="py-[4px] px-[10px] bg-neutral-400 rounded-[8px]">{data.worldName}</p>
                        <p className="py-[4px] px-[10px] bg-neutral-400 rounded-[8px]">{data.characterClass}</p>
                    </div>
                    <h1 className="text-[24px] font-bold">{data.characterName}</h1>
                </div>
                <div className="flex flex-col gap-[3px] text-[14px] font-semibold">
                    <p>생성날짜 {data.characterDateCreate.split("T")[0]}</p>
                    <p>길드 {data.characterGuildName ? (
                        <Link
                            href={`/guild/${encodeURIComponent(data.worldName)}/${encodeURIComponent(data.characterGuildName)}`}
                            className="underline underline-offset-2 hover:text-neutral-300"
                        >
                            {data.characterGuildName}
                        </Link>
                    ) : '-' }</p>
                    <p>인기도 {userPopularity[0].popularity}</p>
                    <p>종합랭킹 {userOverall}위 ({userWorldOverall}위)</p>
                </div>
                <div className="flex gap-[16px]">
                    <div>
                        <p>레벨</p>
                        <div>
                            <p className="text-[20px] font-bold">LV.{data.characterLevel}</p>
                            <p className="text-[12px] text-neutral-400">({data.characterExpRate}%)</p>
                        </div>
                    </div>
                    <div>
                        <p>유니온</p>
                        <p className="text-[20px] font-bold">{userUnionLevel}</p>
                    </div>
                    <div>
                        <p>전투력</p>
                        <p className="text-[20px] font-bold">{combatStat}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}