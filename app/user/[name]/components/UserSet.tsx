'use client'

import { useState } from "react";
import { userSetProps } from "../../userProps/props";

export default function UserStat({ data }: { data: userSetProps[] }) {
    const [selectedSet, setSelectedSet] = useState<string | null>(null);

    const setClick = (setName: string) => {
        const newSet = selectedSet === setName ? null : setName;
        setSelectedSet(newSet);
    };

    return (
        <div className="w-full">
            <p className="font-bold mb-[8px] text-center">세트효과</p>
            <div className="flex flex-col gap-[8px]">
                {data.filter((effect: userSetProps) => effect.set_option_full[0]?.set_count <= effect.total_set_count).map((effect: userSetProps) => (
                    <div key={effect.set_name} className="relative">
                        <div className="flex gap-[8px] cursor-pointer hover:underline" onClick={() => setClick(effect.set_name)}>
                            <p className="font-bold">{effect.total_set_count}</p>
                            <p>{effect.set_name}</p>
                        </div>
                        {selectedSet === effect.set_name && (
                            <div className="flex flex-col gap-[4px] absolute bottom-[110%] z-20 bg-[#111111] p-[16px] rounded-[16px] w-full max-h-[500px] overflow-y-auto scrollbar-hide">
                                {effect.set_option_full.map((option) => {
                                    const isActive = option.set_count <= effect.total_set_count;
                                    return (
                                        <div key={option.set_count} className="flex flex-col items-start gap-[2px]">
                                            <p className={`text-[12px] ${isActive ? 'text-[#ccff00]' : 'text-neutral-500'}`}>{option.set_count}세트효과</p>
                                            <div className={`text-[11px] flex flex-col ${isActive ? 'text-white' : 'text-neutral-500'}`}>
                                                {option.set_option.split(',').map((line, idx) => (
                                                    <span key={idx}>{line.trim()}</span>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}