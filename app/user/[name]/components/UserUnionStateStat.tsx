'use client';

import { useState } from "react";
import { unionStateStatPresetProps } from "../../userProps/props";

// API가 주는 union_state_stat은 "크리티컬 데미지 20.00% 증가" 같은 완성된 문장 배열이라 항목이 몇 개고 순서가 어떤지 보장이 안 됨
// 그래서 화면에는 이 16개 항목을 항상 고정된 순서/개수로 두고, 각 항목마다 원문 문장에서 자신을 찾을 키워드만 매핑
const STAT_ROWS: [string, string][][] = [
    [['STR', 'STR'], ['DEX', 'DEX'], ['INT', 'INT'], ['LUK', 'LUK']],
    [['공격력', '공격력'], ['마력', '마력'], ['최대 HP', '최대 HP'], ['최대 MP', '최대 MP']],
    [['크리티컬 데미지', '크리티컬 데미지'], ['보스 데미지', '보스'], ['방어율 무시', '방어율 무시'], ['크리티컬 확률', '크리티컬 확률']],
    [['버프 지속 시간', '버프 지속'], ['일반몹 데미지', '일반 몬스터'], ['획득 경험치', '경험치'], ['상태 이상 내성', '상태 이상 내성']],
];

// stats(선택된 프리셋의 문장 배열)에서 keyword를 포함한 문장을 찾아 수치만 뽑아 "+n" 형태로 반환
// 해당 키워드의 효과를 아예 투자 안 했으면 문장 자체가 배열에 없으므로 그 경우 기본값 "+0"
const getStatValue = (stats: string[], keyword: string) => {
    const found = stats.find((stat) => stat.includes(keyword));
    if (!found) return '+0';
    const match = found.match(/([\d.]+)(%?)/); // 문장 안의 첫 숫자와 뒤따르는 % 여부를 함께 캡처
    if (!match) return '+0';
    return `+${parseFloat(match[1])}${match[2]}`;
};

export default function UserUnionStateStat({ presetNumber = 1, presets = [] }: { presetNumber?: number; presets?: unionStateStatPresetProps[] }) {
    const [selected, setSelected] = useState(presetNumber);
    const current = presets.find((preset) => preset.preset_no === selected);
    const currentStats = current?.union_state_stat ?? [];

    return (
        <div className="w-full">
            <p className="font-bold mb-[8px]">유니온</p>
            <div className="grid grid-cols-5 gap-[8px] mb-[16px]">
                {presets.map((preset) => {
                    // 프리셋 자체는 항상 10개가 내려오지만, 캐릭터가 아직 만들지 않은 프리셋은 union_state_stat이 빈 배열로 옴 -> 선택 자체를 막음
                    const disabled = preset.union_state_stat.length === 0;
                    const active = selected === preset.preset_no;
                    return (
                        <button
                            key={preset.preset_no}
                            type="button"
                            disabled={disabled}
                            onClick={() => setSelected(preset.preset_no)}
                            className={`py-[6px] rounded-[8px] text-[14px] font-semibold border ${disabled
                                ? 'border-neutral-300 dark:border-neutral-700 text-neutral-300 dark:text-neutral-600 cursor-not-allowed'
                                : active
                                    ? 'border-black dark:border-white bg-neutral-300 dark:bg-neutral-700 text-black dark:text-white cursor-pointer'
                                    : 'border-neutral-400 dark:border-neutral-600 text-neutral-500 dark:text-neutral-400 cursor-pointer'
                                }`}
                        >
                            {preset.preset_no}
                        </button>
                    );
                })}
            </div>
            <div className="grid grid-cols-2 pc:grid-cols-4 gap-[8px]">
                {STAT_ROWS.flat().map(([label, keyword]) => {
                    const value = getStatValue(currentStats, keyword);
                    const hasValue = value !== '+0'; // 투자된 스탯만 강조
                    return (
                        <div
                            key={label}
                            className={`border rounded-[8px] p-[12px] flex flex-col items-center gap-[4px] ${hasValue ? 'border-black dark:border-white' : 'border-neutral-300 dark:border-neutral-700'}`}
                        >
                            <p className="text-[12px] text-neutral-500 dark:text-neutral-400">{label}</p>
                            <p className="text-[16px] font-bold">{value}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
