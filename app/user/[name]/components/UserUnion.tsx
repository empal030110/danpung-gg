import { userUnionProps } from "../../userProps/props";
import NotInfoText from "@/components/NotInfoText";

export default function UserUnion({ union }: { union?: userUnionProps }) {
    if (!union) return <NotInfoText center>유니온 정보를 확인할 수 없습니다.</NotInfoText>;

    return (
        <>
            <p className="w-full hidden justify-center items-center text-[16px] font-bold text-center pc:flex">
                {union.union_grade} | Lv.{union.union_level.toLocaleString()} | 아티팩트 Lv.{union.union_artifact_level}
            </p>
            <div className="w-full flex flex-col justify-center items-center gap-[6px] text-[16px] font-bold pc:hidden">
                <p>{union.union_grade}</p>
                <p>Lv.{union.union_level.toLocaleString()}</p>
                <p>아티팩트 Lv.{union.union_artifact_level}</p>
            </div>
        </>
    );
}
