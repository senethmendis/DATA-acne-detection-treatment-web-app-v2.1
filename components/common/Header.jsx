import { DataLogoDark } from "@/assets";
import { DataLogoLight } from "@/assets";
import { NAVBARITEMS } from "@/constants";
import Link from "next/link";
import RightSidePanel from "@/components/RightSidePanel";
import { ModeToggle } from "@/components/ModeToggle";
import { useState, useEffect, useRef } from "react";
import { Menu, Undo } from "lucide-react";
import { ArrowArt } from "@/assets/icons";
import Image from "next/image";
import { useAuthContext } from "@/context/AuthContext";

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { user } = useAuthContext();
	const menuRef = useRef(null);
	const [hide, setHide] = useState(false);

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

	useEffect(() => {
		if (!user) {
			setHide(false);
		} else {
			setHide(true);
		}
	}, [user]);

	return (
		<header className="max-w-[1024px] mx-auto w-full flex flex-row px-5 sm:px-0 md:px-5 lg:px-5 xl:px-0 relative">
			{/* Render only if hide is false */}
			{!hide && (
				<div className="absolute right-0 w-[20%] top-10">
					<Image
						alt="arrow"
						src={ArrowArt}
						className="dark:invert"
					/>
				</div>
			)}
			<nav className="w-full flex flex-row items-center justify-between py-3">
				<Link href={"/"}>
					<DataLogoLight className="w-10 h-10 hidden dark:block" />
					<DataLogoDark className="w-10 h-10 dark:hidden" />
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
