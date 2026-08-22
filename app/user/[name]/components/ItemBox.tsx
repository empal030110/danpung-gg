import { itemProps } from "../../userProps/props";
import { cutOptionName } from "@/api/cutOptionName";
import { FaStar } from "react-icons/fa";
import Image from "next/image";

export default function ItemBox({item = [], android = false, title = false, specialRing}: {item: itemProps[]; android?: boolean; title?: boolean; specialRing?: itemProps;}) {
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
            <div className={`flex justify-start items-center gap-[8px] ${filterItem.potential_option_grade ? 'mb-[8px]' : 'h-full'}`}>
                <Image src={filterItem?.item_icon || ""} alt={filterItem?.item_name || ""} width={30} height={30} style={{width: "30px", height: "30px", objectFit: "contain"}} loading="lazy" />
                <div className="flex flex-col gap-[2px]">
                    {Number(filterItem?.starforce) > 0 && (<div className="flex gap-[2px] items-center text-[12px]"><FaStar size={12} color="oklch(85.2% 0.199 91.936)" />x{filterItem?.starforce}</div>)}
                    <p className="text-[14px]">
                        {filterItem.item_name}
                        {Number(filterItem.special_ring_level) > 0 && ` Lv.${filterItem.special_ring_level}`}
                    </p>
                    {specialRing && (filterItem.item_name === '컨티뉴어스 링' || filterItem.item_name === '리스트레인트 링') && (
                        <p className="text-[12px] text-neutral-500 dark:text-neutral-400">
                            {specialRing.item_name}
                            {Number(specialRing.special_ring_level) > 0 && ` Lv.${specialRing.special_ring_level}`}
                        </p>
                    )}
                </div>
            </div>
            {filterItem.potential_option_grade && (
                <div className="flex flex-wrap text-[12px] gap-[4px]">
                    <p>잠재</p>
                    {filterItem.potential_option_1 && (<p className={`${filterItem.potential_option_grade === '레전드리' ? 'text-green-400' : filterItem.potential_option_grade === '유니크' ? 'text-yellow-400' : filterItem.potential_option_grade === '에픽' ? 'text-purple-400' : 'text-blue-300'}`}>{cutOptionName(filterItem.potential_option_1)}</p>)}
                    {filterItem.potential_option_2 && (<p className={`${filterItem.potential_option_grade === '레전드리' ? 'text-green-400' : filterItem.potential_option_grade === '유니크' ? 'text-yellow-400' : filterItem.potential_option_grade === '에픽' ? 'text-purple-400' : 'text-blue-300'}`}>{cutOptionName(filterItem.potential_option_2)}</p>)}
                    {filterItem.potential_option_3 && (<p className={`${filterItem.potential_option_grade === '레전드리' ? 'text-green-400' : filterItem.potential_option_grade === '유니크' ? 'text-yellow-400' : filterItem.potential_option_grade === '에픽' ? 'text-purple-400' : 'text-blue-300'}`}>{cutOptionName(filterItem.potential_option_3)}</p>)}
                </div>
            )}
            {filterItem.additional_potential_option_grade && (
                <div className="flex flex-wrap text-[12px] gap-[4px] mt-[4px]">
                    <p>에디</p>
                    {filterItem.additional_potential_option_1 && (<p className={`${filterItem.additional_potential_option_grade === '레전드리' ? 'text-green-400' : filterItem.additional_potential_option_grade === '유니크' ? 'text-yellow-400' : filterItem.additional_potential_option_grade === '에픽' ? 'text-purple-400' : 'text-blue-300'}`}>{cutOptionName(filterItem.additional_potential_option_1)}</p>)}
                    {filterItem.additional_potential_option_2 && (<p className={`${filterItem.additional_potential_option_grade === '레전드리' ? 'text-green-400' : filterItem.additional_potential_option_grade === '유니크' ? 'text-yellow-400' : filterItem.additional_potential_option_grade === '에픽' ? 'text-purple-400' : 'text-blue-300'}`}>{cutOptionName(filterItem.additional_potential_option_2)}</p>)}
                    {filterItem.additional_potential_option_3 && (<p className={`${filterItem.additional_potential_option_grade === '레전드리' ? 'text-green-400' : filterItem.additional_potential_option_grade === '유니크' ? 'text-yellow-400' : filterItem.additional_potential_option_grade === '에픽' ? 'text-purple-400' : 'text-blue-300'}`}>{cutOptionName(filterItem.additional_potential_option_3)}</p>)}
                </div>
            )}
        </div>
    );
}