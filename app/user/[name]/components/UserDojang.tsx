import { dojangRankProps } from "../../userProps/props";
import NotInfoText from "@/components/NotInfoText";

export default function UserDojang({ dojang }: { dojang?: dojangRankProps }) {
    if (!dojang) return <NotInfoText center>무릉도장 정보가 없습니다.</NotInfoText>;

    const minutes = Math.floor(dojang.dojang_time_record / 60);
    const seconds = dojang.dojang_time_record % 60;

    return (
        <div className="w-full text-center text-[16px] font-bold">
            <p>{dojang.dojang_floor}층 ({minutes}분 {seconds}초)</p>
            <p>({dojang.ranking.toLocaleString()}등)</p>
        </div>
    );
}
