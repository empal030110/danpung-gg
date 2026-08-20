export default function SidebarBox({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`w-full py-[16px] bg-gray-200 rounded-[8px] flex justify-center dark:bg-neutral-800 m-auto pc:m-0 ${className}`}>
            {children}
        </div>
    );
}
