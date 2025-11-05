import { itemProps } from "../../userProps/props";
import Image from "next/image";

export default function ItemBox({item = [], android = false, title = false}: {item: itemProps[]; android?: boolean; title?: boolean;}) {
    if (!android && !title && (!item || item.length) === 0) return null; // 아이템 정보가 없으면 노출 X
    const filterItem = item[0];
    
    if (android && !filterItem.android_name) return null; // 안드로이드 정보가 없으면 노출 X
    if (title && !filterItem.title_name) return null; // 칭호 정보가 없으면 노출 X

    // 안드로이드
    if (android) {
        return (
            <div className="border border-neutral-400 p-[12px] rounded-[8px] mb-[8px]">
                <div className="flex justify-start items-center gap-[8px] h-full">
                    <Image src={filterItem?.android_icon || ""} alt={filterItem?.android_name || ""} width={30} height={30} loading="lazy" />
                    <p className="text-[14px]">{filterItem.android_name}</p>
                </div>
            </div>
        )
    }

    // 칭호 (title)
    if (title) {
        return (
            <div className="border border-neutral-400 p-[12px] rounded-[8px] mb-[8px]">
                <div className="flex justify-start items-center gap-[8px] h-full">
                    <Image src={filterItem?.title_icon || ""} alt={filterItem?.title_name || ""} width={30} height={30} loading="lazy" />
                    <p className="text-[14px]">{filterItem.title_name}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="border border-neutral-400 p-[12px] rounded-[8px] mb-[8px]">
            <div className="flex justify-start items-center gap-[8px] h-full">
                <Image src={filterItem?.item_icon || ""} alt={filterItem?.item_name || ""} width={30} height={30} loading="lazy" />
                <p className="text-[14px]">{filterItem.item_name}</p>
            </div>
        </div>
    );
}