'use client';

import { useEffect } from "react";
import Image from "next/image";
import { FaStar, FaTimes } from "react-icons/fa";
import { itemOptionProps, itemProps } from "../../userProps/props";
import { cutOptionName } from "@/lib/cutOptionName";
import { gradeColor, gradeBorderColor } from "@/lib/gradeColor";
import { formatExpireDate } from "@/lib/formatExpireDate";

interface StatRowDef {
    key: keyof itemOptionProps;
    label: string;
    percent?: boolean;
}

// 표시 순서 고정 - item_total_option이 0이거나 없는 스탯은 렌더링 시 자동 생략
const STAT_ROWS: StatRowDef[] = [
    { key: "str", label: "STR" },
    { key: "dex", label: "DEX" },
    { key: "int", label: "INT" },
    { key: "luk", label: "LUK" },
    { key: "max_hp", label: "HP" },
    { key: "max_mp", label: "MP" },
    { key: "attack_power", label: "공격력" },
    { key: "magic_power", label: "마력" },
    { key: "armor", label: "방어력" },
    { key: "speed", label: "이동속도", percent: true },
    { key: "jump", label: "점프력", percent: true },
    { key: "boss_damage", label: "보스 몬스터 데미지", percent: true },
    { key: "ignore_monster_armor", label: "방어력 무시", percent: true },
    { key: "all_stat", label: "올스탯", percent: true },
    { key: "damage", label: "데미지", percent: true },
];

function StatLine({ row, item }: { row: StatRowDef; item: itemProps }) {
    const total = Number(item.item_total_option?.[row.key] ?? 0);
    if (!total) return null;

    const base = Number(item.item_base_option?.[row.key] ?? 0);
    const add = Number(item.item_add_option?.[row.key] ?? 0);
    const etc = Number(item.item_etc_option?.[row.key] ?? 0);
    const starforce = Number(item.item_starforce_option?.[row.key] ?? 0);
    const suffix = row.percent ? "%" : "";
    const showBreakdown = add !== 0 || etc !== 0 || starforce !== 0;

    return (
        <p className="text-[13px]">
            {row.label} : <span className="text-cyan-300 font-semibold">+{total.toLocaleString()}{suffix}</span>
            {showBreakdown && (
                <span className="text-neutral-400 ml-[4px]">
                    (<span className="text-black dark:text-white">{base.toLocaleString()}{suffix}</span>
                    {add !== 0 && <> <span className="text-green-400">+{add.toLocaleString()}{suffix}</span></>}
                    {etc !== 0 && <> <span className="text-purple-400">+{etc.toLocaleString()}{suffix}</span></>}
                    {starforce !== 0 && <> <span className="text-yellow-400">+{starforce.toLocaleString()}{suffix}</span></>}
                    )
                </span>
            )}
        </p>
    );
}

