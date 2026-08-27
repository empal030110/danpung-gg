import { guildIdUrl } from "@/api/url/apiUrl";
import ssrFetcher from "@/api/ssrFetcher";
import { guildNameProps } from "../../guildProps/props";

export default async function GuildPage({ params }: guildNameProps) {
    const { world, name } = await params;
    const worldName = decodeURIComponent(world);
    const guildName = decodeURIComponent(name);

    const guildIdData = await ssrFetcher(guildIdUrl(guildName, worldName));
    const oguildId = guildIdData[0].oguild_id;

    return (
        <div className="w-full h-auto pb-[40px]">
            <div className="w-full px-[20px] py-[32px]">
                <div className="flex gap-[6px] text-[13px] text-[#f9f9f9] font-bold mb-[6px]">
                    <p className="py-[4px] px-[10px] bg-neutral-400 rounded-[8px] w-fit">{worldName}</p>
                </div>
                <p className="text-[24px] font-bold">{guildName}</p>
                <p className="mt-[16px] text-neutral-400">길드 상세 정보는 준비 중입니다. (길드 고유 키: {oguildId})</p>
            </div>
        </div>
    );
}
