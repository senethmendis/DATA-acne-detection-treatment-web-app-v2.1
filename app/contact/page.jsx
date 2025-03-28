import Section from "@/components/common/Section";
import { Button } from "@/components/ui/button";
import React from "react";
import { ContactImage, ContactPageImage } from "@/assets";
import ContactForm from "@/components/page/staticpages/ContactForm";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

const ContactPage = () => {
	return (
		<>
			<Section className="flex flex-col mt-5 sm:flex-row py-10 gap-5 sm:gap-0 px-2 md:px-0 lg:px-4 xl:px-0 relative">
				<div className="pink__gradient w-[200px] h-[200px] absolute" />
				<div className="w-full sm:w-2/3 flex flex-col justify-center px-4 sm:px-0">
					{" "}
					{/* Changed width to 2/3 */}
					<h1 className="text-3xl sm:text-5xl">
						<br className="hidden sm:block" />{" "}
						<span className="font-bold flex flex-col justify-start items-start">
							<TextHoverEffect
								text="Ai"
								className="text-lg shadow-md"
							/>
							<TextHoverEffect
								text="Powered"
								className="text-lg shadow-md"
							/>
						</span>
						<span className="font-bold">Smart system for you</span>
					</h1>
					<p className="py-5 text-xs sm:text-sm">
						Our platform leverages cutting-edge AI technology to analyze your
						skin condition and provide tailored acne treatment suggestions. We
						aim to empower users with actionable insights and effective
						solutions for healthier, clearer skin.
					</p>
					<p className="py-5 text-sm sm:text-base">
						This is an AI-powered acne treatment suggestion platform that
						analyzes user data and provides personalized treatment
						recommendations to help users achieve healthier skin.
					</p>
				</div>
				<div
					className="w-full sm:w-1/3 flex flex-col items-center sm:items-start bg-cover bg-center rounded-2xl"
					style={{ backgroundImage: `url(${ContactImage.src})` }}>
					<Button className="m-5 bg-gradient-to-r from-pink-500 to-violet-500 font-bold">
						Get More Info
					</Button>
				</div>
			</Section>

			<Section className="flex flex-col gap-2 sm:gap-5 px-2 md:px-0 lg:px-4 xl:px-0">
				{" "}
				{/* Reduced gap */}
				<div className="w-full flex flex-col sm:flex-row dark:bg-white bg-black h-auto sm:h-[200px] rounded-2xl dark:text-black text-white shadow-xl">
					{" "}
					{/* Reduced height */}
					<div className="w-full sm:w-1/3 flex justify-center items-center font-bold text-gray-300">
						{" "}
						{/* Changed width */}
						<h1 className="text-4xl sm:text-[8rem] bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
							{" "}
							{/* Reduced font size */}
							01
						</h1>
					</div>
					<div className="w-full sm:w-2/3 flex justify-start items-center px-4 sm:px-0">
						{" "}
						{/* Changed width */}
						<h1 className="text-xl sm:text-3xl text-start font-thin">
							{" "}
							{/* Reduced font size */}
							CHOOSE <br />
							<span className="font-bold">
								THE RIGHT <br />
							</span>
							DIRECTION
						</h1>
					</div>
				</div>
				<div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-5">
					{" "}
					{/* Reduced gap */}
					<div className="w-full sm:w-1/3 dark:bg-white bg-black h-[150px] sm:h-[200px] rounded-2xl dark:text-black text-white shadow-xl flex flex-col justify-center items-center px-4">
						{" "}
						{/* Reduced height and width */}
						<h2 className="text-lg sm:text-xl font-bold">
							{" "}
							{/* Reduced font size */}
							AI-Powered Insights
						</h2>
						<p className="text-xs sm:text-sm text-center">
							{" "}
							{/* Reduced text size */}
							Our advanced AI algorithms analyze your skin condition and
							provide actionable insights to guide you toward effective acne
							treatments.
						</p>
					</div>
					<div className="w-full sm:w-2/3 dark:bg-white bg-black h-[150px] sm:h-[200px] rounded-2xl dark:text-black text-white shadow-xl flex flex-col justify-center items-center px-4">
						{" "}
						{/* Changed width */}
						<h2 className="text-lg sm:text-xl font-bold">
							{" "}
							{/* Reduced font size */}
							Personalized Recommendations
						</h2>
						<p className="text-xs sm:text-sm text-center">
							{" "}
							{/* Reduced text size */}
							Receive tailored treatment plans designed specifically for
							your skin type and condition, ensuring optimal results.
						</p>
					</div>
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
