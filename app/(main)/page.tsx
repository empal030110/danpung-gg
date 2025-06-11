import SearchBar from "@/components/SearchBar";
import Image from "next/image";
import dojang from "@/api/rank/dojang";

export default async function Home() {
	const dojangData = await dojang();
	const dojangUser = dojangData[0]['ranking'][0];

	return (
		<div className="w-full h-full">
			<div className="relative w-full h-[300px] flex items-center justify-center">
				<Image src="/main/header.png" alt="메인" sizes="(max-width: 768px) 100vw, 940px" fill style={{ objectFit: "cover" }} />
				<div className="relative w-full text-white text-[14px] flex flex-col gap-[16px] items-center justify-center text-center">
					<SearchBar />
				</div>
			</div>
			<div className="w-full h-auto">
				<div>
					<p>무릉도장 1위</p>
					<p>{dojangUser.character_name}</p>
					<p>{dojangUser.character_level}</p>
					<p>{dojangUser.class_name}</p>
					<p>{dojangUser.dojang_floor}</p>
				</div>
			</div>
		</div>
	);
}
