'use client';

import { useState } from "react";
import { cashItemProps, presetNumberProps } from "../../userProps/props";
import PresetTabs from "@/components/PresetTabs";
import { CodiGrid } from "./UserCodi";

export default function UserCodiPreset({ presetNumber = 0, preset1 = [], preset2 = [], preset3 = [] }: { presetNumber?: presetNumberProps; preset1?: cashItemProps[]; preset2?: cashItemProps[]; preset3?: cashItemProps[]; }) {
    const [selectedPreset, setSelectedPreset] = useState(presetNumber !== 0 ? presetNumber : 1);
    const currentPreset = selectedPreset === 1 ? preset1 : selectedPreset === 2 ? preset2 : preset3;

    return (
        <div className="w-full">
            <div className="w-full flex justify-between items-center mb-[24px]">
                <p className="font-bold">코디 프리셋</p>
                <PresetTabs active={selectedPreset} onSelect={setSelectedPreset} labelPrefix="프리셋 " />
            </div>
            <CodiGrid items={currentPreset} />
        </div>
    );
}