function StarRows({ current, max = 30 }: { current: number; max?: number }) {
    const rowCounts = [Math.min(max, 15), Math.max(max - 15, 0)];
    let starIndex = 0;

    return (
        <div className="flex flex-col items-center gap-[4px]">
            {rowCounts.map((rowCount, rowIdx) => {
                if (rowCount <= 0) return null;
                const groupCount = Math.ceil(rowCount / 5);
                return (
                    <div key={rowIdx} className="flex gap-[8px]">
                        {Array.from({ length: groupCount }, (_, groupIdx) => {
                            const count = Math.min(5, rowCount - groupIdx * 5);
                            return (
                                <div key={groupIdx} className="flex gap-[2px]">
                                    {Array.from({ length: count }, () => {
                                        const filled = starIndex < current;
                                        const star = <FaStar key={starIndex} size={14} className={filled ? "text-yellow-400" : "text-neutral-700"} />;
                                        starIndex += 1;
                                        return star;
                                    })}
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}

function ExceptionalSection({ option }: { option?: itemOptionProps }) {
    if (!option || Number(option.exceptional_upgrade ?? 0) === 0) return null;

    return (
        <div>
            <div className="flex items-center gap-[6px] mb-[4px]">
                <p className="text-[13px] font-bold text-red-500">익셉셔널 강화</p>
            </div>
            <div className="flex flex-col gap-[2px]">
                <p className="text-[13px]">올스탯 : +{Number(option.str ?? 0).toLocaleString()}</p>
                <p className="text-[13px]">HP / MP : +{Number(option.max_hp ?? 0).toLocaleString()}</p>
                <p className="text-[13px]">공격력 / 마력 : +{Number(option.attack_power ?? 0).toLocaleString()}</p>
            </div>
        </div>
    );
}

function SoulSection({ name, option }: { name?: string; option?: string }) {
    if (!name && !option) return null;

    return (
        <div>
            <p className="text-[13px] font-bold text-sky-400 mb-[4px]">소울</p>
            <div className="flex flex-col gap-[2px]">
                {name && <p className="text-[13px] text-neutral-500 dark:text-neutral-400">{name}</p>}
                {option && <p className="text-[13px] text-sky-400">{option}</p>}
            </div>
        </div>
    );
}

function PotentialSection({ label, grade, options }: { label: string; grade?: string; options: (string | undefined)[] }) {
    if (!grade) return null;
    const filled = options.filter(Boolean);
    if (filled.length === 0) return null;

    return (
        <div>
            <p className={`text-[13px] font-bold mb-[4px] ${gradeColor(grade)}`}>{label} ({grade})</p>
            <div className="flex flex-col gap-[2px]">
                {filled.map((option, index) => (
                    <p key={index} className={`text-[13px] ${gradeColor(grade)}`}>{cutOptionName(option)}</p>
                ))}
            </div>
        </div>
    );
}

export default function ItemDetailModal({ item, onClose }: { item: itemProps; onClose: () => void }) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [onClose]);

    const grade = item.potential_option_grade;
    const reqLevel = item.item_base_option?.base_equipment_level;
    const upgradeCount = Number(item.scroll_upgrade ?? 0);
    const expireText = item.date_expire ? formatExpireDate(item.date_expire) : null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-[16px]"
            onClick={onClose}
        >
            <div
                className={`w-full max-w-[420px] max-h-[90vh] overflow-y-auto scrollbar-hide rounded-[16px] border-2 ${gradeBorderColor(grade)} bg-white dark:bg-[#171717] p-[20px]`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-end">
                    <button type="button" onClick={onClose} aria-label="닫기" className="cursor-pointer text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200">
                        <FaTimes size={16} />
                    </button>
                </div>

                {Number(item.starforce) > 0 && (
                    <div className="mb-[12px]">
                        <StarRows current={Number(item.starforce)} />
                    </div>
                )}

                <p className="text-[16px] font-bold text-center">
                    {item.item_name}
                    {upgradeCount > 0 && ` (+${upgradeCount})`}
                </p>
                {grade && <p className={`text-[13px] text-center ${gradeColor(grade)}`}>({grade} 아이템)</p>}
                {expireText && <p className="text-[12px] text-center text-neutral-500 dark:text-neutral-400 mt-[4px]">{expireText}</p>}

                <div className="flex items-center gap-[16px] mt-[16px] pt-[16px] border-t border-neutral-300 dark:border-neutral-700">
                    <div className={`shrink-0 w-[64px] h-[64px] flex items-center justify-center rounded-[8px] border-2 ${gradeBorderColor(grade)} bg-neutral-100 dark:bg-neutral-800`}>
                        <Image src={item.item_icon ?? ""} alt={item.item_name ?? ""} width={48} height={48} style={{ objectFit: "contain" }} unoptimized />
                    </div>
                    {reqLevel !== undefined && <p className="text-[14px] text-neutral-500 dark:text-neutral-400">REQ LEVEL : {reqLevel}</p>}
                </div>

                <div className="mt-[16px] pt-[16px] border-t border-neutral-300 dark:border-neutral-700 flex flex-col gap-[3px]">
                    {item.item_equipment_part && <p className="text-[13px] text-neutral-500 dark:text-neutral-400 mb-[4px]">장비 분류 : {item.item_equipment_part}</p>}
                    {STAT_ROWS.map((row) => <StatLine key={row.key} row={row} item={item} />)}
                    {(item.scroll_upgradeable_count !== undefined || item.scroll_resilience_count !== undefined) && (
                        <p className="text-[12px] text-orange-400 mt-[4px]">
                            업그레이드 가능 횟수 : {item.scroll_upgradeable_count ?? 0}회 (복구 가능 횟수 : {item.scroll_resilience_count ?? 0}회)
                        </p>
                    )}
                </div>

                <div className="mt-[16px] pt-[16px] border-t border-neutral-300 dark:border-neutral-700 flex flex-col gap-[12px]">
                    <PotentialSection label="잠재옵션" grade={item.potential_option_grade} options={[item.potential_option_1, item.potential_option_2, item.potential_option_3]} />
                    <PotentialSection label="에디셔널 잠재옵션" grade={item.additional_potential_option_grade} options={[item.additional_potential_option_1, item.additional_potential_option_2, item.additional_potential_option_3]} />
                    <SoulSection name={item.soul_name} option={item.soul_option} />
                    <ExceptionalSection option={item.item_exceptional_option} />
                </div>
            </div>
        </div>
    );
}
