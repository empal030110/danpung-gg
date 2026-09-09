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
import {
    userInfoRawSchema,
    setDataRawSchema,
    symbolDataRawSchema,
    symbolSchema,
    abilityDataRawSchema,
    itemDataRawSchema,
    androidSchema,
    petDataRawSchema,
    hyperStatDataRawSchema,
    statDataRawSchema,
    skillDataRawSchema,
    linkSkillDataRawSchema,
    hexaStatDataRawSchema,
    unionDataRawSchema,
    unionChampionDataRawSchema,
    unionArtifactDataRawSchema,
    unionRaiderDataRawSchema,
    cashItemDataRawSchema,
    achievementDataRawSchema,
    dojangDataRawSchema,
} from "../../userProps/rawSchemas";

// 넥슨 API 응답 20종은 전부 위 스키마들로 검증, RawUserPageData는 그 검증 전 원본이라 unknown으로
type RawApiObject = unknown;

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

    const userInfo = userInfoRawSchema.parse(userInfoDataInfo[0]);
    const userData: userDataProps = {
        date: userInfo.date ?? "",
        characterName: userInfo.character_name ?? "",
        worldName: userInfo.world_name ?? "",
        characterGender: userInfo.character_gender ?? "",
        characterClass: userInfo.character_class ?? "",
        characterClassLevel: userInfo.character_class_level ?? "",
        characterLevel: userInfo.character_level ?? 0,
        characterExp: userInfo.character_exp ?? 0,
        characterExpRate: userInfo.character_exp_rate ?? "",
        characterGuildName: userInfo.character_guild_name ?? null,
        characterImage: userInfo.character_image ?? "",
        characterDateCreate: userInfo.character_date_create ?? "",
        accessFlag: userInfo.access_flag ?? "",
        liberationQuestClearFlag: userInfo.liberation_quest_clear_flag ?? "",
    };

    // 세트효과
    const userSetEffect: userSetProps[] = setDataRawSchema.parse(userSetData[0]).set_effect ?? [];

    // 심볼 (symbol_name은 아케인/어센틱 분류용이라 symbolSchema.parse가 걸러서 symbolProps로 좁혀줌)
    const symbolData = symbolDataRawSchema.parse(userSymbolData[0]).symbol ?? [];
    const arcaneSymbols: symbolProps[] = symbolData
        .filter((symbol) => symbol.symbol_name?.startsWith('아케인심볼'))
        .map((symbol) => symbolSchema.parse(symbol));
    const authenticSymbols: symbolProps[] = symbolData
        .filter((symbol) => !symbol.symbol_name?.startsWith('아케인심볼'))
        .map((symbol) => symbolSchema.parse(symbol));

    // 어빌리티 (설정되지 않은 프리셋은 API가 null을 내려주므로 빈 값으로 대체)
    const emptyAbilityPreset: abilityProps = { ability_preset_grade: '에픽', ability_info: [] };
    const abilityData = abilityDataRawSchema.parse(userAbilityData[0]);
    const abilityPresetNumber = abilityData.preset_no ?? 1;
    const abilityPreset1 = abilityData.ability_preset_1 ?? emptyAbilityPreset;
    const abilityPreset2 = abilityData.ability_preset_2 ?? emptyAbilityPreset;
    const abilityPreset3 = abilityData.ability_preset_3 ?? emptyAbilityPreset;

    // 장착한 아이템
    // 프리셋 기능을 쓰지 않는 캐릭터는 item_equipment_preset_1/2/3이 전부 빈 배열이고,
    // 실제 착용 중인 장비는 item_equipment에만 들어있어서 preset 1이 비어있으면 이를 대신 사용
    const itemData = itemDataRawSchema.parse(userItemData[0]);
    const presetNumber = itemData.preset_no ?? 1;
    const rawItemPreset1 = itemData.item_equipment_preset_1 ?? [];
    const equippedItems = itemData.item_equipment ?? [];
    const userItemPreset1: itemProps[] = (rawItemPreset1.length > 0 ? rawItemPreset1 : equippedItems).map(toItemProps);
    const userItemPreset2: itemProps[] = (itemData.item_equipment_preset_2 ?? []).map(toItemProps);
    const userItemPreset3: itemProps[] = (itemData.item_equipment_preset_3 ?? []).map(toItemProps);

    // 장착한 칭호 (title)
    const title: titleProps[] = [
        {
            title_name: itemData.title?.title_name,
            title_icon: itemData.title?.title_icon,
            title_description: itemData.title?.title_description,
            date_expire: itemData.title?.date_expire,
            date_option_expire: itemData.title?.date_option_expire,
        }
    ];

    // 장착한 안드로이드
    const userAndroid: androidProps[] = userAndroidData.map((item) => androidSchema.parse(item));

    // 장착한 펫
    const petData = petDataRawSchema.parse(userPetData[0]);
    const userPets: petProps[] = ([1, 2, 3] as const)
        .map((num) => ({
            pet_name: petData[`pet_${num}_name`],
            pet_icon: petData[`pet_${num}_icon`],
            pet_type: petData[`pet_${num}_pet_type`],
            // 개별 펫 장비가 없으면 월드 공유 펫 장비를 대신 사용
            pet_equipment: petData[`pet_${num}_equipment`]?.item_name
                ? petData[`pet_${num}_equipment`]
                : petData[`world_share_pet_${num}_equipment`],
        }))
        .filter((pet) => pet.pet_name);

    // 하이퍼 스탯 (프리셋 1/2/3 전체를 내려서 UserHyperStat에서 전환할 수 있게 함)
    const hyperStatData = hyperStatDataRawSchema.parse(userHyperStatData[0]);
    const hyperStatPresetNo = Number(hyperStatData.use_preset_no) || 1; // 캐릭터가 실제로 사용 중인 기본 프리셋 번호
    const userHyperStatPreset1: hyperStatEntryProps[] = hyperStatData.hyper_stat_preset_1 ?? [];
    const userHyperStatPreset2: hyperStatEntryProps[] = hyperStatData.hyper_stat_preset_2 ?? [];
    const userHyperStatPreset3: hyperStatEntryProps[] = hyperStatData.hyper_stat_preset_3 ?? [];

    // 기본/상세 스탯 (final_stat 배열 하나를 UserBasicStat/UserDetailStat에서 각자 필요한 항목만 골라 씀)
    const userStat: userStatProps[] = statDataRawSchema.parse(userStatData[0]).final_stat ?? [];

    // 6차 스킬
    const userSkills6: skillProps[] = skillDataRawSchema.parse(userSkillData6[0]).character_skill ?? [];

    // 5차 스킬
    const userSkills5: skillProps[] = skillDataRawSchema.parse(userSkillData5[0]).character_skill ?? [];

    // HEXA 스탯
    const hexaStatData = hexaStatDataRawSchema.parse(userHexaStatData[0]);
    const hexaStatCore1: hexaStatCoreProps | undefined = hexaStatData.character_hexa_stat_core?.[0];
    const hexaStatCore2: hexaStatCoreProps | undefined = hexaStatData.character_hexa_stat_core_2?.[0];
    const hexaStatCore3: hexaStatCoreProps | undefined = hexaStatData.character_hexa_stat_core_3?.[0];

    // 장착 링크 스킬 (API가 현재 프리셋 번호를 안 알려줘서, 실제 장착 중인 목록과 각 프리셋을 비교해서 몇 번인지 찾음)
    const linkSkillData = linkSkillDataRawSchema.parse(userLinkSkillData[0]);
    const userLinkSkillEquipped: skillProps[] = linkSkillData.character_link_skill ?? [];
    const userLinkSkillPreset1: skillProps[] = linkSkillData.character_link_skill_preset_1 ?? [];
    const userLinkSkillPreset2: skillProps[] = linkSkillData.character_link_skill_preset_2 ?? [];
    const userLinkSkillPreset3: skillProps[] = linkSkillData.character_link_skill_preset_3 ?? [];
    const linkSkillPresetNo = isSameLinkSkillSet(userLinkSkillPreset1, userLinkSkillEquipped) ? 1
        : isSameLinkSkillSet(userLinkSkillPreset2, userLinkSkillEquipped) ? 2
        : isSameLinkSkillSet(userLinkSkillPreset3, userLinkSkillEquipped) ? 3
        : 1;

    // 유니온 (미가입 등으로 API가 union_level을 null로 내려주면 정보 없음으로 처리)
    const unionData = unionDataRawSchema.parse(userUnionData[0]);
    const userUnion: userUnionProps | undefined = unionData.union_level == null ? undefined : {
        union_level: unionData.union_level,
        union_grade: unionData.union_grade,
        union_artifact_level: unionData.union_artifact_level,
    };

    // 유니온 챔피언
    const unionChampionData = unionChampionDataRawSchema.parse(userUnionChampionData[0]);
    const userUnionChampions: unionChampionProps[] = unionChampionData.union_champion ?? [];
    const userUnionChampionBadgeEffects: string[] = (unionChampionData.champion_badge_total_info ?? [])
        .map((badge) => badge.stat ?? '');

    // 유니온 아티팩트
    const userUnionArtifactEffects: unionArtifactEffectProps[] = unionArtifactDataRawSchema.parse(userUnionArtifactData[0]).union_artifact_effect ?? [];

    // 유니온 공격대원 효과
    const unionRaiderData = unionRaiderDataRawSchema.parse(userUnionRaiderData[0]);
    const userUnionRaiderStats: string[] = unionRaiderData.union_raider_stat ?? [];
    const unionStateStatPresetNo: number = unionRaiderData.use_preset_no ?? 1;
    const unionStateStatPresets: unionStateStatPresetProps[] = unionRaiderData.union_state_stat_preset ?? [];

    // 장착 코디
    const cashItemData = cashItemDataRawSchema.parse(userCashItemData[0]);
    const userCodiItems: cashItemProps[] = cashItemData.cash_item_equipment_base ?? [];
    const codiPresetNo: number = cashItemData.preset_no ?? 1;
    const userCodiPreset1: cashItemProps[] = cashItemData.cash_item_equipment_preset_1 ?? [];
    const userCodiPreset2: cashItemProps[] = cashItemData.cash_item_equipment_preset_2 ?? [];
    const userCodiPreset3: cashItemProps[] = cashItemData.cash_item_equipment_preset_3 ?? [];

    // 업적 (당일 데이터가 아직 집계 전이면 전날 데이터로 재시도)
    const userAchievement: achievementRankProps | undefined = achievementDataRawSchema.parse(userAchievementData[0]).ranking?.[0];

    // 무릉도장 (당일 데이터가 아직 집계 전이면 전날 데이터로 재시도)
    const userDojang: dojangRankProps | undefined = dojangDataRawSchema.parse(userDojangData[0]).ranking?.[0];

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
