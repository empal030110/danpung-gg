import { userDataProps, userStatProps } from "../../userProps/props";
import Image from "next/image";
import { popularityUrl, overallUrl, unionUrl, statUrl } from "@/api/url/apiUrl";
import ssrFetcher from "@/api/ssrFetcher";
import { charImgUrl } from "@/public/charImg/charImg";

export default async function UserHeader({ data, ocid }: { data: userDataProps, ocid: string}) {
    // data는 기본 정보
    // 인기도 정보
    const userPopularityUrl = popularityUrl(ocid);
    const userPopularity = await ssrFetcher(userPopularityUrl);

    // 랭킹
    const userOverallUrl = overallUrl(ocid); // 전체 랭킹
    const userOverallData = await ssrFetcher(userOverallUrl);
    const userOverall = userOverallData[0].ranking[0].ranking.toLocaleString();

    const userWorldOverallUrl = overallUrl(ocid, data.worldName); // 월드 랭킹
    const userWorldOverallData = await ssrFetcher(userWorldOverallUrl);
    const userWorldOverall = userWorldOverallData[0].ranking[0].ranking.toLocaleString();
    
    // 유니온
    const userUnionUrl = unionUrl(ocid);
    const userUnionData = await ssrFetcher(userUnionUrl);
    const userUnionLevel = userUnionData[0].union_level.toLocaleString();

    // 전투력 정보
    const userStatUrl = statUrl(ocid);
    const userStatData = await ssrFetcher(userStatUrl);
    const finalStat = userStatData[0].final_stat;
    const combatStatData = finalStat.find((stat: userStatProps) => stat.stat_name === "전투력");
    const combatStat = Number(combatStatData.stat_value).toLocaleString();

    // 직업 이미지
    const userCharImgUrl = charImgUrl(data.characterClass);

    return (
        <div className="w-full flex items-center justify-start flex-col pc:flex-row relative">
            <Image src={data.characterImage} alt={data.characterName} width={144} height={144} className="mx-[30px]" />
            <div className="flex flex-col gap-[12px]">
                <div>
                    <div className="flex gap-[6px] text-[13px] text-[#f9f9f9] font-bold mb-[6px]">
                        <p className="py-[4px] px-[10px] bg-neutral-400 rounded-[8px]">{data.worldName}</p>
                        <p className="py-[4px] px-[10px] bg-neutral-400 rounded-[8px]">{data.characterClass}</p>
                    </div>
                    <p className="text-[24px] font-bold">{data.characterName}</p>
                </div>
                <div className="flex flex-col gap-[3px] text-[14px] font-semibold">
                    <p>생성날짜 {data.characterDateCreate.split("T")[0]}</p>
                    <p>길드 {data.characterGuildName ? data.characterGuildName : '-' }</p>
                    <p>인기도 {userPopularity[0].popularity}</p>
                    <p>종합랭킹 {userOverall}위 ({userWorldOverall}위)</p>
                </div>
                <div className="flex gap-[16px]">
                    <div>
                        <p>레벨</p>
                        <p className="text-[20px] font-bold">LV.{data.characterLevel}</p>
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
            <Image src={userCharImgUrl} alt={data.characterClass} width={0} height={0} sizes="100vw" className="w-full max-w-[400px] h-auto pc:w-[320px] absolute top-[-50px] right-1/2 translate-x-1/2 opacity-50 z-[-1] object-contain object-top pc:right-0 pc:translate-x-0 pc:opacity-100" />
        </div>
    );
}