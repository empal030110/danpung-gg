import SearchBar from "@/components/SearchBar";
import Image from "next/image";
import { dojangUrl, ocidUrl, userUrl, theseedUrl, achievementUrl, noticeUrl, updateUrl } from "@/api/url/apiUrl";
import ssrFetcher from "@/api/ssrFetcher";
import { userProps } from "./props/props";
import RankBox from "./components/RankBox";
import InfomationBox from "./components/InformationBox";

export default async function Home() {
	// 무릉도장 1등 정보
	const dojangData = await ssrFetcher(dojangUrl);
	const dojangUser = dojangData[0]['ranking'][0];
	const dojangUserOcidUrl = ocidUrl(dojangUser.character_name);
	const dojangUserOcid = await ssrFetcher(dojangUserOcidUrl);
	const dojangUserInfoUrl = userUrl(dojangUserOcid[0]['ocid']);
	const dojangUserInfo = await ssrFetcher(dojangUserInfoUrl);
	const dojangUserInfoData: userProps = {
		name: dojangUserInfo[0].character_name,
		level: dojangUserInfo[0].character_level,
		className: dojangUserInfo[0].character_class,
		img: dojangUserInfo[0].character_image,
		floor: dojangUser.dojang_floor ? dojangUser.dojang_floor : 0,
	};

	// 더시드 1등 정보
	const theseedData = await ssrFetcher(theseedUrl);
	const theseedUser = theseedData[0]['ranking'][0];
	const theseedOcidUrl = ocidUrl(theseedUser.character_name);
	const theseedUserOcid = await ssrFetcher(theseedOcidUrl);
	const theseedUserInfoUrl = userUrl(theseedUserOcid[0]['ocid']);
	const theseedUserInfo = await ssrFetcher(theseedUserInfoUrl);
	const theseedUserInfoData: userProps = {
		name: theseedUserInfo[0].character_name,
		level: theseedUserInfo[0].character_level,
		className: theseedUserInfo[0].character_class,
		img: theseedUserInfo[0].character_image,
		floor: theseedUser.theseed_floor ? theseedUser.theseed_floor : 0,
	};

	// 업적 1등 정보
	const achievementData = await ssrFetcher(achievementUrl);
	const achievementUser = achievementData[0]['ranking'][0];
	const achievementOcidUrl = ocidUrl(achievementUser.character_name);
	const achievementUserOcid = await ssrFetcher(achievementOcidUrl);
	const achievementUserInfoUrl = userUrl(achievementUserOcid[0]['ocid']);
	const achievementUserInfo = await ssrFetcher(achievementUserInfoUrl);
	const achievementUserInfoData: userProps = {
		name: achievementUserInfo[0].character_name,
		level: achievementUserInfo[0].character_level,
		className: achievementUserInfo[0].character_class,
		img: achievementUserInfo[0].character_image,
		trophyGrade: achievementUser.trophy_grade ? achievementUser.trophy_grade : 0,
		trophyScore: achievementUser.trophy_score ? achievementUser.trophy_score : 0,
	};

	// 공지, 업데이트 정보
	const noticeData = await ssrFetcher(noticeUrl); // 공지사항
	const updateData = await ssrFetcher(updateUrl); // 업데이트

	return (
		<div className="w-full h-full">
			<div className="relative w-full h-[300px] flex items-center justify-center">
				<Image src="/main/header.png" alt="메인" sizes="(max-width: 768px) 100vw, 940px" fill style={{ objectFit: "cover" }} />
				<div className="relative w-full text-white text-[14px] flex flex-col gap-[16px] items-center justify-center text-center">
					<SearchBar />
				</div>
			</div>
			<div className="w-full h-auto mt-[40px] text-center flex gap-[16px] flex-col items-center justify-center pc:flex-row">
				{/* 랭킹 box */}
				<RankBox data={dojangUserInfoData} color="yellow" rankingTitle={'무릉도장'} />
				<RankBox data={theseedUserInfoData} color="green" rankingTitle={'더시드'} />
				<RankBox data={achievementUserInfoData} color="blue" rankingTitle={'업적'} />
			</div>
			<div className="w-full h-auto mt-[40px] pb-[40px]">
				<div className="w-full flex flex-col gap-[16px] items-center justify-center pc:flex-row pc:gap-[32px]">
					<InfomationBox data={noticeData[0].notice.slice(0, 5)} InfomationTitle={'공지사항'} />
					<InfomationBox data={updateData[0].update_notice.slice(0, 5)} InfomationTitle={'업데이트'} />
				</div>
			</div>
		</div>
	);
}
