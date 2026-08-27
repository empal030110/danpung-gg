import { guildBasicProps } from "../../../guildProps/props";

export default function GuildHeader({ data }: { data: guildBasicProps }) {
    return (
        <div className="w-full flex flex-col items-center justify-center gap-[24px] p-[24px] pc:p-[32px] pc:flex-row pc:items-center pc:justify-center pc:gap-[64px] bg-gray-200 dark:bg-neutral-800 rounded-[16px]">
            <div className="flex items-center gap-[12px]">
                <div>
                    <div className="flex items-baseline gap-[8px]">
                        <span className="text-[24px] font-bold">{data.guildName}</span>
                        <span className="text-[16px] text-neutral-500 dark:text-neutral-400 font-semibold">Lv.{data.guildLevel}</span>
                    </div>
                    <p className="text-[12px] text-neutral-500 dark:text-neutral-400 mt-[2px]">{data.worldName}</p>
                </div>
            </div>
            <div className="hidden pc:block w-px h-[64px] bg-gray-300 dark:bg-neutral-700" />
            <div className="flex flex-col items-center pc:items-start gap-[6px] text-[14px]">
                <p className="text-[13px] text-neutral-500 dark:text-neutral-400 font-bold mb-[2px]">길드 정보</p>
                <p>마스터 <span className="font-bold">{data.guildMasterName}</span></p>
                <p>길드원 <span className="font-bold">{data.guildUserCount.toLocaleString()}명</span></p>
                <p>캐릭터 <span className="font-bold">{data.guildMemberCount.toLocaleString()}명</span></p>
                <p>노블 <span className="font-bold">{data.guildNobleScore}점</span></p>
            </div>
        </div>
    );
}
