import { abilityUrl, itemUrl, ocidUrl, setUrl, userUrl, androidUrl, symbolUrl, petUrl } from "@/api/url/apiUrl";
import { androidProps, itemProps, titleProps, userDataProps, userNameProps, userSetProps, symbolProps, petProps } from "../userProps/props";
import ssrFetcher from "@/api/ssrFetcher";
import UserHeader from "./components/UserHeader";
import UserItemTabs from "./components/UserItemTabs";

export default async function SearchPage({ params }: userNameProps) {
    const { name } = await params;
    const userName = decodeURIComponent(name);

    const userOcidUrl = ocidUrl(userName);
    const userOcid = await ssrFetcher(userOcidUrl);
    const userInfoUrl = userUrl(userOcid[0]['ocid']);
    const userInfoDataInfo = await ssrFetcher(userInfoUrl);
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
	const userSetUrl = setUrl(userOcid[0]['ocid']);
	const userSetData = await ssrFetcher(userSetUrl);
	const userSetEffect: userSetProps[] = userSetData[0].set_effect;

	// 심볼
	const userSymbolUrl = symbolUrl(userOcid[0]['ocid']);
	const userSymbolData = await ssrFetcher(userSymbolUrl);
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

	// 어빌리티
	const userAbilityUrl = abilityUrl(userOcid[0]['ocid']);
	const userAbilityData = await ssrFetcher(userAbilityUrl);
	const abilityPresetNumber = userAbilityData[0].preset_no;
	const abilityPreset1 = userAbilityData[0].ability_preset_1;
	const abilityPreset2 = userAbilityData[0].ability_preset_2;
	const abilityPreset3 = userAbilityData[0].ability_preset_3;
	
	// 장착한 아이템
	const userItemUrl = itemUrl(userOcid[0]['ocid'])
	const userItemData = await ssrFetcher(userItemUrl);
	const presetNumber = userItemData[0].preset_no;
	const userItemPreset1: itemProps[] = userItemData[0].item_equipment_preset_1.map((item: itemProps) => ({
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
	}));
	const userItemPreset2: itemProps[] = userItemData[0].item_equipment_preset_2.map((item: itemProps) => ({
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
	}));
	const userItemPreset3: itemProps[] = userItemData[0].item_equipment_preset_3.map((item: itemProps) => ({
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
	}));

	// 장착한 칭호 (title)
	const title: titleProps[] = [
		{
			title_name: userItemData[0].title?.title_name,
			title_icon: userItemData[0].title?.title_icon,
		}
	];

	// 장착한 안드로이드
	const userAndroidUrl = androidUrl(userOcid[0]['ocid']);
	const userAndroidData = await ssrFetcher(userAndroidUrl);
	const userAndroid: androidProps[] = userAndroidData.map(item => ({
		android_name: item.android_name,
		android_icon: item.android_icon,
	}));

	// 장착한 펫
	const userPetUrl = petUrl(userOcid[0]['ocid']);
	const userPetData = await ssrFetcher(userPetUrl);
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


    return (
        <div className="w-full h-auto pb-[40px]">
			<div className="w-full px-[20px] py-[32px]">
				<UserHeader data={userData} ocid={userOcid[0]['ocid']} />
			</div>
			<UserItemTabs
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
			/>
        </div>
    );
}
