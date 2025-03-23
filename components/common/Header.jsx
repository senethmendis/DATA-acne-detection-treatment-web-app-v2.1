import { DataLogoDark } from "@/assets";
import { DataLogoLight } from "@/assets";
import { NAVBARITEMS } from "@/constants";
import Link from "next/link";
import RightSidePanel from "@/components/RightSidePanel";
import { ModeToggle } from "@/components/ModeToggle";

const Header = () => {
	return (
		<header className="max-w-[1024px] mx-auto w-full flex flex-row px-5 sm:px-0 md:px-5 lg:px-5 xl:px-0">
			<nav className="w-full flex flex-row items-center justify-between py-3">
				<Link href={"/"}>
					<DataLogoDark className="w-10 h-10" />
				</Link>

				<div className="flex gap-10">
					<ul className=" gap-10 items-center hidden md:flex">
						{NAVBARITEMS.map((item, i) => (
							<li key={i}>
								<Link
									href={item.link}
									className="font-medium hover:underline">
									{item.name}
								</Link>
							</li>
						))}
					</ul>
					<ModeToggle />
					<RightSidePanel />
				</div>
			</nav>
		</header>
	);
};

export default Header;
