export default function NotInfoText({ children }: { children: React.ReactNode }) {
    return (
        <p className="text-[12px] text-neutral-500 dark:text-neutral-400">{children}</p>
    );
}
