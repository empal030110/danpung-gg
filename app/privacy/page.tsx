import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "개인정보처리방침 - 단풍지지",
};

const sections: { title: string; body: React.ReactNode }[] = [
    {
        title: "1. 수집하는 개인정보 항목",
        body: (
            <p>
                단풍지지(이하 &apos;서비스&apos;)는 별도의 회원가입 및 로그인 기능을 제공하지 않으며,
                이용자가 직접 입력하는 개인정보(이름, 이메일, 전화번호 등)를 서버에 수집·저장하지 않습니다.
            </p>
        ),
    },
    {
        title: "2. 브라우저 저장 정보 (로컬 스토리지)",
        body: (
            <p>
                최근 검색어와 즐겨찾기 기능은 이용자의 브라우저 localStorage에만 저장되며, 서비스 서버로 전송되지 않습니다.
                브라우저 데이터를 삭제하거나 서비스 내 삭제 기능을 사용하면 즉시 제거됩니다.
            </p>
        ),
    },
    {
        title: "3. 자동으로 수집되는 정보 (접속 로그·분석 도구)",
        body: (
            <>
                <p>
                    서비스 이용 과정에서 방문 통계 및 서비스 개선을 위해 아래 분석 도구가 접속 기기 정보, IP 주소,
                    방문 페이지, 브라우저 종류 등의 정보를 자동으로 수집할 수 있습니다.
                </p>
                <ul className="list-disc pl-[20px] mt-[8px] flex flex-col gap-[4px]">
                    <li>Vercel Analytics (방문 통계)</li>
                    <li>NEXON Open API 분석 스크립트</li>
                </ul>
            </>
        ),
    },
    {
        title: "4. 쿠키 및 광고",
        body: (
            <p>
                서비스는 Google 애드센스 등 제3자 광고를 게재하고 있습니다.
                해당 광고 서비스는 맞춤형 광고 제공을 위해 쿠키 및 광고 식별자를 사용할 수 있습니다. 이용자는 브라우저 설정 또는
                <a href="https://adssettings.google.com" target="_blank" rel="noreferrer" className="underline mx-[4px]">
                    Google 광고 설정
                </a>
                에서 맞춤형 광고 수신을 거부할 수 있습니다.
            </p>
        ),
    },
    {
        title: "5. 개인정보의 제3자 제공",
        body: <p>서비스는 이용자의 개인정보를 별도로 수집하지 않으므로, 제3자에게 제공하지 않습니다.</p>,
    },
    {
        title: "6. 외부 API 이용 안내",
        body: (
            <p>
                서비스에서 제공하는 캐릭터·랭킹 정보는 NEXON Open API를 통해 제공되며, 넥슨 및 메이플스토리와
                공식적으로 제휴되어 있지 않습니다.
            </p>
        ),
    },
    {
        title: "7. 문의",
        body: (
            <p>
                개인정보 관련 문의사항은 아래 이메일로 연락해 주시기 바랍니다.
                <br />
                이메일: empal03@gmail.com
            </p>
        ),
    },
];

export default function PrivacyPage() {
    return (
        <div className="w-full py-[40px] flex flex-col gap-[32px]">
            <div>
                <h1 className="text-[24px] font-bold mb-[8px]">개인정보처리방침</h1>
                <p className="text-[13px] text-neutral-500 dark:text-neutral-400">시행일자: 2026-08-24</p>
            </div>
            <div className="flex flex-col gap-[24px] text-[14px] leading-[1.7]">
                {sections.map((section) => (
                    <div key={section.title}>
                        <h2 className="font-bold mb-[8px]">{section.title}</h2>
                        <div className="text-neutral-700 dark:text-neutral-300">{section.body}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
