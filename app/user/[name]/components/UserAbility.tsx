'use client';

import { useState } from "react";
import { abilityProps } from "../../userProps/props";

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

export default function UserAbility({
    preset1,
    preset2,
    preset3,
}: {
    preset1: abilityProps;
    preset2: abilityProps;
    preset3: abilityProps;
}) {
    const [selectedPreset, setSelectedPreset] = useState<abilityProps>(preset1);

    const currentData = selectedPreset.ability_info;

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
            <div className="flex items-center justify-center gap-[8px] mb-[12px]">
                {[1, 2, 3].map((num) => (
                    <button key={num} onClick={() => setSelectedPreset(num === 1 ? preset1 : num === 2 ? preset2 : preset3)} className={`text-[14px] px-[10px] py-[4px] rounded-[6px] font-semibold border ${selectedPreset === (num === 1 ? preset1 : num === 2 ? preset2 : preset3) ? "bg-neutral-800 text-white" : "bg-neutral-200 text-black"}`}>
                        {num}
                    </button>
                ))}
            </div>
        </div>
    );
}
