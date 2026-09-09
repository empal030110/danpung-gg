import {
    abilityProps,
    androidProps,
    itemProps,
    titleProps,
    userDataProps,
    userSetProps,
    symbolProps,
    petProps,
    hyperStatEntryProps,
    userStatProps,
    skillProps,
    hexaStatCoreProps,
    userUnionProps,
    unionChampionProps,
    unionArtifactEffectProps,
    unionStateStatPresetProps,
    cashItemProps,
    achievementRankProps,
    dojangRankProps,
} from "../../userProps/props";
import { itemSchema } from "../../userProps/itemSchema";

// 넥슨 API 원본 응답은 필드가 매우 많고 계속 바뀔 수 있어 전체를 타이핑하지 않고
// 이 파일에서 실제로 쓰는 필드만 any로 다룬다 (filterItem.ts와 동일한 방침).
// item/title/android는 itemSchema로 실제 검증까지
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RawApiObject = any;

export interface RawUserPageData {
    userInfoDataInfo: RawApiObject[];
    userSetData: RawApiObject[];
    userSymbolData: RawApiObject[];
    userAbilityData: RawApiObject[];
    userItemData: RawApiObject[];
    userAndroidData: RawApiObject[];
    userPetData: RawApiObject[];
    userHyperStatData: RawApiObject[];
    userStatData: RawApiObject[];
    userSkillData6: RawApiObject[];
    userSkillData5: RawApiObject[];
    userHexaStatData: RawApiObject[];
    userLinkSkillData: RawApiObject[];
    userUnionData: RawApiObject[];
    userUnionChampionData: RawApiObject[];
    userUnionArtifactData: RawApiObject[];
    userUnionRaiderData: RawApiObject[];
    userCashItemData: RawApiObject[];
    userAchievementData: RawApiObject[];
    userDojangData: RawApiObject[];
}

export interface MappedUserPageData {
    userData: userDataProps;
    userSetEffect: userSetProps[];
    arcaneSymbols: symbolProps[];
    authenticSymbols: symbolProps[];
    abilityPresetNumber: number;
    abilityPreset1: abilityProps;
    abilityPreset2: abilityProps;
    abilityPreset3: abilityProps;
    presetNumber: number;
    userItemPreset1: itemProps[];
    userItemPreset2: itemProps[];
    userItemPreset3: itemProps[];
    title: titleProps[];
    userAndroid: androidProps[];
    userPets: petProps[];
    hyperStatPresetNo: number;
    userHyperStatPreset1: hyperStatEntryProps[];
    userHyperStatPreset2: hyperStatEntryProps[];
    userHyperStatPreset3: hyperStatEntryProps[];
    userStat: userStatProps[];
    userSkills6: skillProps[];
    userSkills5: skillProps[];
    hexaStatCore1: hexaStatCoreProps | undefined;
    hexaStatCore2: hexaStatCoreProps | undefined;
    hexaStatCore3: hexaStatCoreProps | undefined;
    linkSkillPresetNo: number;
    userLinkSkillPreset1: skillProps[];
    userLinkSkillPreset2: skillProps[];
    userLinkSkillPreset3: skillProps[];
    userUnion: userUnionProps | undefined;
    userUnionChampions: unionChampionProps[];
    userUnionChampionBadgeEffects: string[];
    userUnionArtifactEffects: unionArtifactEffectProps[];
    userUnionRaiderStats: string[];
    unionStateStatPresetNo: number;
    unionStateStatPresets: unionStateStatPresetProps[];
    userCodiItems: cashItemProps[];
    codiPresetNo: number;
    userCodiPreset1: cashItemProps[];
    userCodiPreset2: cashItemProps[];
    userCodiPreset3: cashItemProps[];
    userAchievement: achievementRankProps | undefined;
    userDojang: dojangRankProps | undefined;
}

const toItemProps = (item: unknown): itemProps => itemSchema.parse(item);

