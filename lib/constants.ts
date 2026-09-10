// 여러 파일에서 반복되는 도메인 문자열(등급명/장비 슬롯명 등)을 한 곳에 모아
// 오타로 인한 버그를 막고, 넥슨 API가 명칭을 바꿨을 때 여기만 고치면 되게 한다.

export const GRADE = {
    LEGENDARY: "레전드리",
    UNIQUE: "유니크",
    EPIC: "에픽",
    RARE: "레어",
} as const;

// 장비 프리셋을 슬롯별로 그려낼 때 쓰는 item_equipment_slot 값 (filterItem의 filter 인자)
export const EQUIPMENT_SLOT = {
    WEAPON: "무기",
    SUB_WEAPON: "보조무기",
    EMBLEM: "엠블렘",
    HAT: "모자",
    TOP: "상의",
    BOTTOM: "하의",
    SHOULDER: "어깨장식",
    CAPE: "망토",
    GLOVE: "장갑",
    SHOES: "신발",
    PENDANT: "펜던트",
    PENDANT2: "펜던트2",
    FACE_ACCESSORY: "얼굴장식",
    EYE_ACCESSORY: "눈장식",
    EARRING: "귀고리",
    BELT: "벨트",
    RING1: "반지1",
    RING2: "반지2",
    RING3: "반지3",
    RING4: "반지4",
    SPARE_SPECIAL_RING: "예비 특수 반지",
    MACHINE_HEART: "기계 심장",
    POCKET_ITEM: "포켓 아이템",
    MEDAL: "훈장",
    BADGE: "뱃지",
    // 실제 item_equipment_slot 값은 아니지만, filterItem이 android/title 데이터를
    // 필터링 없이 그대로 통과시킬지 판단하는 동일한 filter 인자로 쓰임
    ANDROID: "안드로이드",
    TITLE: "칭호",
} as const;

// 반지 슬롯에 착용하면 예비 특수 반지 정보를 함께 보여주는 특수 아이템명
const SPECIAL_RING_NAMES = ["컨티뉴어스 링", "리스트레인트 링"] as const;
export const isSpecialRing = (name?: string | null): boolean =>
    SPECIAL_RING_NAMES.some((ringName) => ringName === name);

// 심볼 이름 접두사로 아케인/어센틱을 구분
export const ARCANE_SYMBOL_PREFIX = "아케인심볼";
