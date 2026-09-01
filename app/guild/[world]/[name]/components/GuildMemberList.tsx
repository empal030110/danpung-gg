'use client';

import { useMemo, useState } from "react";
import Link from "next/link";
import { FaCrown } from "react-icons/fa";
import NotInfoText from "@/components/NotInfoText";

type SortMode = 'default' | 'name';

export default function GuildMemberList({ members, masterName }: { members: string[]; masterName: string }) {
    const [search, setSearch] = useState('');
    const [sortMode, setSortMode] = useState<SortMode>('default');
    const filteredMembers = useMemo(() => {
        const trimmed = search.replace(/\s+/g, '');
        const filtered = trimmed ? members.filter((member) => member.includes(trimmed)) : members;
        return sortMode === 'name' ? [...filtered].sort((a, b) => a.localeCompare(b, 'ko')) : filtered;
    }, [members, search, sortMode]);

    return (
        <div className="w-full">
            <div className="flex items-center justify-between gap-[8px] mb-[12px] flex-wrap">
                <p className="font-bold">길드원 ({filteredMembers.length}/{members.length}명)</p>
                <div className="flex items-center gap-[8px]">
                    <div className="flex border border-neutral-400 dark:border-neutral-600 rounded-[8px] overflow-hidden text-[12px]">
                        <button
                            type="button"
                            onClick={() => setSortMode('default')}
                            aria-pressed={sortMode === 'default'}
                            className={`px-[10px] py-[4px] cursor-pointer ${sortMode === 'default' ? 'bg-neutral-700 text-white dark:bg-neutral-200 dark:text-black font-bold' : 'text-neutral-500 dark:text-neutral-400'}`}
                        >
                            기본순
                        </button>
                        <button
                            type="button"
                            onClick={() => setSortMode('name')}
                            aria-pressed={sortMode === 'name'}
                            className={`px-[10px] py-[4px] cursor-pointer ${sortMode === 'name' ? 'bg-neutral-700 text-white dark:bg-neutral-200 dark:text-black font-bold' : 'text-neutral-500 dark:text-neutral-400'}`}
                        >
                            이름순
                        </button>
                    </div>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="길드원 이름 검색"
                        aria-label="길드원 이름 검색"
                        className="text-[13px] w-[140px] border border-neutral-400 dark:border-neutral-600 rounded-[8px] px-[10px] py-[5px] bg-white dark:bg-[#171717] text-black dark:text-white"
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 pc:grid-cols-4 gap-[8px] text-[14px] max-h-[500px] overflow-y-auto scrollbar-hide">
                {filteredMembers.length > 0 ? (
                    filteredMembers.map((member) => {
                        const isMaster = member === masterName;
                        return (
                            <Link
                                key={member}
                                href={`/user/${encodeURIComponent(member)}`}
                                className={`flex items-center justify-center gap-[4px] py-[8px] px-[10px] rounded-[8px] truncate ${isMaster ? 'bg-yellow-400 text-black font-bold' : 'bg-gray-200 dark:bg-neutral-800 hover:bg-gray-300 dark:hover:bg-neutral-700'}`}
                            >
                                {isMaster && <FaCrown size={12} />}
                                <span className="truncate">{member}</span>
                            </Link>
                        );
                    })
                ) : (
                    <div className="col-span-full py-[16px]">
                        <NotInfoText center>검색 결과가 없습니다.</NotInfoText>
                    </div>
                )}
            </div>
        </div>
    );
}
