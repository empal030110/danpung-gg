import { abilityUrl, itemUrl, ocidUrl, setUrl, userUrl } from "@/api/url/apiUrl";
import { itemProps, userDataProps, userNameProps, userSetProps } from "../userProps/props";
import ssrFetcher from "@/api/ssrFetcher";
import UserHeader from "./components/UserHeader";
import UserStat from "./components/UserSet";
import UserAbility from "./components/UserAbility";
import UserItem from "./components/UserItem";

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

	// 어빌리티
	const userAbilityUrl = abilityUrl(userOcid[0]['ocid']);
	const userAbilityData = await ssrFetcher(userAbilityUrl);
	const abilityPreset1 = userAbilityData[0].ability_preset_1;
	const abilityPreset2 = userAbilityData[0].ability_preset_2;
	const abilityPreset3 = userAbilityData[0].ability_preset_3;
	
	// 장착한 아이템
	const userItemUrl = itemUrl(userOcid[0]['ocid'])
	const userItemData = await ssrFetcher(userItemUrl);
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
	}));

    return (
        <div className="w-full h-auto pb-[40px]">
			<div className="w-full px-[20px] py-[32px]">
				<UserHeader data={userData} ocid={userOcid[0]['ocid']} />
			</div>
			<div className="flex gap-[16px] flex-col pc:flex-row">
				<div className="flex flex-col flex-auto gap-[16px] w-full pc:max-w-[320px]">
					<div className="w-full py-[16px] px-[48px] bg-gray-200 rounded-[8px] flex justify-center dark:bg-neutral-800 m-auto pc:m-0">
						<UserStat data={userSetEffect} />
					</div>
					<div className="w-full py-[16px] px-[20px] bg-gray-200 rounded-[8px] flex justify-center dark:bg-neutral-800 m-auto pc:m-0">
						<UserAbility preset1={abilityPreset1} preset2={abilityPreset2} preset3={abilityPreset3} />
					</div>
				</div>
				<div className="w-full bg-gray-200 rounded-[8px] dark:bg-neutral-800">
					<UserItem preset1={userItemPreset1} preset2={userItemPreset2} preset3={userItemPreset3} />
				</div>
			</div>
        </div>
    );
}
