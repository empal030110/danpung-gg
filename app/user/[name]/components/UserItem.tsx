"use client";

import { useState } from "react";
import { androidProps, itemProps, presetNumberProps, titleProps } from "../../userProps/props";
import { filterItem } from "../utils/filterItem";
import ItemBox from "./ItemBox";
import PresetTabs from "@/components/PresetTabs";
import { EQUIPMENT_SLOT, SPECIAL_RING_NAMES } from "@/lib/constants";

export default function UserItem({
    presetNumber = 0,
    preset1 = [],
    preset2 = [],
    preset3 = [],
    android = [],
    title = [],
}: {
    presetNumber?: presetNumberProps;
    preset1?: itemProps[];
    preset2?: itemProps[];
    preset3?: itemProps[];
    android?: androidProps[];
    title?: titleProps[];
}) {
    const [selectedPreset, setSelectedPreset] = useState(presetNumber !== 0 ? presetNumber : 1); // presetNumber가 없으면 1번을 기본으로
    const currentPreset = [preset1, preset2, preset3][selectedPreset - 1];
    const specialRing = currentPreset.find(
        (item) =>
            item.item_equipment_slot === EQUIPMENT_SLOT.SPARE_SPECIAL_RING &&
            SPECIAL_RING_NAMES.some((name) => name === item.item_name),
    );

    return (
        <div>
            <div className="flex items-center justify-end m-[12px]">
                <PresetTabs active={selectedPreset} onSelect={setSelectedPreset} labelPrefix="프리셋 " />
            </div>
            <div className="px-[16px]">
                {currentPreset && currentPreset.length && (
                    <div>
                        {/* 무보엠 */}
                        <div className="pc:grid pc:grid-cols-2 pc:gap-x-[8px]">
                            <ItemBox item={filterItem(currentPreset, EQUIPMENT_SLOT.WEAPON)} />
                            <ItemBox item={filterItem(currentPreset, EQUIPMENT_SLOT.SUB_WEAPON)} />
                            <ItemBox item={filterItem(currentPreset, EQUIPMENT_SLOT.EMBLEM)} />
                        </div>
                        {/* 방어구 */}
                        <div className="pc:grid pc:grid-cols-2 pc:gap-x-[8px]">
                            <ItemBox item={filterItem(currentPreset, EQUIPMENT_SLOT.HAT)} />
                            <ItemBox item={filterItem(currentPreset, EQUIPMENT_SLOT.TOP)} />
                            <ItemBox item={filterItem(currentPreset, EQUIPMENT_SLOT.BOTTOM)} />
                            <ItemBox item={filterItem(currentPreset, EQUIPMENT_SLOT.SHOULDER)} />
                            <ItemBox item={filterItem(currentPreset, EQUIPMENT_SLOT.CAPE)} />
                            <ItemBox item={filterItem(currentPreset, EQUIPMENT_SLOT.GLOVE)} />
                            <ItemBox item={filterItem(currentPreset, EQUIPMENT_SLOT.SHOES)} />
                        </div>
                        {/* 장신구 */}
                        <div className="pc:grid pc:grid-cols-2 pc:gap-x-[8px]">
                            <ItemBox item={filterItem(currentPreset, EQUIPMENT_SLOT.PENDANT)} />
                            <ItemBox item={filterItem(currentPreset, EQUIPMENT_SLOT.PENDANT2)} />
                            <ItemBox item={filterItem(currentPreset, EQUIPMENT_SLOT.FACE_ACCESSORY)} />
                            <ItemBox item={filterItem(currentPreset, EQUIPMENT_SLOT.EYE_ACCESSORY)} />
                            <ItemBox item={filterItem(currentPreset, EQUIPMENT_SLOT.EARRING)} />
                            <ItemBox item={filterItem(currentPreset, EQUIPMENT_SLOT.BELT)} />
                            <ItemBox item={filterItem(currentPreset, EQUIPMENT_SLOT.RING1)} specialRing={specialRing} />
                            <ItemBox item={filterItem(currentPreset, EQUIPMENT_SLOT.RING2)} specialRing={specialRing} />
                            <ItemBox item={filterItem(currentPreset, EQUIPMENT_SLOT.RING3)} specialRing={specialRing} />
                            <ItemBox item={filterItem(currentPreset, EQUIPMENT_SLOT.RING4)} specialRing={specialRing} />
                            <ItemBox item={filterItem(currentPreset, EQUIPMENT_SLOT.MACHINE_HEART)} />
                            <ItemBox item={filterItem(android, EQUIPMENT_SLOT.ANDROID)} android={true} />
                            <ItemBox item={filterItem(currentPreset, EQUIPMENT_SLOT.POCKET_ITEM)} />
                            <ItemBox item={filterItem(title, EQUIPMENT_SLOT.TITLE)} title={true} />
                            <ItemBox item={filterItem(currentPreset, EQUIPMENT_SLOT.MEDAL)} />
                            <ItemBox item={filterItem(currentPreset, EQUIPMENT_SLOT.BADGE)} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
