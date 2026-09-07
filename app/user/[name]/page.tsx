import { abilityUrl, itemUrl, ocidUrl, setUrl, userUrl, androidUrl, symbolUrl, petUrl, hyperStatUrl, statUrl, skillUrl, hexaStatUrl, linkSkillUrl, unionUrl, unionChampionUrl, unionArtifactUrl, unionRaiderUrl, cashItemEquipmentUrl, achievementUrl, dojangUrl } from "@/lib/url/apiUrl";
import { userNameProps } from "../userProps/props";
import ssrFetcher from "@/lib/ssrFetcher";
import ssrRankingFetcher from "@/lib/ssrRankingFetcher";
import runLimited from "@/lib/runLimited";
import { mapUserPageData } from "./utils/mapUserData";
import UserHeader from "./components/UserHeader";
import UserInfoTabs from "./components/UserInfoTabs";
import type { Metadata } from "next";

// 페이지 본문과 동일한 URL로 fetch하기 때문에 Next.js가 자동으로 요청을 중복 제거함(추가 API 호출 없음)
export async function generateMetadata({ params }: userNameProps): Promise<Metadata> {
    const { name } = await params;
    const userName = decodeURIComponent(name);

    try {
        const userOcid = await ssrFetcher(ocidUrl(userName));
        const userInfo = await ssrFetcher(userUrl(userOcid[0]['ocid']));
        const info = userInfo[0];

        const title = `${info.character_name} - Lv.${info.character_level} ${info.character_class} (${info.world_name}) | 단풍지지`;
        const description = `${info.character_name}(${info.world_name}) 캐릭터의 스탯, 장비, 스킬, 유니온 정보를 단풍지지에서 확인하세요.`;

        return { title, description, openGraph: { title, description } };
    } catch {
        return {
            title: `${userName} - 단풍지지`,
            description: `${userName} 캐릭터의 스탯, 장비, 스킬 정보를 단풍지지에서 확인하세요.`,
        };
    }
}

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

    // 넥슨 API 원본 응답 20종을 화면에서 쓰는 형태로 가공하는 로직은 mapUserData.ts로 분리
    const {
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
    } = mapUserPageData({
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
    });

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "홈", item: "https://www.danpung.shop" },
            { "@type": "ListItem", position: 2, name: `${userData.characterName} 캐릭터 정보`, item: `https://www.danpung.shop/user/${encodeURIComponent(userData.characterName)}` },
        ],
    };

    return (
        <div className="w-full h-auto pb-[40px]">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
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
