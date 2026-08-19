'use client';

import { useState } from "react";
import { abilityProps, presetNumberProps } from "../../userProps/props";
import PresetTabs from "@/components/PresetTabs";

function getAbilityGradeColor(grade: string) {
    switch (grade) {
        case "레전드리":
            return "bg-green-400";
        case "유니크":
            return "bg-yellow-400";
        case "에픽":
            return "bg-purple-400";
        default:
            return "bg-blue-300";
    }
}

export default function UserAbility({ presetNumber = 0, preset1, preset2, preset3}: { presetNumber?: presetNumberProps; preset1: abilityProps; preset2: abilityProps; preset3: abilityProps; }) {
    const initialPreset = presetNumber === 2 ? preset2 : presetNumber === 3 ? preset3 : preset1; // presetNumber가 없으먼 1이면 1번을 기본으로
    const [selectedPreset, setSelectedPreset] = useState<abilityProps>(initialPreset);

    const currentData = selectedPreset.ability_info;
    const activePresetNum = selectedPreset === preset1 ? 1 : selectedPreset === preset2 ? 2 : 3;
    const selectPreset = (num: number) => setSelectedPreset(num === 1 ? preset1 : num === 2 ? preset2 : preset3);

    return (
        <div className="w-full">
            <p className="text-center font-bold mb-[8px]">어빌리티</p>
            <div className="text-center flex flex-col items-center justify-center gap-[6px] mb-[16px] max-w-[420px] m-auto">
                {currentData.map((item) => (
                    <div key={item.ability_no} className={`w-full text-[12px] ${getAbilityGradeColor(item.ability_grade)} p-[4px] rounded-[6px] text-black`}>
                        {item.ability_value}
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-center mb-[12px]">
                <PresetTabs active={activePresetNum} onSelect={selectPreset} fullWidth />
            </div>
        </div>
    );
}
