import SearchBar from "@/components/SearchBar";
import Image from "next/image";
import dojang from "@/api/rank/dojang";
import ocid from "@/api/ocid";
import user from "@/api/user/user";

export default async function Home() {
	// 무릉도장 1등 정보
	const dojangData = await dojang();
	const dojangUser = dojangData[0]['ranking'][0];

	// 무릉도장 1등에 대한 캐릭터 정보
	const dojangUserOcid = await ocid(dojangUser.character_name);
	const dojangUserInfo = await user(dojangUserOcid);

	return (
		<div className="w-full h-full">
			<div className="relative w-full h-[300px] flex items-center justify-center">
				<Image src="/main/header.png" alt="메인" sizes="(max-width: 768px) 100vw, 940px" fill style={{ objectFit: "cover" }} />
				<div className="relative w-full text-white text-[14px] flex flex-col gap-[16px] items-center justify-center text-center">
					<SearchBar />
				</div>
			</div>
			<div className="w-full h-auto mt-[40px] text-center">
				<div className="w-full max-w-[235px] flex flex-col items-center justify-center border border-yellow-400 rounded-[16px]">
					<p className="w-full p-[8px] border-b-[2px] border-neutral-600 text-[14px]">오늘 무릉도장 1위</p>
					<div className="w-full flex gap-[4px] items-center justify-center text-[12px] p-[8px] pt-[12px]">
						<p>{dojangUser.character_name}</p>
						<p>Lv.{dojangUser.character_level}</p>
						<p>{dojangUser.sub_class_name ? dojangUser.sub_class_name : dojangUser.class_name}</p>
					</div>
					<div>
						<Image src={dojangUserInfo.character_image} alt={dojangUser.character_name} width={96} height={96} />
					</div>
					<p className="w-full text-[18px] font-bold p-[8px] pb-[16px]">{dojangUser.dojang_floor}층</p>
					<div className="w-full border-t border-yellow-400 bg-yellow-400 font-bold p-[8px] rounded-b-[16px]">
						상세보기
					</div>
				</div>
			</div>
		</div>
	);
}
