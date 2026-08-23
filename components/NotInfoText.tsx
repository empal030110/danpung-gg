export default function NotInfoText({ children, center }: { children: React.ReactNode; center?: boolean }) {
    return (
        <p className={`w-full text-[12px] text-neutral-500 dark:text-neutral-400 ${center ? 'text-center' : ''}`}>{children}</p>
    );
}
