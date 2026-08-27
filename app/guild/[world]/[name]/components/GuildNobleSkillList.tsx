import Image from "next/image";
import { guildSkillProps } from "../../../guildProps/props";
import NotInfoText from "@/components/NotInfoText";

export default function GuildNobleSkillList({ skills = [] }: { skills?: guildSkillProps[] }) {
    if (!skills.length) return <NotInfoText>노블레스 스킬 정보가 없습니다.</NotInfoText>;

    return (
        <div className="w-full">
            <p className="font-bold mb-[12px]">노블레스 스킬</p>
            <div className="grid grid-cols-1 pc:grid-cols-4 gap-[8px]">
                {skills.map((skill) => (
                    <div key={skill.skill_name} className="flex flex-col items-center gap-[4px] border border-neutral-400 p-[12px] rounded-[8px] text-center">
                        <Image src={skill.skill_icon} alt={skill.skill_name} width={40} height={40} />
                        <p className="text-[12px] text-neutral-500 dark:text-neutral-400">Lv.{skill.skill_level}</p>
                        <p className="text-[13px] font-bold truncate w-full">{skill.skill_name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
