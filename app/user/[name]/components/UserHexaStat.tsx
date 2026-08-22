import { hexaStatCoreProps } from "../../userProps/props";

export default function UserHexaStat({ core }: { core?: hexaStatCoreProps }) {
    const rows = [
        { name: core?.main_stat_name, level: core?.main_stat_level },
        { name: core?.sub_stat_name_1, level: core?.sub_stat_level_1 },
        { name: core?.sub_stat_name_2, level: core?.sub_stat_level_2 },
    ];

    return (
        <div className="w-full flex flex-col gap-[8px] text-[14px]">
            {rows.map((row, index) => (
                row.name ? (
                    <p className={`w-full py-[4px] px-[10px] rounded-[6px] bg-neutral-300 dark:bg-neutral-400 ${index == 0 ? 'font-bold' : ''}`} key={index}>Lv.{row.level} {row.name}</p>
                ) : (
                    <p key={index} className="text-neutral-500 dark:text-neutral-400">-</p>
                )
            ))}
        </div>
    );
}
