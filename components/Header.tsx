import Image from "next/image";
import ThemeBtn from "./header/ThemeBtn";
// import NavBar from "./header/NavBar";

export default function Header() {
	return (
		<div className="w-full max-w-[940px] m-auto pt-[16px] flex flex-col gap-[16px]">
            <div className="w-full flex items-center justify-between">
            	<Image src={"/logo.png"} alt={"단풍지지"} width={120} height={25} className="dark:invert" />
				<ThemeBtn />
			</div>
			{/* <NavBar /> */}
			<div className="py-[16px] border-t border-neutral-600"></div>
		</div>	
	);
}
