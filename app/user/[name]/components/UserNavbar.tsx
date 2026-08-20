'use client';

export default function UserNavbar({ tabs, active, onSelect }: { tabs: string[]; active: number; onSelect: (index: number) => void }) {
    return (
        <div className="relative flex gap-[16px] mb-[16px] z-10">
            {tabs.map((label, index) => (
                <button
                    key={label}
                    type="button"
                    onClick={() => onSelect(index)}
                    className={`text-[20px] cursor-pointer ${active === index ? 'font-bold text-black dark:text-white' : 'text-neutral-500 dark:text-neutral-400'}`}
                >
                    {label}
                </button>
            ))}
        </div>
    );
}
