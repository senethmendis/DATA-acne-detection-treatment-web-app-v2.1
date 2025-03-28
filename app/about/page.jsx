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
					<p>Product Tab</p>
					<DummyContent />
				</div>
			),
		},
		{
			title: "Services",
			value: "services",
			content: (
				<div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
					<p>Services tab</p>
					<DummyContent />
				</div>
			),
		},
		{
			title: "Playground",
			value: "playground",
			content: (
				<div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
					<p>Playground tab</p>
					<DummyContent />
				</div>
			),
		},
		{
			title: "Content",
			value: "content",
			content: (
				<div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
					<p>Content tab</p>
					<DummyContent />
				</div>
			),
		},
		{
			title: "Random",
			value: "random",
			content: (
				<div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
					<p>Random tab</p>
					<DummyContent />
				</div>
			),
		},
	];

	return (
		<>
			<Separator className="mb-5" />
			<div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start ">
				<Tabs tabs={tabs} />
			</div>
		</>
	);
};

export default AboutPage;

const DummyContent = () => {
	return (
		<Image
			src={AboutPageImage.src}
			alt="dummy image"
			width="1000"
			height="1000"
			className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
		/>
	);
};
