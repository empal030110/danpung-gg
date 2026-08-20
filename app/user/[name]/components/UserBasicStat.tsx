import { userStatProps } from "../../userProps/props";
import formatStatValue from "@/api/formatStatValue";

// 2열 그리드에 노출할 순서 (null이면 빈 칸)
const cells: (string | null)[] = ['HP', 'MP', 'STR', 'DEX', 'INT', 'LUK'];

export default function UserBasicStat({ stats = [] }: { stats?: userStatProps[] }) {
    const statMap = Object.fromEntries(stats.map((stat) => [stat.stat_name, stat.stat_value]));

    return (
        <div className="grid pc:grid-cols-2 gap-x-[16px] gap-y-[6px] w-full text-[14px]">
            {cells.map((label, index) => (
                label ? (
                    <div key={label} className="flex justify-between">
                        <span className="text-neutral-500 dark:text-neutral-400">{label}</span>
                        <span className="font-bold">{formatStatValue(statMap[label])}</span>
                    </div>
                ) : (
                    <div key={`empty-${index}`} />
                )
            ))}
        </div>
    );
}
