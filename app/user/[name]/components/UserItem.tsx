import Image from "next/image";
import { itemProps } from "../../userProps/props";

export default function UserItem({ preset1, preset2, preset3}: { preset1: itemProps[]; preset2: itemProps[]; preset3: itemProps[]; }) {
    return (
        <div>
            {preset1.map((item) => (
                <div key={item.item_name} className="p-[6px]">
                        {(item.item_icon && item.item_name) && (
                            <div className="flex items-center justify-start gap-[8px]">
                                <Image src={item.item_icon} alt={item.item_name} width={40} height={40} />
                                <div>
                                    {Number(item.starforce) > 0 && (<p className="bg-yellow-400 text-[#b47227] rounded-[8px] w-max py-[2px] px-[8px] text-[12px]">{item.starforce}성</p>)}
                                    <p className="text-[14px]">{item.item_name}</p>
                                </div>
                            </div>
                        )}
                </div>
            ))}
        </div>
    );
}