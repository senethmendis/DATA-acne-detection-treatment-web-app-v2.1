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

			<Section className=" flex-row ">
				<div className="justify-center items-center flex flex-col gap-2">
					<h1 className="text-3xl md:px-0 my-3 md:my-0 px-4 md:text-5xl font-bold text-center md:text-start">
						Datection and Treatment for Acne
					</h1>
					<p className="text-wrap  md:text-left px-4 md:px-0 text-center  max-w-[400px]">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
						labore quaerat et. Maxime, quisquam nisi?
					</p>

					<Button className="md:max-w-[200px] w-[300px]">
						Discover <ArrowRight />
					</Button>
				</div>
			</Section>

			<Section
				style={{ backgroundImage: `url(${AboutPageImage.src})` }}
				className="hidden w-full bg-cover bg-center rounded-lg max-w-[1024px] mx-auto justify-center gap-5 items-center md:flex md:flex-row flex-col h-screen lg:h-[650px] md:px-5 lg:px-0"></Section>

			<Section className="w-full bg-gradient-to-r from-pink-500 to-violet-500 flex flex-col gap-10 justify-center items-center my-10 md:rounded-2xl py-10 md:py-0 ">
				<h1 className="text-2xl md:text-5xl font-bold text-wrap text-center  ">
					Get Your Accne Treatments <br />
					from AI-Powered <br />
					Skincare Sytem
				</h1>
				<div className="w-full mx-auto flex items-center justify-center gap-10">
					<Link href={"/about"}>
						<Button className="rounded-full  w-32  border-2 bg-transparent text-white font-bold border-white">
							Learn More
						</Button>
					</Link>
					<Button
						className="rounded-full w-32   border-2 font-bold border-white"
						onClick={() => router.push("/signin")}>
						Login
					</Button>
				</div>
			</Section>
		</main>
	);
};

export default Home;
