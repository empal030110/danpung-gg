import Image from "next/image";
import { userProps } from "../props/userProps";

export default function RankBox({ data, color }: { data: userProps, color:string}) {
    return (
        <div className={`w-full max-w-[235px] flex flex-col items-center justify-center border border-${color} rounded-[16px]`}>
            <p className={`w-full p-[8px] border-b-[2px] text-[14px] border-${color}`}>무릉도장 1위</p>
            <div className="w-full flex gap-[4px] items-center justify-center text-[12px] p-[8px] pt-[12px]">
                <p>{data.name}</p>
                <p>Lv.{data.level}</p>
                <p>{data.className}</p>
            </div>
            <div>
                <Image src={data.img} alt={data.name} width={96} height={96} />
            </div>
            <p className="w-full text-[18px] font-bold p-[8px] pb-[16px] flex items-center justify-center gap-[2px]">
                {data.floor ? `${data.floor}층` : `${data.trophyGrade}`}
                {data.trophyScore && (
                    <span className="text-[12px]">({data.trophyScore})</span>
                )}
            </p>
            <div className={`w-full border-t font-bold p-[8px] rounded-b-[16px] border-${color} bg-${color}`}>
                상세보기
            </div>
        </div>
    );
}