'use client';

import { useState } from "react";
import Image from "next/image";
import { presetNumberProps, skillProps } from "../../userProps/props";
import PresetTabs from "@/components/PresetTabs";
import NotInfoText from "@/components/NotInfoText";

export default function UserLinkSkill({ presetNumber = 0, preset1 = [], preset2 = [], preset3 = [] }: { presetNumber?: presetNumberProps; preset1?: skillProps[]; preset2?: skillProps[]; preset3?: skillProps[]; }) {
    const [selectedPreset, setSelectedPreset] = useState(presetNumber !== 0 ? presetNumber : 1);
    const currentPreset = selectedPreset === 1 ? preset1 : selectedPreset === 2 ? preset2 : preset3;

    return (
        <div className="w-full">
            <div className="w-full flex flex-col items-start pc:flex-row pc:justify-between pc:items-center mb-[24px]">
                <p className="font-bold mb-[12px] pc:mb-0">링크 스킬</p>
                <PresetTabs active={selectedPreset} onSelect={setSelectedPreset} labelPrefix="프리셋 " />
            </div>
            {currentPreset.length > 0 ? (
                <div className="grid grid-cols-4 pc:grid-cols-6 gap-[8px]">
                    {currentPreset.map((skill) => (
                        <div key={skill.skill_name} className="flex flex-col items-center gap-[4px]">
                            <Image src={skill.skill_icon} alt={skill.skill_name} width={40} height={40} />
                            <p className="text-[12px]">Lv.{skill.skill_level}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <NotInfoText>링크 스킬 정보가 없습니다.</NotInfoText>
            )}
        </div>
    );
}
