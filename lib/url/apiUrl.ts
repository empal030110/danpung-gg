const baseUrl = 'https://open.api.nexon.com';

// ocid만 받아 호출하는 v1 엔드포인트 공통 형태
const withOcid = (path: string) => (ocid: string) => `${baseUrl}/maplestory/v1/${path}?ocid=${ocid}`;

// rank (당일 데이터가 아직 집계 전일 수 있어 date를 인자로 받아 호출부에서 재시도 가능하게 함)
export const dojangUrl = (date: string, ocid?: string) => `${baseUrl}/maplestory/v1/ranking/dojang?date=${date}&difficulty=1${ocid ? `&ocid=${ocid}` : ''}`; // 무릉도장 (ocid를 주면 해당 캐릭터만 조회)
export const theseedUrl = (date: string) => `${baseUrl}/maplestory/v1/ranking/theseed?date=${date}`; // 더시드
export const achievementUrl = (date: string, ocid?: string) => `${baseUrl}/maplestory/v1/ranking/achievement?date=${date}${ocid ? `&ocid=${ocid}` : ''}`; // 업적 (ocid를 주면 해당 캐릭터만 조회)

// user
export const ocidUrl = (name: string) => {
    // ocid (유저 고유 키 값)
    const url = `${baseUrl}/maplestory/v1/id?character_name=${encodeURIComponent(name)}`;
    return url;
};
export const userUrl = withOcid('character/basic'); // 유저 정보 (레벨, 닉네임 등등)
export const popularityUrl = withOcid('character/popularity'); // 유저 인기도

const challengerWorlds = ['에오스', '헬리오스']; // 챌린저스 월드는 world_type 파라미터가 필요함
export const overallUrl = (ocid: string, characterWorld: string, date: string, filterByWorld?: boolean) => {
    // 유저 랭킹 (filterByWorld가 true면 월드 랭킹, 아니면 전체 랭킹)
    const worldName = filterByWorld ? `&world_name=${encodeURIComponent(characterWorld)}` : '';
    const worldType = challengerWorlds.includes(characterWorld) ? '&world_type=1' : '';
    const url = `${baseUrl}/maplestory/v1/ranking/overall?date=${date}&ocid=${ocid}${worldName}${worldType}`;
    return url;
};
export const unionUrl = withOcid('user/union'); // 유저 유니온 기본 정보
export const unionChampionUrl = withOcid('user/union-champion'); // 유니온 챔피언 정보
export const unionArtifactUrl = withOcid('user/union-artifact'); // 유니온 아티팩트 정보
export const unionRaiderUrl = withOcid('user/union-raider'); // 유니온 공격대 정보
export const cashItemEquipmentUrl = withOcid('character/cashitem-equipment'); // 장착 코디 정보
export const statUrl = withOcid('character/stat'); // 유저 스탯 정보
export const setUrl = withOcid('character/set-effect'); // 장착중인 세트 효과
export const abilityUrl = withOcid('character/ability'); // 어빌리티 정보
export const itemUrl = withOcid('character/item-equipment'); // 장착한 아이템 정보
export const androidUrl = withOcid('character/android-equipment'); // 장착한 안드로이드 정보
export const symbolUrl = withOcid('character/symbol-equipment'); // 장착한 심볼 정보
export const petUrl = withOcid('character/pet-equipment'); // 장착한 펫 정보
export const hyperStatUrl = withOcid('character/hyper-stat'); // 하이퍼 스탯 정보
export const skillUrl = (ocid: string, grade: string) => {
    // 스킬 정보 (grade: 스킬 차수)
    const url = `${baseUrl}/maplestory/v1/character/skill?ocid=${ocid}&character_skill_grade=${grade}`;
    return url;
}
export const hexaStatUrl = withOcid('character/hexamatrix-stat'); // HEXA 스탯 정보
export const linkSkillUrl = withOcid('character/link-skill'); // 링크 스킬 정보

// guild
export const guildIdUrl = (guildName: string, worldName: string) => {
    // 길드 고유 키 값
    const url = `${baseUrl}/maplestory/v1/guild/id?guild_name=${encodeURIComponent(guildName)}&world_name=${encodeURIComponent(worldName)}`;
    return url;
};
export const guildBasicUrl = (oguildId: string) => {
    // 길드 기본 정보
    const url = `${baseUrl}/maplestory/v1/guild/basic?oguild_id=${oguildId}`;
    return url;
};

// notice
export const noticeUrl = `${baseUrl}/maplestory/v1/notice`; // 공지
export const updateUrl = `${baseUrl}/maplestory/v1/notice-update`; // 업데이트
