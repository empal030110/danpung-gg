'use client'

import { useState } from "react";
import { userSetProps } from "../../userProps/props";

export default function UserStat({ data }: { data: userSetProps[] }) {
    const [selectedSet, setSelectedSet] = useState<string | null>(null);

    const setClick = (setName: string) => {
        const newSet = selectedSet === setName ? null : setName;
        setSelectedSet(newSet);

        if (newSet) {
            setTimeout(() => {
                setSelectedSet(null);
            }, 3000);
        }
    };

    return (
        <div>
            <p className="font-bold mb-[8px]">세트효과</p>
            <div className="flex flex-col gap-[8px]">
                {data.map((effect: userSetProps) => (
                    <div key={effect.set_name} className="relative">
                        <div className="flex gap-[8px] cursor-pointer hover:underline" onClick={() => setClick(effect.set_name)}>
                            <p className="font-bold">{effect.total_set_count}</p>
                            <p>{effect.set_name}</p>
                        </div>
                        {selectedSet === effect.set_name && (
                            <div className="flex flex-col gap-[4px] absolute bottom-[110%] bg-[#111111] p-[16px] rounded-[16px]">
                                {effect.set_option_full.map((option) => (
                                    <div key={option.set_count} className="flex flex-col items-start gap-[2px]">
                                        <p className="text-[12px] text-[#ccff00]">{option.set_count}세트효과</p>
                                        <div className="text-[11px]">{option.set_option}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}