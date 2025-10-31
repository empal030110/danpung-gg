import Link from "next/link";
import { FaUserAltSlash } from "react-icons/fa";

export default function UserErrorPage() {
    return (
        <div className="w-full">
            <div className="flex flex-col items-center">
                <div className="mb-[16px]"><FaUserAltSlash size={64} /></div>
                <h2>정보를 불러오지 못했어요.</h2>
                <p className="mt-[8px]">오타가 있거나 정지된 캐릭터일 수 있습니다. (영어 대소문자 구분 필요)</p>
                <div className="mt-[32px]">
                    <Link href='/' className="p-[12px] bg-gray-400 rounded-[12px] text-black text-[14px]">홈으로</Link>
                </div>
            </div>
        </div>
    );
}