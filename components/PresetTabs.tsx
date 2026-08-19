export default function PresetTabs({ count = 3, active, onSelect, labelPrefix = '', fullWidth = false }: { count?: number; active: number; onSelect: (num: number) => void; labelPrefix?: string; fullWidth?: boolean }) {
    return (
        <div className={`${fullWidth ? 'flex w-full' : 'inline-flex'} border border-neutral-400 dark:border-neutral-600 rounded-[8px] overflow-hidden`}>
            {Array.from({ length: count }, (_, i) => i + 1).map((num) => (
                <button
                    key={num}
                    type="button"
                    onClick={() => onSelect(num)}
                    className={`${fullWidth ? 'flex-1' : ''} px-[16px] py-[6px] text-[14px] font-semibold cursor-pointer border-r last:border-r-0 border-neutral-400 dark:border-neutral-600 ${active === num ? 'bg-neutral-300 dark:bg-neutral-700 text-black dark:text-white' : 'bg-transparent text-neutral-500 dark:text-neutral-400'}`}
                >
                    {labelPrefix}{num}
                </button>
            ))}
        </div>
    );
}
