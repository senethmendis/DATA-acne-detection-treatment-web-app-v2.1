"use client";
import Section from "@/components/common/Section";
import UploadImageComponent from "@/components/page/home/UploadImageComponent";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { AnimatePresence, motion } from "framer-motion";

const words = [
	{
		text: "✨ AI",
		className: "text-blue-500 dark:text-orange-500",
	},
	{
		text: "-",
		className: "text-blue-500 dark:text-orange-500",
	},

	{
		text: "Powered",
		className: "text-blue-500 dark:text-orange-500",
	},
];

const Home = () => {
	const { user } = useAuthContext();
	const router = useRouter();
	const [hide, setHide] = useState(false);

	useEffect(() => {
		if (user) {
			setHide(true);
		}
	}, []);

	return (
		<main className="max-w-[1024px] w-full mx-auto px-4 sm:px-0">
			{/* image upload and porcess */}
			<AnimatePresence>{hide && <UploadImageComponent />}</AnimatePresence>

			<Section className="relative flex-col items-center gap-5 flex justify-center mb-10">
				<h1 className="md:text-7xl text-3xl lg:text-5xl font-bold text-center dark:text-white">
					Datection and Treatment for Acne
				</h1>
				<p className="text-lg sm:text-2xl px-2 sm:px-0 text-center">
					<span className="font-semibold bg-gradient-to-l from-pink-600 bg-clip-text text-transparent to-purple-500">
						AI-powered{" "}
					</span>
					website that analyzes facial images to detect acne,{" "}
					<br className="hidden sm:block" /> assess its severity, and provide
					personalized insights.
				</p>

				<Link href={"/about"}>
					<motion.button
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.8 }}
						className="w-auto py-2 px-6 rounded-md  bg-pink-600 flex gap-2 transition-all ease-out hover:text-white">
						Discover <ArrowRight />
					</motion.button>
				</Link>

				<div className="aqua__gradient w-[60%] sm:w-[40%] h-[60%] sm:h-[40%] absolute -z-40" />
			</Section>
			<Section className="dark:bg-black/50 backdrop-blur-lg relative w-full border flex flex-col gap-8 sm:gap-10 justify-center items-center my-10 rounded-2xl py-8 sm:py-10">
				<h1 className="text-xl sm:text-3xl md:text-5xl mx-auto flex flex-col justify-center font-bold text-center dark:text-white">
					<TypewriterEffectSmooth
						className={"text-2xl font-bold mx-auto"}
						words={words}
					/>
					<span className="block mt-2 text-wrap">
						Acne and Skin Treatment System
					</span>
				</h1>

				<div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
					<Link href={"/about"}>
						<motion.button
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.8 }}
							className="w-full sm:w-auto shadow-md hover:shadow-lg hover:bg-blue-600 px-6 py-3 bg-blue-500 rounded-full text-white font-medium transition duration-200 text-center">
							Learn More
						</motion.button>
					</Link>
					<motion.button
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.8 }}
						className="w-full sm:w-auto  shadow-md hover:shadow-lg hover:bg-blue-600 px-6 py-3 bg-blue-500 rounded-full text-white font-medium  text-center"
						onClick={() => router.push("/signin")}>
						Login
					</motion.button>
				</div>

				<div className="pink__gradient w-[150px] sm:w-[300px] h-[150px] sm:h-[300px] absolute -z-50" />
			</Section>
		</main>
	);
};

export default Home;
