import SearchBar from "@/components/SearchBar";
import Image from "next/image";
import { dojangUrl, ocidUrl, userUrl, theseedUrl, achievementUrl } from "@/api/url/apiUrl";
import ssrFetcher from "@/api/ssrFetcher";

interface userProps {
	name: string,
	className: string,
	level: number,
	img: string,
	floor?: number,
	trophyGrade?: string,
	trophyScore?: number
};

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
	const theseedData = await await ssrFetcher(theseedUrl);
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
	const achievementData = await await ssrFetcher(achievementUrl);
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
				<div className="w-full max-w-[235px] flex flex-col items-center justify-center border border-yellow-400 rounded-[16px]">
					<p className="w-full p-[8px] border-b-[2px] border-yellow-400 text-[14px]">무릉도장 1위</p>
					<div className="w-full flex gap-[4px] items-center justify-center text-[12px] p-[8px] pt-[12px]">
						<p>{dojangUserInfoData.name}</p>
						<p>Lv.{dojangUserInfoData.level}</p>
						<p>{dojangUserInfoData.className}</p>
					</div>
					<div>
						<Image src={dojangUserInfoData.img} alt={dojangUserInfoData.name} width={96} height={96} />
					</div>
					<p className="w-full text-[18px] font-bold p-[8px] pb-[16px]">{dojangUserInfoData.floor}층</p>
					<div className="w-full border-t border-yellow-400 bg-yellow-400 font-bold p-[8px] rounded-b-[16px]">
						상세보기
					</div>
				</div>
				<div className="w-full max-w-[235px] flex flex-col items-center justify-center border border-green-400 rounded-[16px]">
					<p className="w-full p-[8px] border-b-[2px] border-green-400 text-[14px]">더시드 1위</p>
					<div className="w-full flex gap-[4px] items-center justify-center text-[12px] p-[8px] pt-[12px]">
						<p>{theseedUserInfoData.name}</p>
						<p>Lv.{theseedUserInfoData.level}</p>
						<p>{theseedUserInfoData.className}</p>
					</div>
					<div>
						<Image src={theseedUserInfoData.img} alt={theseedUserInfoData.name} width={96} height={96} />
					</div>
					<p className="w-full text-[18px] font-bold p-[8px] pb-[16px]">{theseedUserInfoData.floor}층</p>
					<div className="w-full border-t border-green-400 bg-green-400 font-bold p-[8px] rounded-b-[16px]">
						상세보기
					</div>
				</div>
				<div className="w-full max-w-[235px] flex flex-col items-center justify-center border border-blue-300 rounded-[16px]">
					<p className="w-full p-[8px] border-b-[2px] border-blue-300 text-[14px]">업적 1위</p>
					<div className="w-full flex gap-[4px] items-center justify-center text-[12px] p-[8px] pt-[12px]">
						<p>{achievementUserInfoData.name}</p>
						<p>Lv.{achievementUserInfoData.level}</p>
						<p>{achievementUserInfoData.className}</p>
					</div>
					<div>
						<Image src={achievementUserInfoData.img} alt={achievementUserInfoData.name} width={96} height={96} />
					</div>
					<p className="w-full text-[18px] font-bold p-[8px] pb-[16px] flex items-center justify-center gap-[2px]">{achievementUserInfoData.trophyGrade}<span className="text-[12px]">({achievementUserInfoData.trophyScore})</span></p>
					<div className="w-full border-t border-blue-300 bg-blue-300 font-bold p-[8px] rounded-b-[16px]">
						상세보기
					</div>
				</div>
			</div>
		</div>
	);
}
