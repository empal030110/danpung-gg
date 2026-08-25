import { abilityUrl, itemUrl, ocidUrl, setUrl, userUrl, androidUrl, symbolUrl, petUrl, hyperStatUrl, statUrl, skillUrl, hexaStatUrl, linkSkillUrl, unionUrl, unionChampionUrl, unionArtifactUrl, unionRaiderUrl, cashItemEquipmentUrl, achievementUrl, dojangUrl } from "@/api/url/apiUrl";
import { abilityProps, androidProps, itemProps, titleProps, userDataProps, userNameProps, userSetProps, symbolProps, petProps, hyperStatEntryProps, userStatProps, skillProps, hexaStatCoreProps, userUnionProps, unionChampionProps, unionArtifactEffectProps, unionStateStatPresetProps, cashItemProps, achievementRankProps, dojangRankProps } from "../userProps/props";
import ssrFetcher from "@/api/ssrFetcher";
import ssrRankingFetcher from "@/api/ssrRankingFetcher";
import runLimited from "@/api/runLimited";
import UserHeader from "./components/UserHeader";
import UserInfoTabs from "./components/UserInfoTabs";

export default async function SearchPage({ params }: userNameProps) {
    const { name } = await params;
    const userName = decodeURIComponent(name);

    const userOcidUrl = ocidUrl(userName);
    const userOcid = await ssrFetcher(userOcidUrl);
    const ocid = userOcid[0]['ocid'];

    const userInfoUrl = userUrl(ocid);
    const userSetUrl = setUrl(ocid);
    const userSymbolUrl = symbolUrl(ocid);
    const userAbilityUrl = abilityUrl(ocid);
    const userItemUrl = itemUrl(ocid);
    const userAndroidUrl = androidUrl(ocid);
    const userPetUrl = petUrl(ocid);
    const userHyperStatUrl = hyperStatUrl(ocid);
    const userStatUrl = statUrl(ocid);
    const userSkillUrl6 = skillUrl(ocid, '6');
    const userSkillUrl5 = skillUrl(ocid, '5');
    const userHexaStatUrl = hexaStatUrl(ocid);
    const userLinkSkillUrl = linkSkillUrl(ocid);
    const userUnionUrl = unionUrl(ocid);
    const userUnionChampionUrl = unionChampionUrl(ocid);
    const userUnionArtifactUrl = unionArtifactUrl(ocid);
    const userUnionRaiderUrl = unionRaiderUrl(ocid);
    const userCashItemUrl = cashItemEquipmentUrl(ocid);

    // ocid를 제외한 나머지 조회는 서로 의존관계가 없어서 병렬로 요청하되, 넥슨 API 순간 요청량 제한(429)에
    // 걸리지 않도록 동시 실행 개수를 제한 (전부 한 번에 쏘면 캐릭터에 따라 429로 실패하는 경우가 있었음)
    const [
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
    ] = await runLimited([
        () => ssrFetcher(userInfoUrl),
        () => ssrFetcher(userSetUrl),
        () => ssrFetcher(userSymbolUrl),
        () => ssrFetcher(userAbilityUrl),
        () => ssrFetcher(userItemUrl),
        () => ssrFetcher(userAndroidUrl),
        () => ssrFetcher(userPetUrl),
        () => ssrFetcher(userHyperStatUrl),
        () => ssrFetcher(userStatUrl),
        () => ssrFetcher(userSkillUrl6),
        () => ssrFetcher(userSkillUrl5),
        () => ssrFetcher(userHexaStatUrl),
        () => ssrFetcher(userLinkSkillUrl),
        () => ssrFetcher(userUnionUrl),
        () => ssrFetcher(userUnionChampionUrl),
        () => ssrFetcher(userUnionArtifactUrl),
        () => ssrFetcher(userUnionRaiderUrl),
        () => ssrFetcher(userCashItemUrl),
        () => ssrRankingFetcher((date) => achievementUrl(date, ocid)),
        () => ssrRankingFetcher((date) => dojangUrl(date, ocid)),
    ], 3);

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
		liberationQuestClearFlag: userInfoDataInfo[0].liberation_quest_clear_flag
    }

	// 세트효과
	const userSetEffect: userSetProps[] = userSetData[0].set_effect;

	// 심볼
	const toSymbolProps = (symbol: { symbol_icon?: string; symbol_level?: number; symbol_force?: string }): symbolProps => ({
		symbol_icon: symbol.symbol_icon,
		symbol_level: symbol.symbol_level,
		symbol_force: symbol.symbol_force,
	});
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
	const toItemProps = (item: itemProps): itemProps => ({
		additional_potential_option_1: item.additional_potential_option_1,
		additional_potential_option_2: item.additional_potential_option_2,
		additional_potential_option_3: item.additional_potential_option_3,
		additional_potential_option_flag: item.additional_potential_option_flag,
		additional_potential_option_grade: item.additional_potential_option_grade,
		item_equipment_slot: item.item_equipment_slot,
		item_icon: item.item_icon,
		item_name: item.item_name,
		potential_option_1: item.potential_option_1,
		potential_option_2: item.potential_option_2,
		potential_option_3: item.potential_option_3,
		potential_option_flag: item.potential_option_flag,
		potential_option_grade: item.potential_option_grade,
		starforce: item.starforce,
		special_ring_level: item.special_ring_level,
	});
	const presetNumber = userItemData[0].preset_no ?? 1;
	const rawItemPreset1: itemProps[] = userItemData[0].item_equipment_preset_1 ?? [];
	const equippedItems: itemProps[] = userItemData[0].item_equipment ?? [];
	const userItemPreset1: itemProps[] = (rawItemPreset1.length > 0 ? rawItemPreset1 : equippedItems).map(toItemProps);
	const userItemPreset2: itemProps[] = (userItemData[0].item_equipment_preset_2 ?? []).map(toItemProps);
	const userItemPreset3: itemProps[] = (userItemData[0].item_equipment_preset_3 ?? []).map(toItemProps);

	// 장착한 칭호 (title)
	const title: titleProps[] = [
		{
			title_name: userItemData[0].title?.title_name,
			title_icon: userItemData[0].title?.title_icon,
		}
	];

	// 장착한 안드로이드
	const userAndroid: androidProps[] = userAndroidData.map(item => ({
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
	const isSameLinkSkillSet = (preset: skillProps[]) =>
		preset.length === userLinkSkillEquipped.length &&
		preset.every((skill) => userLinkSkillEquipped.some((equipped) => equipped.skill_name === skill.skill_name));
	const linkSkillPresetNo = isSameLinkSkillSet(userLinkSkillPreset1) ? 1
		: isSameLinkSkillSet(userLinkSkillPreset2) ? 2
		: isSameLinkSkillSet(userLinkSkillPreset3) ? 3
		: 1;

	// 유니온
	const userUnion: userUnionProps = {
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

    return (
        <div className="w-full h-auto pb-[40px]">
			<div className="w-full px-[20px] py-[32px]">
				<UserHeader data={userData} ocid={userOcid[0]['ocid']} />
			</div>
			<UserInfoTabs
				userSetEffect={userSetEffect}
				arcaneSymbols={arcaneSymbols}
				authenticSymbols={authenticSymbols}
				abilityPresetNumber={abilityPresetNumber}
				abilityPreset1={abilityPreset1}
				abilityPreset2={abilityPreset2}
				abilityPreset3={abilityPreset3}
				presetNumber={presetNumber}
				userItemPreset1={userItemPreset1}
				userItemPreset2={userItemPreset2}
				userItemPreset3={userItemPreset3}
				userAndroid={userAndroid}
				title={title}
				userPets={userPets}
				hyperStatPresetNo={hyperStatPresetNo}
				userHyperStatPreset1={userHyperStatPreset1}
				userHyperStatPreset2={userHyperStatPreset2}
				userHyperStatPreset3={userHyperStatPreset3}
				userStat={userStat}
				userSkills6={userSkills6}
				userSkills5={userSkills5}
				hexaStatCore1={hexaStatCore1}
				hexaStatCore2={hexaStatCore2}
				hexaStatCore3={hexaStatCore3}
				linkSkillPresetNo={linkSkillPresetNo}
				userLinkSkillPreset1={userLinkSkillPreset1}
				userLinkSkillPreset2={userLinkSkillPreset2}
				userLinkSkillPreset3={userLinkSkillPreset3}
				userUnion={userUnion}
				userUnionChampions={userUnionChampions}
				userUnionChampionBadgeEffects={userUnionChampionBadgeEffects}
				userUnionArtifactEffects={userUnionArtifactEffects}
				userUnionRaiderStats={userUnionRaiderStats}
				unionStateStatPresetNo={unionStateStatPresetNo}
				unionStateStatPresets={unionStateStatPresets}
				userCodiItems={userCodiItems}
				codiPresetNo={codiPresetNo}
				userCodiPreset1={userCodiPreset1}
				userCodiPreset2={userCodiPreset2}
				userCodiPreset3={userCodiPreset3}
				userAchievement={userAchievement}
				userDojang={userDojang}
			/>
        </div>
    );
}
