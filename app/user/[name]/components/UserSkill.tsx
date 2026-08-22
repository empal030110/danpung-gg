import Image from "next/image";
import { skillProps } from "../../userProps/props";
import NotInfoText from "@/components/NotInfoText";

export default function UserSkill({ skills = [], grade }: { skills?: skillProps[]; grade: string }) {
    if (!skills.length) return <NotInfoText>{grade} 스킬 정보가 없습니다.</NotInfoText>;

    return (
        <div className="w-full grid grid-cols-2 pc:grid-cols-4 gap-[8px]">
            {skills.map((skill) => (
                <div key={skill.skill_name} className="flex items-center gap-[8px] border border-neutral-400 p-[12px] rounded-[8px] min-w-0">
                    <Image src={skill.skill_icon} alt={skill.skill_name} width={40} height={40} className="shrink-0" />
                    <div className="text-[12px] min-w-0">
                        <p className="font-bold text-[14px] truncate">{skill.skill_name}</p>
                        <p className="text-neutral-500 dark:text-neutral-400">Lv.{skill.skill_level}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
