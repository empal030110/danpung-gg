export default function UserUnionRaider({ raiderStats = [] }: { raiderStats?: string[] }) {
    return (
        <div className="w-full">
            <p className="font-bold mb-[8px]">공격대원 효과</p>
            <ul className="grid grid-cols-1 pc:grid-cols-2 gap-x-[16px] gap-y-[4px] text-[14px] list-disc pl-[16px]">
                {raiderStats.map((stat, idx) => (
                    <li key={idx}>{stat}</li>
                ))}
            </ul>
        </div>
    );
}
