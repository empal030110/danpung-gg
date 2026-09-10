"use client";

import UserCodi from "./UserCodi";
import UserCodiPreset from "./UserCodiPreset";
import SidebarBox from "@/components/SidebarBox";
import { cashItemProps, presetNumberProps } from "../../userProps/props";

interface UserCodiPanelProps {
    userCodiItems: cashItemProps[];
    codiPresetNo: presetNumberProps;
    userCodiPreset1: cashItemProps[];
    userCodiPreset2: cashItemProps[];
    userCodiPreset3: cashItemProps[];
}

export default function UserCodiPanel({
    userCodiItems,
    codiPresetNo,
    userCodiPreset1,
    userCodiPreset2,
    userCodiPreset3,
}: UserCodiPanelProps) {
    return (
        <div className="w-full flex flex-col gap-[16px]">
            <SidebarBox className="px-[20px] flex-col items-start">
                <p className="font-bold mb-[8px]">기본 코디</p>
                <UserCodi items={userCodiItems} />
            </SidebarBox>
            <SidebarBox className="px-[20px] flex-col items-start">
                <UserCodiPreset
                    presetNumber={codiPresetNo}
                    preset1={userCodiPreset1}
                    preset2={userCodiPreset2}
                    preset3={userCodiPreset3}
                />
            </SidebarBox>
        </div>
    );
}
