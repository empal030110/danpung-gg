import Image from "next/image";
import { userProps } from "../props/userProps";
import clsx from "clsx";

export default function RankBox({ data, color }: { data: userProps, color:string}) {
    const borderColor = `border-${color}`;
    const bgColor = `bg-${color}`;

    return (
        <div className={clsx("w-full max-w-[235px] flex flex-col items-center justify-center border rounded-[16px]", borderColor)}>
            <p className={clsx("w-full p-[8px] border-b-[2px] text-[14px]", borderColor)}>무릉도장 1위</p>
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
            <div className={clsx("w-full border-t font-bold p-[8px] rounded-b-[16px]", borderColor, bgColor)}>
                상세보기
            </div>
        </div>
    );
}