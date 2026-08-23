import { achievementRankProps } from "../../userProps/props";
import NotInfoText from "@/components/NotInfoText";

export default function UserAchievement({ achievement }: { achievement?: achievementRankProps }) {
    if (!achievement) return <NotInfoText center>업적 정보가 없습니다.</NotInfoText>;

    return (
        <p className="w-full text-center text-[16px] font-bold">
            {achievement.trophy_grade} {achievement.trophy_score.toLocaleString()}점 ({achievement.ranking.toLocaleString()}위)
        </p>
    );
}
