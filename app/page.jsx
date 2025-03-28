"use client";
import Section from "@/components/common/Section";
import { Button } from "@/components/ui/button";
import { SectionImage, AboutPageImage } from "@/assets";
import { useToast } from "@/hooks/use-toast";
import UploadImageComponent from "@/components/page/home/UploadImageComponent";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { SparklesCore } from "@/components/ui/sparkles";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

const words = [
	{
		text: "AI-Powered",
		className: "text-blue-500 dark:text-orange-500",
	},
	{
		text: "Acne",
	},
	{
		text: "And",
	},
	{
		text: "Skincare Sytem.",
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
		<main className="max-w-[1024px] w-full mx-auto">
			{hide && <UploadImageComponent />}

			<Section className="relative flex-col items-center gap-5 flex justify-center mb-10">
				<h1 className="md:text-7xl text-3xl lg:text-5xl font-bold text-center dark:text-white ">
					Datection and Treatment for Acne
				</h1>
				<p className="text-2xl  px-4 md:px-0 text-center  ">
					<span className="font-semibold bg-gradient-to-l from-pink-600 bg-clip-text text-transparent to-purple-500">
						AI-powered{" "}
					</span>
					website that analyzes facial images to detect acne, <br /> assess its
					severity, and provide personalized insights.
				</p>

				<Link href={"/about"}>
					<Button className="md:max-w-[200px] w-[300px] hover:bg-pink-600 transition-all ease-out hover:text-white">
						Discover <ArrowRight />
					</Button>
				</Link>

				<div className="aqua__gradient w-[40%] h-[40%] absolute -z-40" />
			</Section>

			<Section className="dark:bg-black/50 backdrop-blur-lg  relative w-full border flex flex-col gap-10 justify-center items-center my-10 md:rounded-2xl py-10 md:py-0 ">
				<TypewriterEffectSmooth words={words} />

				<div className="w-full mx-auto flex items-center justify-center gap-10">
					<Link href={"/about"}>
						<Button className="shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] px-8 py-2 bg-[#0070f3] rounded-full text-white font-light transition duration-200 ease-linear">
							Learn More
						</Button>
					</Link>
					<Button
						className="shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] px-8 py-2 bg-[#0070f3] rounded-full text-white font-light transition duration-200 ease-linear"
						onClick={() => router.push("/signin")}>
						Login
					</Button>
				</div>

				<div className="pink__gradient w-[400px] h-[400px] absolute -z-50" />
			</Section>
		</main>
	);
};

export default Home;
