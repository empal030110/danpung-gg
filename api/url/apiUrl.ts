const baseUrl = 'https://open.api.nexon.com';

// rank (당일 데이터가 아직 집계 전일 수 있어 date를 인자로 받아 호출부에서 재시도 가능하게 함)
export const dojangUrl = (date: string) => `${baseUrl}/maplestory/v1/ranking/dojang?date=${date}&difficulty=1`; // 무릉도장
export const theseedUrl = (date: string) => `${baseUrl}/maplestory/v1/ranking/theseed?date=${date}`; // 더시드
export const achievementUrl = (date: string) => `${baseUrl}/maplestory/v1/ranking/achievement?date=${date}`; // 업적

// user
export const ocidUrl = (name: string) => {
    // ocid (유저 고유 키 값)
    const url = `${baseUrl}/maplestory/v1/id?character_name=${name}`;
    return url;
};
export const userUrl = (ocid: string) => {
    // 유저 정보 (레벨, 닉네임 등등)
    const url = `${baseUrl}/maplestory/v1/character/basic?ocid=${ocid}`;
    return url;
};
export const popularityUrl = (ocid: string) => {
    // 유저 인기도
    const url = `${baseUrl}/maplestory/v1/character/popularity?ocid=${ocid}`;
    return url;
};

const challengerWorlds = ['에오스', '헬리오스']; // 챌린저스 월드는 world_type 파라미터가 필요함
export const overallUrl = (ocid: string, characterWorld: string, date: string, filterByWorld?: boolean) => {
    // 유저 랭킹 (filterByWorld가 true면 월드 랭킹, 아니면 전체 랭킹)
    const worldName = filterByWorld ? `&world_name=${encodeURIComponent(characterWorld)}` : '';
    const worldType = challengerWorlds.includes(characterWorld) ? '&world_type=1' : '';
    const url = `${baseUrl}/maplestory/v1/ranking/overall?date=${date}&ocid=${ocid}${worldName}${worldType}`;
    return url;
};
export const unionUrl = (ocid: string) => {
    // 유저 유니온 기본 정보
    const url = `${baseUrl}/maplestory/v1/user/union?ocid=${ocid}`;
    return url;
};
export const statUrl = (ocid: string) => {
    // 유저 스탯 정보
    const url = `${baseUrl}/maplestory/v1/character/stat?ocid=${ocid}`;
    return url;
};
export const setUrl = (ocid: string) => {
    // 장착중인 세트 효과
    const url = `${baseUrl}/maplestory/v1/character/set-effect?ocid=${ocid}`;
    return url;
}
export const abilityUrl = (ocid: string) => {
    // 어빌리티 정보
    const url = `${baseUrl}/maplestory/v1/character/ability?ocid=${ocid}`;
    return url;
}
export const itemUrl = (ocid: string) => {
    // 장착한 아이템 정보
    const url = `${baseUrl}/maplestory/v1/character/item-equipment?ocid=${ocid}`;
    return url;
}
export const androidUrl = (ocid: string) => {
    // 장착한 안드로이드 정보
    const url = `${baseUrl}/maplestory/v1/character/android-equipment?ocid=${ocid}`;
    return url;
}

// notice
export const noticeUrl = `${baseUrl}/maplestory/v1/notice`; // 공지
export const updateUrl = `${baseUrl}/maplestory/v1/notice-update`; // 업데이트
