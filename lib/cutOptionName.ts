const optionNameMap: Record<string, string> = {
    '보스 몬스터 데미지': '보공',
    '몬스터 방어율 무시': '방무',
    '스킬 재사용 대기시간': '쿨감',
    '크리티컬 데미지': '크뎀',
    '아이템 드롭률': '아획',
    '메소 획득량': '메획',
    '캐릭터 기준 9레벨 당': '9렙당',
    '최대 MP': 'MP',
    '최대 HP': 'HP',
    'HP 회복 아이템 및 회복 스킬 효율': 'HP 효율',
    '크리티컬 확률': '크확',
};

export const cutOptionName = (optionText?: string) => {
    if (!optionText) return optionText;

    return Object.entries(optionNameMap).reduce(
        (text, [fullName, shortName]) => text.replaceAll(fullName, shortName), optionText
    );
};