const toSymbolProps = (symbol: { symbol_icon?: string; symbol_level?: number; symbol_force?: string }): symbolProps => ({
    symbol_icon: symbol.symbol_icon,
    symbol_level: symbol.symbol_level,
    symbol_force: symbol.symbol_force,
});

const isSameLinkSkillSet = (preset: skillProps[], equipped: skillProps[]) =>
    preset.length === equipped.length &&
    preset.every((skill) => equipped.some((item) => item.skill_name === skill.skill_name));

// 넥슨 API 응답 20종을 화면에서 쓰는 형태로 가공한다.
// 페이지 컴포넌트(렌더링)에서 이 로직을 분리해 순수 함수로 단위 테스트할 수 있게 한다.
export function mapUserPageData(raw: RawUserPageData): MappedUserPageData {
    const {
        userInfoDataInfo,
        userSetData,
        userSymbolData,
        userAbilityData,
        userItemData,
        userAndroidData,
        userPetData,
        userHyperStatData,
        userStatData,
        userSkillData6,
        userSkillData5,
        userHexaStatData,
        userLinkSkillData,
        userUnionData,
        userUnionChampionData,
        userUnionArtifactData,
        userUnionRaiderData,
        userCashItemData,
        userAchievementData,
        userDojangData,
    } = raw;

    const userData: userDataProps = {
        date: userInfoDataInfo[0].date,
        characterName: userInfoDataInfo[0].character_name,
        worldName: userInfoDataInfo[0].world_name,
        characterGender: userInfoDataInfo[0].character_gender,
        characterClass: userInfoDataInfo[0].character_class,
        characterClassLevel: userInfoDataInfo[0].character_class_level,
        characterLevel: userInfoDataInfo[0].character_level,
        characterExp: userInfoDataInfo[0].character_exp,
        characterExpRate: userInfoDataInfo[0].character_exp_rate,
        characterGuildName: userInfoDataInfo[0].character_guild_name,
        characterImage: userInfoDataInfo[0].character_image,
        characterDateCreate: userInfoDataInfo[0].character_date_create,
        accessFlag: userInfoDataInfo[0].access_flag,
        liberationQuestClearFlag: userInfoDataInfo[0].liberation_quest_clear_flag,
    };

    // 세트효과
    const userSetEffect: userSetProps[] = userSetData[0].set_effect;

    // 심볼
    const arcaneSymbols: symbolProps[] = userSymbolData[0].symbol
        .filter((symbol: { symbol_name?: string }) => symbol.symbol_name?.startsWith('아케인심볼'))
        .map(toSymbolProps);
    const authenticSymbols: symbolProps[] = userSymbolData[0].symbol
        .filter((symbol: { symbol_name?: string }) => !symbol.symbol_name?.startsWith('아케인심볼'))
        .map(toSymbolProps);

    // 어빌리티 (설정되지 않은 프리셋은 API가 null을 내려주므로 빈 값으로 대체)
    const emptyAbilityPreset: abilityProps = { ability_preset_grade: '에픽', ability_info: [] };
    const abilityPresetNumber = userAbilityData[0].preset_no;
    const abilityPreset1 = userAbilityData[0].ability_preset_1 ?? emptyAbilityPreset;
    const abilityPreset2 = userAbilityData[0].ability_preset_2 ?? emptyAbilityPreset;
    const abilityPreset3 = userAbilityData[0].ability_preset_3 ?? emptyAbilityPreset;

    // 장착한 아이템
    // 프리셋 기능을 쓰지 않는 캐릭터는 item_equipment_preset_1/2/3이 전부 빈 배열이고,
    // 실제 착용 중인 장비는 item_equipment에만 들어있어서 preset 1이 비어있으면 이를 대신 사용
    const presetNumber = userItemData[0].preset_no ?? 1;
    // 파싱 전이라 아직 검증되지 않은 원본이므로 itemProps로 단정하지 않음 (toItemProps에서 실제 검증)
    const rawItemPreset1 = userItemData[0].item_equipment_preset_1 ?? [];
    const equippedItems = userItemData[0].item_equipment ?? [];
    const userItemPreset1: itemProps[] = (rawItemPreset1.length > 0 ? rawItemPreset1 : equippedItems).map(toItemProps);
    const userItemPreset2: itemProps[] = (userItemData[0].item_equipment_preset_2 ?? []).map(toItemProps);
    const userItemPreset3: itemProps[] = (userItemData[0].item_equipment_preset_3 ?? []).map(toItemProps);

    // 장착한 칭호 (title)
    const title: titleProps[] = [
        {
            title_name: userItemData[0].title?.title_name,
            title_icon: userItemData[0].title?.title_icon,
            title_description: userItemData[0].title?.title_description,
            date_expire: userItemData[0].title?.date_expire,
            date_option_expire: userItemData[0].title?.date_option_expire,
        }
    ];

    // 장착한 안드로이드
    const userAndroid: androidProps[] = userAndroidData.map((item) => ({
        android_name: item.android_name,
        android_icon: item.android_icon,
    }));

    // 장착한 펫
    const userPets: petProps[] = [1, 2, 3]
        .map((num) => ({
            pet_name: userPetData[0][`pet_${num}_name`],
            pet_icon: userPetData[0][`pet_${num}_icon`],
            pet_type: userPetData[0][`pet_${num}_pet_type`],
            // 개별 펫 장비가 없으면 월드 공유 펫 장비를 대신 사용
            pet_equipment: userPetData[0][`pet_${num}_equipment`]?.item_name
                ? userPetData[0][`pet_${num}_equipment`]
                : userPetData[0][`world_share_pet_${num}_equipment`],
        }))
        .filter((pet) => pet.pet_name);

    // 하이퍼 스탯 (프리셋 1/2/3 전체를 내려서 UserHyperStat에서 전환할 수 있게 함)
    const hyperStatPresetNo = Number(userHyperStatData[0].use_preset_no) || 1; // 캐릭터가 실제로 사용 중인 기본 프리셋 번호
    const userHyperStatPreset1: hyperStatEntryProps[] = userHyperStatData[0].hyper_stat_preset_1 ?? [];
    const userHyperStatPreset2: hyperStatEntryProps[] = userHyperStatData[0].hyper_stat_preset_2 ?? [];
    const userHyperStatPreset3: hyperStatEntryProps[] = userHyperStatData[0].hyper_stat_preset_3 ?? [];

    // 기본/상세 스탯 (final_stat 배열 하나를 UserBasicStat/UserDetailStat에서 각자 필요한 항목만 골라 씀)
    const userStat: userStatProps[] = userStatData[0].final_stat;

    // 6차 스킬
    const userSkills6: skillProps[] = userSkillData6[0].character_skill ?? [];

    // 5차 스킬
    const userSkills5: skillProps[] = userSkillData5[0].character_skill ?? [];

    // HEXA 스탯
    const hexaStatCore1: hexaStatCoreProps | undefined = userHexaStatData[0].character_hexa_stat_core?.[0];
    const hexaStatCore2: hexaStatCoreProps | undefined = userHexaStatData[0].character_hexa_stat_core_2?.[0];
    const hexaStatCore3: hexaStatCoreProps | undefined = userHexaStatData[0].character_hexa_stat_core_3?.[0];

    // 장착 링크 스킬 (API가 현재 프리셋 번호를 안 알려줘서, 실제 장착 중인 목록과 각 프리셋을 비교해서 몇 번인지 찾음)
    const userLinkSkillEquipped: skillProps[] = userLinkSkillData[0].character_link_skill ?? [];
    const userLinkSkillPreset1: skillProps[] = userLinkSkillData[0].character_link_skill_preset_1 ?? [];
    const userLinkSkillPreset2: skillProps[] = userLinkSkillData[0].character_link_skill_preset_2 ?? [];
    const userLinkSkillPreset3: skillProps[] = userLinkSkillData[0].character_link_skill_preset_3 ?? [];
    const linkSkillPresetNo = isSameLinkSkillSet(userLinkSkillPreset1, userLinkSkillEquipped) ? 1
        : isSameLinkSkillSet(userLinkSkillPreset2, userLinkSkillEquipped) ? 2
        : isSameLinkSkillSet(userLinkSkillPreset3, userLinkSkillEquipped) ? 3
        : 1;

    // 유니온 (미가입 등으로 API가 union_level을 null로 내려주면 정보 없음으로 처리)
    const userUnion: userUnionProps | undefined = userUnionData[0].union_level == null ? undefined : {
        union_level: userUnionData[0].union_level,
        union_grade: userUnionData[0].union_grade,
        union_artifact_level: userUnionData[0].union_artifact_level,
    };

    // 유니온 챔피언
    const userUnionChampions: unionChampionProps[] = (userUnionChampionData[0].union_champion ?? []).map((champion: unionChampionProps) => ({
        champion_slot: champion.champion_slot,
        champion_name: champion.champion_name,
        champion_class: champion.champion_class,
        champion_grade: champion.champion_grade,
    }));
    const userUnionChampionBadgeEffects: string[] = (userUnionChampionData[0].champion_badge_total_info ?? []).map((badge: { stat: string }) => badge.stat);

    // 유니온 아티팩트
    const userUnionArtifactEffects: unionArtifactEffectProps[] = userUnionArtifactData[0].union_artifact_effect ?? [];

    // 유니온 공격대원 효과
    const userUnionRaiderStats: string[] = userUnionRaiderData[0].union_raider_stat ?? [];
    const unionStateStatPresetNo: number = userUnionRaiderData[0].use_preset_no ?? 1;
    const unionStateStatPresets: unionStateStatPresetProps[] = userUnionRaiderData[0].union_state_stat_preset ?? [];

    // 장착 코디
    const userCodiItems: cashItemProps[] = userCashItemData[0].cash_item_equipment_base ?? [];
    const codiPresetNo: number = userCashItemData[0].preset_no ?? 1;
    const userCodiPreset1: cashItemProps[] = userCashItemData[0].cash_item_equipment_preset_1 ?? [];
    const userCodiPreset2: cashItemProps[] = userCashItemData[0].cash_item_equipment_preset_2 ?? [];
    const userCodiPreset3: cashItemProps[] = userCashItemData[0].cash_item_equipment_preset_3 ?? [];

    // 업적 (당일 데이터가 아직 집계 전이면 전날 데이터로 재시도)
    const userAchievement: achievementRankProps | undefined = userAchievementData[0].ranking[0];

    // 무릉도장 (당일 데이터가 아직 집계 전이면 전날 데이터로 재시도)
    const userDojang: dojangRankProps | undefined = userDojangData[0].ranking[0];

    return {
        userData,
        userSetEffect,
        arcaneSymbols,
        authenticSymbols,
        abilityPresetNumber,
        abilityPreset1,
        abilityPreset2,
        abilityPreset3,
        presetNumber,
        userItemPreset1,
        userItemPreset2,
        userItemPreset3,
        title,
        userAndroid,
        userPets,
        hyperStatPresetNo,
        userHyperStatPreset1,
        userHyperStatPreset2,
        userHyperStatPreset3,
        userStat,
        userSkills6,
        userSkills5,
        hexaStatCore1,
        hexaStatCore2,
        hexaStatCore3,
        linkSkillPresetNo,
        userLinkSkillPreset1,
        userLinkSkillPreset2,
        userLinkSkillPreset3,
        userUnion,
        userUnionChampions,
        userUnionChampionBadgeEffects,
        userUnionArtifactEffects,
        userUnionRaiderStats,
        unionStateStatPresetNo,
        unionStateStatPresets,
        userCodiItems,
        codiPresetNo,
        userCodiPreset1,
        userCodiPreset2,
        userCodiPreset3,
        userAchievement,
        userDojang,
    };
}
