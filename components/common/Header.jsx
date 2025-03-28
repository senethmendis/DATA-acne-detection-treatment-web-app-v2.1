import { DataLogoDark } from "@/assets";
import { DataLogoLight } from "@/assets";
import { NAVBARITEMS } from "@/constants";
import Link from "next/link";
import RightSidePanel from "@/components/RightSidePanel";
import { ModeToggle } from "@/components/ModeToggle";
import { useState, useEffect, useRef } from "react";
import { Menu } from "lucide-react";

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const menuRef = useRef(null);

	// Close menu when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (menuRef.current && !menuRef.current.contains(event.target)) {
				setIsMenuOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<header className="max-w-[1024px] mx-auto w-full flex flex-row px-5 sm:px-0 md:px-5 lg:px-5 xl:px-0">
			<nav className="w-full flex flex-row items-center justify-between py-3">
				<Link href={"/"}>
					<DataLogoDark className="w-10 h-10" />
				</Link>

				<div className="flex items-center gap-5">
					{/* Desktop Navigation */}
					<ul className="hidden md:flex gap-8 items-center">
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

					{/* Mobile Menu Toggle */}
					<button
						className="md:hidden focus:outline-none"
						onClick={() => setIsMenuOpen(!isMenuOpen)}>
						<span className="material-icons text-2xl">
							<Menu />
						</span>
					</button>

					{/* Mode Toggle and Right Panel */}
					<div className="flex items-center gap-3">
						<ModeToggle />
						<RightSidePanel />
					</div>
				</div>
			</nav>

			{/* Mobile Navigation */}
			{isMenuOpen && (
				<ul
					ref={menuRef}
					className="flex absolute right-12 z-50 top-14 flex-col gap-4 mt-3 md:hidden bg-white dark:bg-black p-4 rounded-lg shadow-md">
					{NAVBARITEMS.map((item, i) => (
						<li key={i}>
							<Link
								href={item.link}
								className="block font-medium hover:underline">
								{item.name}
							</Link>
						</li>
					))}
				</ul>
			)}
		</header>
	);
};

export default Header;
