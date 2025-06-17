import { noticeProps } from "../props/props";

export default function InfomationBox({ data, InfomationTitle }: { data: noticeProps[], InfomationTitle: string }) {
    return (
        <div className="w-full border-2 border-gray-400 rounded-[16px]">
            <div className="p-[8px] border-b-2 border-gray-400 font-bold">{InfomationTitle}</div>
            {data.map(({ title, url, notice_id }, index) => (
                <div key={notice_id} className={`w-full ${(index + 1) % 5 == 0 ? '' : 'border-b-2'} border-gray-400 p-[8px] text-[14px]`}>
                    <a href={url} target="_blank" rel="noopener noreferrer" className="block max-w-[400px] whitespace-nowrap overflow-hidden text-ellipsis">
                        {title}
                    </a>
                </div>
            ))}
        </div>
    );
}
