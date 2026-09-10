"use client";

import UserHyperStat from "./UserHyperStat";
import UserBasicStat from "./UserBasicStat";
import UserDetailStat from "./UserDetailStat";
import SidebarBox from "@/components/SidebarBox";
import { hyperStatEntryProps, presetNumberProps, userStatProps } from "../../userProps/props";

interface UserStatPanelProps {
    hyperStatPresetNo: presetNumberProps;
    userHyperStatPreset1: hyperStatEntryProps[];
    userHyperStatPreset2: hyperStatEntryProps[];
    userHyperStatPreset3: hyperStatEntryProps[];
    userStat: userStatProps[];
}

export default function UserStatPanel({
    hyperStatPresetNo,
    userHyperStatPreset1,
    userHyperStatPreset2,
    userHyperStatPreset3,
    userStat,
}: UserStatPanelProps) {
    return (
        <div className="flex gap-[16px] flex-col pc:flex-row">
            <div className="w-full pc:max-w-[320px]">
                <SidebarBox className="px-[20px] flex-col items-start">
                    <p className="font-bold mb-[8px]">하이퍼 스탯</p>
                    <UserHyperStat
                        presetNumber={hyperStatPresetNo}
                        preset1={userHyperStatPreset1}
                        preset2={userHyperStatPreset2}
                        preset3={userHyperStatPreset3}
                    />
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
    );
}
