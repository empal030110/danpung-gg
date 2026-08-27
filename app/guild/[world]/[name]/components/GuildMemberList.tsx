import Link from "next/link";
import { FaCrown } from "react-icons/fa";

export default function GuildMemberList({ members, masterName }: { members: string[]; masterName: string }) {
    return (
        <div className="w-full">
            <p className="font-bold mb-[12px]">길드원 ({members.length}명)</p>
            <div className="grid grid-cols-2 pc:grid-cols-4 gap-[8px] text-[14px]">
                {members.map((member) => {
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
                })}
            </div>
        </div>
    );
}
