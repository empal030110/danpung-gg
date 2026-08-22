'use client';

import { useState } from "react";
import UserNavbar from "./UserNavbar";
import UserStat from "./UserSet";
import UserSymbol from "./UserSymbol";
import UserAbility from "./UserAbility";
import UserItem from "./UserItem";
import UserPet from "./UserPet";
import UserHyperStat from "./UserHyperStat";
import UserBasicStat from "./UserBasicStat";
import UserDetailStat from "./UserDetailStat";
import UserSkill from "./UserSkill";
import UserHexaStat from "./UserHexaStat";
import UserLinkSkill from "./UserLinkSkill";
import SidebarBox from "@/components/SidebarBox";
import { abilityProps, androidProps, hexaStatCoreProps, hyperStatEntryProps, itemProps, petProps, presetNumberProps, skillProps, symbolProps, titleProps, userSetProps, userStatProps } from "../../userProps/props";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface UserInfoTabsProps {
    userSetEffect: userSetProps[];
    arcaneSymbols: symbolProps[];
    authenticSymbols: symbolProps[];
    abilityPresetNumber: presetNumberProps;
    abilityPreset1: abilityProps;
    abilityPreset2: abilityProps;
    abilityPreset3: abilityProps;
    presetNumber: presetNumberProps;
    userItemPreset1: itemProps[];
    userItemPreset2: itemProps[];
    userItemPreset3: itemProps[];
    userAndroid: androidProps[];
    title: titleProps[];
    userPets: petProps[];
    hyperStatPresetNo: presetNumberProps;
    userHyperStatPreset1: hyperStatEntryProps[];
    userHyperStatPreset2: hyperStatEntryProps[];
    userHyperStatPreset3: hyperStatEntryProps[];
    userStat: userStatProps[];
    userSkills6: skillProps[];
    userSkills5: skillProps[];
    hexaStatCore1?: hexaStatCoreProps;
    hexaStatCore2?: hexaStatCoreProps;
    hexaStatCore3?: hexaStatCoreProps;
    userLinkSkillPreset1: skillProps[];
    userLinkSkillPreset2: skillProps[];
    userLinkSkillPreset3: skillProps[];
}

export default function UserItemTabs({
    userSetEffect,
    arcaneSymbols,
    authenticSymbols,
    abilityPresetNumber,
    abilityPreset1,
    abilityPreset2,
    abilityPreset3,
    presetNumber,
    userItemPreset1,
    userItemPreset2,
    userItemPreset3,
    userAndroid,
    title,
    userPets,
    hyperStatPresetNo,
    userHyperStatPreset1,
    userHyperStatPreset2,
    userHyperStatPreset3,
    userStat,
    userSkills6,
    userSkills5,
    hexaStatCore1,
    hexaStatCore2,
    hexaStatCore3,
    userLinkSkillPreset1,
    userLinkSkillPreset2,
    userLinkSkillPreset3,
}: UserInfoTabsProps) {
    const [activeTab, setActiveTab] = useState(0);
    const [showSkill6, setShowSkill6] = useState(true);
    const [showSkill5, setShowSkill5] = useState(false);

    return (
        <div className="w-full z-10">
            <UserNavbar tabs={['장비', '스탯', '스킬']} active={activeTab} onSelect={setActiveTab} />
            {activeTab === 0 ? (
                <div className="flex gap-[16px] flex-col pc:flex-row">
                    <div className="flex flex-col flex-auto gap-[16px] w-full pc:max-w-[320px]">
                        <SidebarBox className="px-[48px]">
                            <UserStat data={userSetEffect} />
                        </SidebarBox>
                        <SidebarBox className="px-[20px]">
                            <UserSymbol arcane={arcaneSymbols} authentic={authenticSymbols} />
                        </SidebarBox>
                        <SidebarBox className="px-[20px]">
                            <UserAbility presetNumber={abilityPresetNumber} preset1={abilityPreset1} preset2={abilityPreset2} preset3={abilityPreset3} />
                        </SidebarBox>
                    </div>
                    <div className="w-full flex flex-col gap-[16px]">
                        <div className="w-full bg-gray-200 rounded-[8px] dark:bg-neutral-800">
                            <UserItem presetNumber={presetNumber} preset1={userItemPreset1} preset2={userItemPreset2} preset3={userItemPreset3} android={userAndroid} title={title} />
                        </div>
                        <div className="w-full py-[16px] px-[20px] bg-gray-200 rounded-[8px] dark:bg-neutral-800">
                            <UserPet pets={userPets} />
                        </div>
                    </div>
                </div>
            ) : activeTab === 1 ? (
                <div className="flex gap-[16px] flex-col pc:flex-row">
                    <div className="w-full pc:max-w-[320px]">
                        <SidebarBox className="px-[20px] flex-col items-start">
                            <p className="font-bold mb-[8px]">하이퍼 스탯</p>
                            <UserHyperStat presetNumber={hyperStatPresetNo} preset1={userHyperStatPreset1} preset2={userHyperStatPreset2} preset3={userHyperStatPreset3} />
                        </SidebarBox>
                    </div>
                    <div className="w-full flex flex-col gap-[16px]">
                        <SidebarBox className="px-[20px] flex-col items-start">
                            <p className="font-bold mb-[8px]">기본 스탯</p>
                            <UserBasicStat stats={userStat} />
                        </SidebarBox>
                        <SidebarBox className="px-[20px] flex-col items-start">
                            <p className="font-bold mb-[8px]">상세 스탯</p>
                            <UserDetailStat stats={userStat} />
                        </SidebarBox>
                    </div>
                </div>
            ) : (
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
                        <button type="button" onClick={() => setShowSkill6((prev) => !prev)} className="w-full flex justify-between items-center mb-[24px] cursor-pointer">
                            <p className="font-bold">6차 스킬</p>
                            {showSkill6 ? <IoIosArrowUp size={24} /> : <IoIosArrowDown size={24} />}
                        </button>
                        {showSkill6 && <UserSkill skills={userSkills6} />}
                    </SidebarBox>
                    <SidebarBox className="px-[20px] flex-col items-start">
                        <button type="button" onClick={() => setShowSkill5((prev) => !prev)} className="w-full flex justify-between items-center mb-[24px] cursor-pointer">
                            <p className="font-bold">5차 스킬</p>
                            {showSkill5 ? <IoIosArrowUp size={24} /> : <IoIosArrowDown size={24} />}
                        </button>
                        {showSkill5 && <UserSkill skills={userSkills5} />}
                    </SidebarBox>
                    <SidebarBox className="px-[20px] flex-col items-start">
                        <UserLinkSkill preset1={userLinkSkillPreset1} preset2={userLinkSkillPreset2} preset3={userLinkSkillPreset3} />
                    </SidebarBox>
                </div>
            )}
        </div>
    );
}
