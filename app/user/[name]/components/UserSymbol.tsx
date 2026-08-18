'use client';

import { useState } from "react";
import Image from "next/image";
import { symbolProps } from "../../userProps/props";

type SymbolTab = 'arcane' | 'authentic';

export default function UserSymbol({ arcane = [], authentic = [] }: { arcane?: symbolProps[]; authentic?: symbolProps[] }) {
    const [tab, setTab] = useState<SymbolTab>('arcane');
    const currentSymbols = tab === 'arcane' ? arcane : authentic;
    const totalForce = currentSymbols.reduce((sum, symbol) => sum + Number(symbol.symbol_force || 0), 0);

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-[12px]">
                <div className="flex gap-[12px]">
                    <button
                        type="button"
                        onClick={() => setTab('arcane')}
                        className={`text-[14px] cursor-pointer ${tab === 'arcane' ? 'font-bold text-black dark:text-white' : 'text-neutral-500 dark:text-neutral-400'}`}
                    >
                        아케인
                    </button>
                    <button
                        type="button"
                        onClick={() => setTab('authentic')}
                        className={`text-[14px] cursor-pointer ${tab === 'authentic' ? 'font-bold text-black dark:text-white' : 'text-neutral-500 dark:text-neutral-400'}`}
                    >
                        어센틱
                    </button>
                </div>
                <p className="text-[14px] font-bold">토탈 포스 {totalForce.toLocaleString()}</p>
            </div>
            <div className="grid grid-cols-3 gap-[8px]">
                {currentSymbols.map((symbol, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-[4px]">
                        <Image src={symbol.symbol_icon || ""} alt="" width={40} height={40} />
                        <p className="text-[12px]">Lv.{symbol.symbol_level}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
