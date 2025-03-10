import Section from "@/components/common/Section";
import { Button } from "@/components/ui/button";
import React from "react";
import { ContactImage, ContactPageImage } from "@/assets";
import ContactForm from "@/components/page/staticpages/ContactForm";

const ContactPage = () => {
	return (
		<>
			<Section className="flex flex-row py-10">
				<div className="w-1/2 flex flex-col justify-center">
					<h1 className="text-6xl">
						<span className="font-thin">Discover</span>{" "}
						<span className="font-bold">
							the <br /> Unexpected
						</span>
						<span className="font-thin">
							{" "}
							<br /> with
						</span>
						<span className="font-bold"> your Smart</span>
					</h1>
					<p className="py-5">
						Lorem, ipsum dolor sit amet consectetur adipisicing elit.
						Reiciendis totam Lorem, ipsum dolor sit amet consectetur
						adipisicing elit. Reiciendis totam minus iure nostrum.
					</p>
				</div>
				<div
					className="w-1/2 flex flex-col items-end bg-cover bg-center rounded-2xl  "
					style={{ backgroundImage: `url(${ContactImage.src})` }}>
					<Button className="m-5 bg-gradient-to-r from-pink-500 to-violet-500 font-bold">
						Get More Info
					</Button>
				</div>
			</Section>

			<Section className="flex flex-col gap-10">
				<div className="w-full flex flex-row dark:bg-white bg-black h-[250px] rounded-2xl dark:text-black text-white  shadow-xl">
					<div className="w-1/2 flex justify-center items-center font-bold text-gray-300">
						<h1 className="text-[12rem] bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
							01
						</h1>
					</div>
					<div className="w-1/2 justify-start items-center flex">
						<h1 className="text-4xl text-start font-thin">
							CHOOSE <br />
							<span className="font-bold">
								THE RIGHT <br />
							</span>
							DIRECTION
						</h1>
					</div>
				</div>
				<div className="w-full flex flex-row  h-[250px] rounded-2xl dark:text-black text-white  shadow-xl gap-10">
					<div className="w-1/2 flex justify-center items-center font-bold  dark:bg-white bg-black h-[250px] rounded-2xl dark:text-black text-white  shadow-xl"></div>
					<div className="w-1/2 justify-start items-center flex dark:bg-white bg-black h-[250px] rounded-2xl dark:text-black text-white  shadow-xl"></div>
				</div>
			</Section>
			<Section className="flex flex-row w-full h-full">
				<div
					className="w-1/2 flex flex-col items-end bg-cover bg-center rounded-2xl  "
					style={{ backgroundImage: `url(${ContactPageImage.src})` }}></div>

				<div className="w-1/2 p-5 flex flex-col items-center justify-center">
					<ContactForm />
				</div>
			</Section>
		</>
	);
};

export default ContactPage;
