"use client";

import UserStat from "./UserSet";
import UserSymbol from "./UserSymbol";
import UserAbility from "./UserAbility";
import UserItem from "./UserItem";
import UserPet from "./UserPet";
import SidebarBox from "@/components/SidebarBox";
import NotInfoText from "@/components/NotInfoText";
import {
    abilityProps,
    androidProps,
    itemProps,
    petProps,
    presetNumberProps,
    symbolProps,
    titleProps,
    userSetProps,
} from "../../userProps/props";

interface UserEquipmentPanelProps {
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
}

export default function UserEquipmentPanel({
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
}: UserEquipmentPanelProps) {
    return (
        <div className="flex gap-[16px] flex-col pc:flex-row">
            <div className="flex flex-col flex-auto gap-[16px] w-full pc:max-w-[320px]">
                <SidebarBox className="px-[48px]">
                    <UserStat data={userSetEffect} />
                </SidebarBox>
                <SidebarBox className="px-[20px]">
                    <UserSymbol arcane={arcaneSymbols} authentic={authenticSymbols} />
                </SidebarBox>
                <SidebarBox className="px-[20px]">
                    <UserAbility
                        presetNumber={abilityPresetNumber}
                        preset1={abilityPreset1}
                        preset2={abilityPreset2}
                        preset3={abilityPreset3}
                    />
                </SidebarBox>
            </div>
            <div className="w-full flex flex-col gap-[16px]">
                <div className="w-full bg-gray-200 rounded-[8px] dark:bg-neutral-800">
                    <UserItem
                        presetNumber={presetNumber}
                        preset1={userItemPreset1}
                        preset2={userItemPreset2}
                        preset3={userItemPreset3}
                        android={userAndroid}
                        title={title}
                    />
                </div>
                <div className="w-full py-[16px] px-[20px] bg-gray-200 rounded-[8px] dark:bg-neutral-800">
                    {userPets.length > 0 ? (
                        <UserPet pets={userPets} />
                    ) : (
                        <NotInfoText>장착된 펫 정보가 없습니다.</NotInfoText>
                    )}
                </div>
            </div>
        </div>
    );
}
