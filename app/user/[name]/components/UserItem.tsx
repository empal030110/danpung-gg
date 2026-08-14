'use client';

import { useState } from "react";
import { androidProps, itemProps, presetNumberProps, titleProps } from "../../userProps/props";
import { filterItem } from "../utils/filterItem";
import ItemBox from "./ItemBox";

export default function UserItem({ presetNumber = 0, preset1 = [], preset2 = [], preset3 = [], android = [], title = []}: { presetNumber?: presetNumberProps; preset1?: itemProps[]; preset2?: itemProps[]; preset3?: itemProps[]; android?: androidProps[]; title?: titleProps[]; }) {
    const [selectedPreset, setSelectedPreset] = useState(presetNumber !== 0 ? presetNumber : 1); // presetNumber가 없으면 1번을 기본으로
    const currentPreset = selectedPreset === 1 ? preset1 : selectedPreset === 2 ? preset2 : preset3;
    const specialRing = currentPreset.find(
        (item) =>
            item.item_equipment_slot === '예비 특수 반지' &&
            (item.item_name === '컨티뉴어스 링' || item.item_name === '리스트레인트 링')
    );

    return (
        <div>
            <div className="flex items-center justify-end gap-[8px] m-[12px]">
                {[1, 2, 3].map((num) => (
                    <button key={num} onClick={() => setSelectedPreset(num)} className={`text-[14px] px-[10px] py-[4px] rounded-[6px] font-semibold cursor-pointer border ${selectedPreset === num ? "bg-neutral-800 text-white" : "bg-neutral-200 text-black"}`}>
                        프리셋 {num}
                    </button>
                ))}
            </div>
            <div className="px-[16px]">
                {(currentPreset && currentPreset.length) && (
                    <div>
                        {/* 무보엠 */}
                        <div className="pc:grid pc:grid-cols-2 pc:gap-x-[8px]">
                            <ItemBox item={filterItem(currentPreset, "무기")} />
                            <ItemBox item={filterItem(currentPreset, "보조무기")} />
                            <ItemBox item={filterItem(currentPreset, "엠블렘")} />
                        </div>
                        {/* 방어구 */}
                        <div className="pc:grid pc:grid-cols-2 pc:gap-x-[8px]">
                            <ItemBox item={filterItem(currentPreset, "모자")} />
                            <ItemBox item={filterItem(currentPreset, "상의")} />
                            <ItemBox item={filterItem(currentPreset, "하의")} />
                            <ItemBox item={filterItem(currentPreset, "어깨장식")} />
                            <ItemBox item={filterItem(currentPreset, "망토")} />
                            <ItemBox item={filterItem(currentPreset, "장갑")} />
                            <ItemBox item={filterItem(currentPreset, "신발")} />
                        </div>
                        {/* 장신구 */}
                        <div className="pc:grid pc:grid-cols-2 pc:gap-x-[8px]">
                            <ItemBox item={filterItem(currentPreset, "펜던트")} />
                            <ItemBox item={filterItem(currentPreset, "펜던트2")} />
                            <ItemBox item={filterItem(currentPreset, "얼굴장식")} />
                            <ItemBox item={filterItem(currentPreset, "눈장식")} />
                            <ItemBox item={filterItem(currentPreset, "귀고리")} />
                            <ItemBox item={filterItem(currentPreset, "벨트")} />
                            <ItemBox item={filterItem(currentPreset, "반지1")} specialRing={specialRing} />
                            <ItemBox item={filterItem(currentPreset, "반지2")} specialRing={specialRing} />
                            <ItemBox item={filterItem(currentPreset, "반지3")} specialRing={specialRing} />
                            <ItemBox item={filterItem(currentPreset, "반지4")} specialRing={specialRing} />
                            <ItemBox item={filterItem(currentPreset, "기계 심장")} />
                            <ItemBox item={filterItem(android, "안드로이드")} android={true} />
                            <ItemBox item={filterItem(currentPreset, "포켓 아이템")} />
                            <ItemBox item={filterItem(title, "칭호")} title={true} />
                            <ItemBox item={filterItem(currentPreset, "훈장")} />
                            <ItemBox item={filterItem(currentPreset, "뱃지")} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}