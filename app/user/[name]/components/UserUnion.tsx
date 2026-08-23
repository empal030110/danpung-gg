import { userUnionProps } from "../../userProps/props";

export default function UserUnion({ union }: { union: userUnionProps }) {
    return (
        <p className="w-full flex justify-center items-center text-[16px] font-bold text-center">
            {union.union_grade} | Lv.{union.union_level.toLocaleString()} | 아티팩트 Lv.{union.union_artifact_level}
        </p>
    );
}
