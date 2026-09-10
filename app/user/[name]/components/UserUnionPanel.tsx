"use client";

import UserUnion from "./UserUnion";
import UserUnionChampion from "./UserUnionChampion";
import UserUnionRaider from "./UserUnionRaider";
import UserUnionStateStat from "./UserUnionStateStat";
import SidebarBox from "@/components/SidebarBox";
import {
    unionArtifactEffectProps,
    unionChampionProps,
    unionStateStatPresetProps,
    userUnionProps,
} from "../../userProps/props";

interface UserUnionPanelProps {
    userUnion?: userUnionProps;
    userUnionChampions: unionChampionProps[];
    userUnionChampionBadgeEffects: string[];
    userUnionArtifactEffects: unionArtifactEffectProps[];
    userUnionRaiderStats: string[];
    unionStateStatPresetNo: number;
    unionStateStatPresets: unionStateStatPresetProps[];
}

export default function UserUnionPanel({
    userUnion,
    userUnionChampions,
    userUnionChampionBadgeEffects,
    userUnionArtifactEffects,
    userUnionRaiderStats,
    unionStateStatPresetNo,
    unionStateStatPresets,
}: UserUnionPanelProps) {
    return (
        <div className="w-full flex flex-col gap-[16px]">
            <SidebarBox className="px-[20px] flex-col items-start">
                <UserUnion union={userUnion} />
            </SidebarBox>
            <SidebarBox className="px-[20px] flex-col items-start">
                <UserUnionChampion
                    champions={userUnionChampions}
                    badgeEffects={userUnionChampionBadgeEffects}
                    artifactEffects={userUnionArtifactEffects}
                />
            </SidebarBox>
            <SidebarBox className="px-[20px] flex-col items-start">
                <UserUnionStateStat presetNumber={unionStateStatPresetNo} presets={unionStateStatPresets} />
            </SidebarBox>
            <SidebarBox className="px-[20px] flex-col items-start">
                <UserUnionRaider raiderStats={userUnionRaiderStats} />
            </SidebarBox>
        </div>
    );
}
