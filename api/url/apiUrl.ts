import { getToDate, getYdayDate } from '@/api/getDate';

const baseUrl = 'https://open.api.nexon.com';

// rank
export const dojangUrl = `${baseUrl}/maplestory/v1/ranking/dojang?date=${getToDate()}&difficulty=1`; // 무릉도장
export const theseedUrl = `${baseUrl}/maplestory/v1/ranking/theseed?date=${getToDate()}`; // 더시드
export const achievementUrl = `${baseUrl}/maplestory/v1/ranking/achievement?date=${getToDate()}`; // 업적

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
    const url = `${baseUrl}/maplestory/v1/character/popularity?ocid=${ocid}&date=${getYdayDate()}`;
    return url;
};
export const overallUrl = (ocid: string, world?: string) => {
    // 유저 랭킹
    const url = `${baseUrl}/maplestory/v1/ranking/overall?date=${getToDate()}&ocid=${ocid}${world ? `&world_name=${world}` : ''}`;
    return url;
};
export const unionUrl = (ocid: string) => {
    // 유저 유니온 기본 정보
    const url = `${baseUrl}/maplestory/v1/user/union?ocid=${ocid}&date=${getYdayDate()}`;
    return url;
};
export const statUrl = (ocid: string) => {
    // 유저 스탯 정보
    const url = `${baseUrl}/maplestory/v1/character/stat?ocid=${ocid}&date=${getYdayDate()}`;
    return url;
};

// notice
export const noticeUrl = `${baseUrl}/maplestory/v1/notice`; // 공지
export const updateUrl = `${baseUrl}/maplestory/v1/notice-update`; // 업데이트
