"use client";

import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import UserHexaStat from "./UserHexaStat";
import UserSkill from "./UserSkill";
import UserLinkSkill from "./UserLinkSkill";
import SidebarBox from "@/components/SidebarBox";
import { hexaStatCoreProps, presetNumberProps, skillProps } from "../../userProps/props";

interface UserSkillPanelProps {
    userSkills6: skillProps[];
    userSkills5: skillProps[];
    hexaStatCore1?: hexaStatCoreProps;
    hexaStatCore2?: hexaStatCoreProps;
    hexaStatCore3?: hexaStatCoreProps;
    linkSkillPresetNo: presetNumberProps;
    userLinkSkillPreset1: skillProps[];
    userLinkSkillPreset2: skillProps[];
    userLinkSkillPreset3: skillProps[];
}

export default function UserSkillPanel({
    userSkills6,
    userSkills5,
    hexaStatCore1,
    hexaStatCore2,
    hexaStatCore3,
    linkSkillPresetNo,
    userLinkSkillPreset1,
    userLinkSkillPreset2,
    userLinkSkillPreset3,
}: UserSkillPanelProps) {
    const [showSkill6, setShowSkill6] = useState(true);
    const [showSkill5, setShowSkill5] = useState(false);

    return (
        <div className="w-full flex flex-col gap-[16px]">
            <SidebarBox className="px-[20px] flex-col items-start">
                <p className="font-bold mb-[24px]">헥사 스탯</p>

                <div className="w-full flex flex-col pc:flex-row pc:justify-between gap-[16px]">
                    <div className="w-full">
                        <p className="text-[14px] mb-[6px] font-bold">HEXA STAT I</p>
                        <UserHexaStat core={hexaStatCore1} />
                    </div>
                    <div className="w-full">
                        <p className="text-[14px] mb-[6px] font-bold">HEXA STAT II</p>
                        <UserHexaStat core={hexaStatCore2} />
                    </div>
                    <div className="w-full">
                        <p className="text-[14px] mb-[6px] font-bold">HEXA STAT III</p>
                        <UserHexaStat core={hexaStatCore3} />
                    </div>
                </div>
            </SidebarBox>
            <SidebarBox className="px-[20px] flex-col items-start">
                <button
                    type="button"
                    onClick={() => setShowSkill6((prev) => !prev)}
                    className="w-full flex justify-between items-center mb-[24px] cursor-pointer"
                >
                    <p className="font-bold">6차 스킬</p>
                    {showSkill6 ? <IoIosArrowUp size={24} /> : <IoIosArrowDown size={24} />}
                </button>
                {showSkill6 && <UserSkill skills={userSkills6} grade="6차" />}
            </SidebarBox>
            <SidebarBox className="px-[20px] flex-col items-start">
                <button
                    type="button"
                    onClick={() => setShowSkill5((prev) => !prev)}
                    className="w-full flex justify-between items-center mb-[24px] cursor-pointer"
                >
                    <p className="font-bold">5차 스킬</p>
                    {showSkill5 ? <IoIosArrowUp size={24} /> : <IoIosArrowDown size={24} />}
                </button>
                {showSkill5 && <UserSkill skills={userSkills5} grade="5차" />}
            </SidebarBox>
            <SidebarBox className="px-[20px] flex-col items-start">
                <UserLinkSkill
                    presetNumber={linkSkillPresetNo}
                    preset1={userLinkSkillPreset1}
                    preset2={userLinkSkillPreset2}
                    preset3={userLinkSkillPreset3}
                />
            </SidebarBox>
        </div>
    );
}
