import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "이용 가이드 - 단풍지지",
    description: "단풍지지에서 메이플스토리 캐릭터 정보, 길드 정보를 조회하고 즐겨찾기를 활용하는 방법을 안내합니다.",
};

const sections: { title: string; body: React.ReactNode }[] = [
    {
        title: "단풍지지란?",
        body: (
            <p>
                단풍지지는 NEXON Open API를 기반으로 메이플스토리 캐릭터와 길드 정보를 조회할 수 있는 비공식 조회 서비스입니다.
                캐릭터 검색 한 번으로 스탯, 장비, 스킬, 유니온, 코디, 업적, 무릉도장 기록까지 한 페이지에서 확인할 수 있고,
                길드명으로는 길드원 목록과 노블레스 스킬 현황을 살펴볼 수 있습니다. 무릉도장·더시드·업적 랭킹 1위 캐릭터와
                최신 공지·업데이트 소식도 메인 화면에서 바로 확인할 수 있습니다.
            </p>
        ),
    },
    {
        title: "캐릭터(유저) 정보 조회하기",
        body: (
            <>
                <p>
                    화면 상단의 검색창에 캐릭터 닉네임을 입력하고 검색하면 해당 캐릭터의 상세 정보 페이지로 이동합니다.
                    상세 페이지는 아래 6개 탭으로 구성되어 있습니다.
                </p>
                <ul className="list-disc pl-[20px] mt-[8px] flex flex-col gap-[4px]">
                    <li><b>장비</b> — 세트 효과, 심볼(아케인/어센틱), 어빌리티, 착용 장비·안드로이드·타이틀, 펫 정보</li>
                    <li><b>스탯</b> — 하이퍼 스탯, 기본 스탯, 상세 스탯(공격력·방어율 무시·크리티컬 등)</li>
                    <li><b>스킬</b> — 헥사 스탯 코어, 6차·5차 스킬, 링크 스킬 프리셋</li>
                    <li><b>유니온</b> — 유니온 레벨, 챔피언 배치, 아티팩트 효과, 공격대원 스탯</li>
                    <li><b>코디</b> — 캐시 아이템 코디 및 프리셋</li>
                    <li><b>기타</b> — 업적 등급·점수, 무릉도장 최고 기록</li>
                </ul>
            </>
        ),
    },
    {
        title: "길드 정보 조회하기",
        body: (
            <p>
                상단 네비게이션의 <b>길드</b> 메뉴로 이동한 뒤, 월드(서버)와 길드명을 입력하면 길드 상세 페이지로 이동합니다.
                길드 페이지에서는 길드 마크와 기본 정보, 길드원 목록(스크롤로 전체 확인 가능), 그리고 노블레스 스킬 보유 현황을
                확인할 수 있습니다.
            </p>
        ),
    },
    {
        title: "최근 검색어 · 즐겨찾기 활용하기",
        body: (
            <p>
                검색창을 클릭하면 최근에 조회한 캐릭터 목록과 즐겨찾기로 등록한 캐릭터 목록이 탭으로 구분되어 나타납니다.
                자주 찾아보는 캐릭터는 즐겨찾기에 등록해두면 매번 이름을 입력하지 않아도 빠르게 다시 조회할 수 있습니다.
                최근 검색어와 즐겨찾기 목록은 서버에 저장되지 않고 이용 중인 브라우저에만 저장되므로, 다른 기기·브라우저에서는
                별도로 표시되지 않습니다.
            </p>
        ),
    },
    {
        title: "자주 묻는 질문",
        body: (
            <div className="flex flex-col gap-[16px]">
                <div>
                    <p className="font-semibold">Q. 캐릭터를 검색해도 정보가 나오지 않아요.</p>
                    <p className="mt-[4px]">
                        A. 넥슨 Open API 정책상 랭킹에 등재된 이력이 없거나, 캐릭터 정보 공개를 비공개로 설정한 캐릭터,
                        생성된 지 얼마 되지 않은 캐릭터는 조회가 제한될 수 있습니다.
                    </p>
                </div>
                <div>
                    <p className="font-semibold">Q. 표시되는 정보가 실제 게임 상태와 달라요.</p>
                    <p className="mt-[4px]">
                        A. 단풍지지가 제공하는 데이터는 넥슨 Open API가 매일 갱신하는 정보를 그대로 불러오는 방식이라,
                        실제 게임 내 변경 사항이 최대 하루 정도 늦게 반영될 수 있습니다.
                    </p>
                </div>
                <div>
                    <p className="font-semibold">Q. 넥슨(메이플스토리) 공식 서비스인가요?</p>
                    <p className="mt-[4px]">
                        A. 아닙니다. 단풍지지는 넥슨 Open API를 활용해 개인이 제작한 비공식 서비스이며, 넥슨 및 메이플스토리와
                        공식적으로 제휴되어 있지 않습니다.
                    </p>
                </div>
                <div>
                    <p className="font-semibold">Q. 라이트 모드는 어떻게 켜나요?</p>
                    <p className="mt-[4px]">
                        A. 상단 우측의 테마 전환 버튼을 눌러 라이트/다크 모드를 바로 전환할 수 있습니다.
                    </p>
                </div>
            </div>
        ),
    },
];

export default function GuidePage() {
    return (
        <div className="w-full py-[40px] flex flex-col gap-[32px]">
            <div>
                <h1 className="text-[24px] font-bold mb-[8px]">이용 가이드</h1>
                <p className="text-[13px] text-neutral-500 dark:text-neutral-400">
                    단풍지지를 처음 이용하신다면 아래 안내를 참고해주세요.
                </p>
            </div>
            <div className="flex flex-col gap-[24px] text-[14px] leading-[1.7]">
                {sections.map((section) => (
                    <div key={section.title}>
                        <h2 className="font-bold mb-[8px]">{section.title}</h2>
                        <div className="text-neutral-700 dark:text-neutral-300">{section.body}</div>
                    </div>
                ))}
            </div>
            <p className="text-[13px] text-neutral-500 dark:text-neutral-400">
                더 궁금한 점이 있다면 <Link href="/privacy" className="underline hover:text-neutral-700 dark:hover:text-neutral-200">개인정보처리방침</Link> 페이지의 문의 이메일로 연락해주세요.
            </p>
        </div>
    );
}
