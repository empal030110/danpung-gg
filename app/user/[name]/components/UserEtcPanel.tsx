"use client";

import UserAchievement from "./UserAchievement";
import UserDojang from "./UserDojang";
import SidebarBox from "@/components/SidebarBox";
import { achievementRankProps, dojangRankProps } from "../../userProps/props";

interface UserEtcPanelProps {
    userAchievement?: achievementRankProps;
    userDojang?: dojangRankProps;
}

export default function UserEtcPanel({ userAchievement, userDojang }: UserEtcPanelProps) {
    return (
        <div className="w-full flex flex-col gap-[16px]">
            <SidebarBox className="px-[20px] flex-col items-start">
                <p className="w-full font-bold mb-[8px] text-center">업적</p>
                <UserAchievement achievement={userAchievement} />
            </SidebarBox>
            <SidebarBox className="px-[20px] flex-col items-start">
                <p className="w-full font-bold mb-[8px] text-center">무릉도장</p>
                <UserDojang dojang={userDojang} />
            </SidebarBox>
        </div>
    );
}
