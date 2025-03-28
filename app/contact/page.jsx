import Section from "@/components/common/Section";
import { Button } from "@/components/ui/button";
import React from "react";
import { ContactImage, ContactPageImage } from "@/assets";
import ContactForm from "@/components/page/staticpages/ContactForm";

const ContactPage = () => {
	return (
		<>
			<Section className="flex flex-col sm:flex-row py-10 gap-5 sm:gap-0 px-2 md:px-0 lg:px-4 xl:px-0">
				<div className="w-full sm:w-1/2 flex flex-col justify-center px-4 sm:px-0">
					<h1 className="text-4xl sm:text-6xl">
						<span className="font-thin">Discover</span>{" "}
						<span className="font-bold">
							the <br className="hidden sm:block" /> Unexpected
						</span>
						<span className="font-thin">
							{" "}
							<br className="hidden sm:block" /> with
						</span>
						<span className="font-bold"> your Smart</span>
					</h1>
					<p className="py-5 text-sm sm:text-base">
						Lorem, ipsum dolor sit amet consectetur adipisicing elit.
						Reiciendis totam Lorem, ipsum dolor sit amet consectetur
						adipisicing elit. Reiciendis totam minus iure nostrum.
					</p>
				</div>
				<div
					className="w-full sm:w-1/2 flex flex-col items-center sm:items-end bg-cover bg-center rounded-2xl"
					style={{ backgroundImage: `url(${ContactImage.src})` }}>
					<Button className="m-5 bg-gradient-to-r from-pink-500 to-violet-500 font-bold">
						Get More Info
					</Button>
				</div>
			</Section>

			<Section className="flex flex-col gap-5 sm:gap-10 px-2 md:px-0 lg:px-4 xl:px-0 ">
				<div className="w-full flex flex-col sm:flex-row dark:bg-white bg-black h-auto sm:h-[250px] rounded-2xl dark:text-black text-white shadow-xl">
					<div className="w-full sm:w-1/2 flex justify-center items-center font-bold text-gray-300">
						<h1 className="text-6xl sm:text-[12rem] bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
							01
						</h1>
					</div>
					<div className="w-full sm:w-1/2 flex justify-start items-center px-4 sm:px-0">
						<h1 className="text-2xl sm:text-4xl text-start font-thin">
							CHOOSE <br />
							<span className="font-bold">
								THE RIGHT <br />
							</span>
							DIRECTION
						</h1>
					</div>
				</div>
				<div className="w-full flex flex-col sm:flex-row gap-5 sm:gap-10">
					<div className="w-full sm:w-1/2 dark:bg-white bg-black h-[200px] sm:h-[250px] rounded-2xl dark:text-black text-white shadow-xl"></div>
					<div className="w-full sm:w-1/2 dark:bg-white bg-black h-[200px] sm:h-[250px] rounded-2xl dark:text-black text-white shadow-xl"></div>
				</div>
			</Section>
			<Section className="flex flex-col sm:flex-row w-full h-full gap-5 sm:gap-0 px-2 md:px-0 lg:px-4 xl:px-0">
				<div
					className="w-full sm:w-1/2 flex flex-col items-center sm:items-end bg-cover bg-center rounded-2xl"
					style={{ backgroundImage: `url(${ContactPageImage.src})` }}></div>

				<div className="w-full sm:w-1/2 p-5 flex flex-col items-center justify-center">
					<ContactForm />
				</div>
			</Section>
		</>
	);
};

export default ContactPage;
