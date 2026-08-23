import { unionArtifactEffectProps, unionChampionProps } from "../../userProps/props";

export default function UserUnionChampion({ champions = [], badgeEffects = [], artifactEffects = [] }: { champions?: unionChampionProps[]; badgeEffects?: string[]; artifactEffects?: unionArtifactEffectProps[] }) {
    return (
        <div className="w-full flex flex-col pc:flex-row gap-[24px]">
            <div className="flex flex-col gap-[12px]">
                {champions.map((champion) => (
                    <div key={champion.champion_slot}>
                        <div className="flex items-center font-bold"><span>{champion.champion_name}</span><span className="mx-[6px]">|</span><span>{champion.champion_grade} 등급</span></div>
                        <p className="text-[14px] text-neutral-500 dark:text-neutral-400">{champion.champion_class}</p>
                    </div>
                ))}
            </div>
            <div>
                <p className="font-bold mb-[8px]">유니온 챔피언 휘장 효과</p>
                <ul className="flex flex-col gap-[4px] text-[14px] list-disc pl-[16px]">
                    {badgeEffects.map((effect, idx) => (
                        <li key={idx}>{effect}</li>
                    ))}
                </ul>
            </div>
            <div>
                <p className="font-bold mb-[8px]">아티팩트 효과</p>
                <ul className="flex flex-col gap-[4px] text-[14px] list-disc pl-[16px]">
                    {artifactEffects.map((effect, idx) => (
                        <li key={idx}>Lv.{effect.level} {effect.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
