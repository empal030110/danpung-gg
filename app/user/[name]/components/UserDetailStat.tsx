import { userStatProps } from "../../userProps/props";
import formatStatValue from "@/lib/formatStatValue";

const REUSE_COOLTIME = '__reuse_cooltime__'; // 재사용 대기시간 감소는 (초)/(%) 두 필드를 한 줄로 합쳐서 보여줘야 해서 실제 stat_name이 아닌 내부 식별자로 다룸

// 값 뒤에 %를 붙여서 노출할 스탯들
const PERCENT_LABELS = new Set([
    '데미지', '최종 데미지', '보스 몬스터 데미지', '방어율 무시', '일반 몬스터 데미지',
    '크리티컬 확률', '크리티컬 데미지', '버프 지속시간', '재사용 대기시간 미적용', '속성 내성 무시',
    '상태이상 추가 데미지', '소환수 지속시간 증가', '메소 획득량', '아이템 드롭률', '추가 경험치 획득',
    '이동속도', '점프력', '스탠스',
]);

// 화면에 노출할 스탯 순서, 3개 그룹으로 나눠서 그룹 사이에 여백을 줌
const groups: [string, string][][] = [
    [
        ['최대 스탯공격력', '데미지'],
        ['최종 데미지', '보스 몬스터 데미지'],
        ['방어율 무시', '일반 몬스터 데미지'],
        ['공격력', '크리티컬 확률'],
        ['마력', '크리티컬 데미지'],
        [REUSE_COOLTIME, '버프 지속시간'],
        ['재사용 대기시간 미적용', '속성 내성 무시'],
        ['상태이상 추가 데미지', '소환수 지속시간 증가'],
    ],
    [
        ['메소 획득량', '스타포스'],
        ['아이템 드롭률', '아케인포스'],
        ['추가 경험치 획득', '어센틱포스'],
    ],
    [
        ['방어력', '상태이상 내성'],
        ['이동속도', '점프력'],
        ['스탠스', '공격 속도'],
    ],
];

export default function UserDetailStat({ stats = [] }: { stats?: userStatProps[] }) {
    const statMap = Object.fromEntries(stats.map((stat) => [stat.stat_name, stat.stat_value]));
    const getValue = (label: string) => {
        if (label === REUSE_COOLTIME) {
            // (초)와 (%) 두 stat_name의 값을 하나의 문자열로 합쳐서 표시
            const sec = formatStatValue(statMap['재사용 대기시간 감소 (초)']);
            const percent = formatStatValue(statMap['재사용 대기시간 감소 (%)']);
            return `${sec}초 / ${percent}%`;
        }
        if (label === '공격 속도') {
            // 공격 속도는 %가 아니라 '단계' 단위
            return `${formatStatValue(statMap[label])}단계`;
        }
        const value = statMap[label];
        const formatted = formatStatValue(value);
        return PERCENT_LABELS.has(label) && value !== undefined ? `${formatted}%` : formatted;
    };

    return (
        <div className="flex flex-col gap-[16px] w-full">
            {groups.map((group, groupIndex) => (
                <div key={groupIndex} className="grid pc:grid-cols-2 gap-x-[16px] gap-y-[6px] text-[14px]">
                    {group.flatMap(([left, right]) => ([
                        // 한 쌍을 2열 그리드의 셀 2개로 펼쳐서 렌더링
                        <div key={left} className="flex justify-between">
                            <span className="text-neutral-500 dark:text-neutral-400">{left === REUSE_COOLTIME ? '재사용 대기시간 감소' : left}</span>
                            <span className="font-bold">{getValue(left)}</span>
                        </div>,
                        <div key={right} className="flex justify-between">
                            <span className="text-neutral-500 dark:text-neutral-400">{right}</span>
                            <span className="font-bold">{getValue(right)}</span>
                        </div>,
                    ]))}
                </div>
            ))}
        </div>
    );
}
