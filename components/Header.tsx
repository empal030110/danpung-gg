import Image from "next/image";
import ThemeBtn from "./header/ThemeBtn";
import HeaderSearchBar from "./header/HeaderSearchBar";
import Link from "next/link";
import NavBar from "./header/NavBar";

export default function Header() {
	return (
		<header className="w-full max-w-[940px] m-auto pt-[16px] flex flex-col gap-[16px]">
            <div className="w-full flex flex-col gap-[12px]">
				<div className="w-full flex items-center justify-between gap-[12px]">
					<Link href='/'><Image src={"/logo.png"} alt={"단풍지지"} width={120} height={25} className="dark:invert" /></Link>
					<div className="w-full max-w-[540px] hidden pc:block"><HeaderSearchBar/></div>
					<ThemeBtn />
				</div>
				<div className="w-full flex justify-center pc:hidden">
					<HeaderSearchBar />
				</div>
			</div>
			<NavBar />
			<div className="py-[16px] border-t border-neutral-600"></div>
		</header>
	);
}
