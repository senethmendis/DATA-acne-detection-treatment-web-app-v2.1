"use client";
import Section from "@/components/common/Section";
import { Button } from "@/components/ui/button";
import { SectionImage, AboutPageImage } from "@/assets";
import { useToast } from "@/hooks/use-toast";
import UploadImageComponent from "@/components/page/home/UploadImageComponent";
import { useAuthContext } from "@/context/AuthContext";
import { use, useEffect, useState } from "react";
import { signOutUser } from "@/utils/signOut";
import { useRouter } from "next/navigation";
import { ArrowBigRight, ArrowDownRightIcon, ArrowRight } from "lucide-react";

const Home = () => {
	const { toast } = useToast();
	const { user } = useAuthContext();
	const router = useRouter();
	const [hide, setHide] = useState(false);

	const handleSignOut = async () => {
		const { success, message } = await signOutUser();

		if (success) {
			toast({
				title: message,
			});
			setHide(false);
		} else {
			toast({
				title: message,
			});
		}
	};

	useEffect(() => {
		if (user) {
			setHide(true);
		}
	}, []);

	return (
		<main className="max-w-[1024px] w-full mx-auto">
			{hide && <UploadImageComponent />}

			<Section className="flex flex-row my-10">
				<div className="w-1/2 h-full flex flex-col items-start justify-center">
					<div className=" flex flex-col gap-2">
						<h1 className="text-5xl font-bold">
							Datection and Treatment for Acne
						</h1>
						<p className="text-wrap max-w-[400px]">
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Sapiente labore quaerat et. Maxime, quisquam nisi?
						</p>

						<Button className="max-w-[200px]">
							Discover <ArrowRight />
						</Button>
					</div>
				</div>
				<div
					className="w-1/2 h-full  bg-cover bg-center rounded-2xl"
					style={{ backgroundImage: `url(${SectionImage.src})` }}></div>
			</Section>

			<Section
				style={{ backgroundImage: `url(${AboutPageImage.src})` }}
				className="w-full bg-cover bg-center rounded-lg max-w-[1024px] mx-auto justify-center gap-5 items-center flex md:flex-row flex-col h-screen lg:h-[650px] md:px-5 lg:px-0">
				<Button onClick={() => router.push("/signin")}>Login Page</Button>
				<Button
					onClick={() => {
						toast({
							description: "Friday, February 10, 2023 at 5:57 PM",
						});
					}}>
					Show Toast
				</Button>
				<Button
					onClick={handleSignOut}
					className="font-bold text-xl bg-gradient-to-r from-pink-500 to-violet-500 text-white hover:from-pink-600 hover:to-violet-600">
					Sign Out
				</Button>
			</Section>

			<Section className="w-full bg-gradient-to-r from-pink-500 to-violet-500 flex flex-col gap-10 justify-center items-center my-10 rounded-2xl">
				<h1 className="text-5xl font-bold text-wrap text-center ">
					Get Your Accne Treatments <br />
					from AI-Powered <br />
					Skincare Sytem
				</h1>
				<div className="w-full mx-auto flex items-center justify-center gap-10">
					<Button className="rounded-full  w-32  border-2 bg-transparent text-white font-bold border-white">
						Sign Out
					</Button>
					<Button className="rounded-full w-32   border-2 font-bold border-white">
						Sign Out
					</Button>
				</div>
			</Section>
		</main>
	);
};

export default Home;
