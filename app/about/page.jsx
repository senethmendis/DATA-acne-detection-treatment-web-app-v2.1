import Section from "@/components/common/Section";
import React from "react";
import { SERVICES } from "@/constants";
import { AboutPageImage1, AboutPageImage, AboutPageImage2 } from "@/assets";
import { Button } from "@/components/ui/button";
import { Link2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

const AboutPage = () => {
	const tabs = [
		{
			title: "Product",
			value: "product",
			content: (
				<div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
					<p className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-500">
						Revolutionizing Acne Detection with AI
					</p>
					<p className="text-lg md:text-2xl font-light mt-4">
						Our AI-powered acne detection application analyzes skin conditions
						in real time and provides personalized treatment recommendations.
						Simply upload a photo, and let our advanced algorithm assess your
						acne type and severity.
					</p>
				</div>
			),
		},
		{
			title: "Services",
			value: "services",
			content: (
				<div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
					<p className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
						What We Offer
					</p>
					<ul className="text-lg md:text-2xl font-light mt-4 list-disc list-inside">
						<li>Instant AI-based acne detection</li>
						<li>Personalized skincare recommendations</li>

						<li>Expert-backed treatment suggestions</li>
						<li>Secure and private skin assessments</li>
					</ul>
				</div>
			),
		},
		{
			title: "Playground",
			value: "playground",
			content: (
				<div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
					<p className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-pink-500">
						Try Our AI in Action
					</p>
					<p className="text-lg md:text-2xl font-light mt-4">
						Want to see how our AI detects acne? Upload a sample image and get
						a real-time analysis.
					</p>
				</div>
			),
		},
	];

	return (
		<Section className={"px-3"}>
			<Separator className="mb-5" />
			<div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start ">
				<Tabs tabs={tabs} />
			</div>
		</Section>
	);
};

export default AboutPage;
