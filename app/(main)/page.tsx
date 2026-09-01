import SearchBar from "@/components/SearchBar";
import Image from "next/image";
import { dojangUrl, ocidUrl, userUrl, theseedUrl, achievementUrl, noticeUrl, updateUrl } from "@/lib/url/apiUrl";
import ssrFetcher from "@/lib/ssrFetcher";
import ssrRankingFetcher from "@/lib/ssrRankingFetcher";
import { userProps } from "./props/props";
import RankBox from "./components/RankBox";
import InfomationBox from "./components/InformationBox";

export const dynamic = 'force-dynamic';

// 랭킹 1등 캐릭터의 ocid, 상세 정보까지 순서대로 조회 (이 3단계는 앞 결과가 있어야 다음을 조회할 수 있어 체인 내부는 순차 유지)
async function fetchTopRankUserInfo(rankingUrl: (date: string) => string) {
	const rankingData = await ssrRankingFetcher(rankingUrl);
	const rankingUser = rankingData[0]['ranking'][0];
	const userOcid = await ssrFetcher(ocidUrl(rankingUser.character_name));
	const userInfo = await ssrFetcher(userUrl(userOcid[0]['ocid']));
	return { rankingUser, userInfo };
}

export default async function Home() {
	// 무릉도장/더시드/업적 1등 조회와 공지/업데이트 조회는 서로 의존관계가 없어서 병렬로 요청
	const [
		{ rankingUser: dojangUser, userInfo: dojangUserInfo },
		{ rankingUser: theseedUser, userInfo: theseedUserInfo },
		{ rankingUser: achievementUser, userInfo: achievementUserInfo },
		noticeData,
		updateData,
	] = await Promise.all([
		fetchTopRankUserInfo(dojangUrl),
		fetchTopRankUserInfo(theseedUrl),
		fetchTopRankUserInfo(achievementUrl),
		ssrFetcher(noticeUrl), // 공지사항
		ssrFetcher(updateUrl), // 업데이트
	]);

	// 무릉도장 1등 정보
	const dojangUserInfoData: userProps = {
		name: dojangUserInfo[0].character_name,
		level: dojangUserInfo[0].character_level,
		className: dojangUserInfo[0].character_class,
		img: dojangUserInfo[0].character_image,
		floor: dojangUser.dojang_floor ? dojangUser.dojang_floor : 0,
	};

	// 더시드 1등 정보
	const theseedUserInfoData: userProps = {
		name: theseedUserInfo[0].character_name,
		level: theseedUserInfo[0].character_level,
		className: theseedUserInfo[0].character_class,
		img: theseedUserInfo[0].character_image,
		floor: theseedUser.theseed_floor ? theseedUser.theseed_floor : 0,
	};

	// 업적 1등 정보
	const achievementUserInfoData: userProps = {
		name: achievementUserInfo[0].character_name,
		level: achievementUserInfo[0].character_level,
		className: achievementUserInfo[0].character_class,
		img: achievementUserInfo[0].character_image,
		trophyGrade: achievementUser.trophy_grade ? achievementUser.trophy_grade : 0,
		trophyScore: achievementUser.trophy_score ? achievementUser.trophy_score : 0,
	};

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
