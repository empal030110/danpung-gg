import { noticeProps } from "../props/props";
import { IoIosArrowForward } from "react-icons/io";

export default function InfomationBox({ data, InfomationTitle }: { data: noticeProps[], InfomationTitle: string }) {
    const moreLink = InfomationTitle === '공지사항' ? 'https://maplestory.nexon.com/News/Notice' : 'https://maplestory.nexon.com/News/Update';

    return (
        <div className="w-full border-2 border-gray-400 rounded-[16px]">
            <div className="flex items-center justify-between p-[8px] border-b-2 border-gray-400 font-bold">
                <p>{InfomationTitle}</p>
                <a href={moreLink} target="_blank" rel="noopener noreferrer" className="flex gap-[2px] items-center text-[14px]">더보기<span><IoIosArrowForward /></span></a>
            </div>
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
