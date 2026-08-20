'use client';

import { useState } from "react";
import { hyperStatEntryProps, presetNumberProps } from "../../userProps/props";
import PresetTabs from "@/components/PresetTabs";

export default function UserHyperStat({ presetNumber = 0, preset1 = [], preset2 = [], preset3 = [] }: { presetNumber?: presetNumberProps; preset1?: hyperStatEntryProps[]; preset2?: hyperStatEntryProps[]; preset3?: hyperStatEntryProps[]; }) {
    const [selectedPreset, setSelectedPreset] = useState(presetNumber !== 0 ? presetNumber : 1);
    const currentPreset = selectedPreset === 1 ? preset1 : selectedPreset === 2 ? preset2 : preset3;

    return (
        <div className="w-full">
            <div className="flex flex-col gap-[6px] w-full">
                {currentPreset.map((stat) => (
                    <div key={stat.stat_type} className="flex justify-between text-[14px]">
                        <span>{stat.stat_type}</span>
                        <span className={stat.stat_level ? 'font-bold' : 'text-neutral-400 dark:text-neutral-500'}>
                            {stat.stat_level ? `Lv.${stat.stat_level}` : '-'}
                        </span>
                    </div>
                ))}
            <div className="mt-[12px]">
                <PresetTabs active={selectedPreset} onSelect={setSelectedPreset} fullWidth />
            </div>
            </div>
        </div>
    );
}
