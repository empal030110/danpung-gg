import { getToDate } from '@/api/getDate';

// rank
export const dojangUrl = `https://open.api.nexon.com/maplestory/v1/ranking/dojang?date=${getToDate()}&difficulty=1`; // 무릉도장
export const theseedUrl = `https://open.api.nexon.com/maplestory/v1/ranking/theseed?date=${getToDate()}`; // 더시드
export const achievementUrl = `https://open.api.nexon.com/maplestory/v1/ranking/achievement?date=${getToDate()}`; // 업적

// user
export const ocidUrl = (name: string) => {
    // ocid (유저 고유 키 값)
    const url = `https://open.api.nexon.com/maplestory/v1/id?character_name=${name}`;
    return url;
};
export const userUrl = (ocid: string) => {
    // 유저 정보 (레벨, 닉네임 등등)
    const url = `https://open.api.nexon.com/maplestory/v1/character/basic?ocid=${ocid}`;
    return url;
};
