import { userUnionProps } from "../../userProps/props";

export default function UserUnion({ union }: { union: userUnionProps }) {
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
