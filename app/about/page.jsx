import Section from "@/components/common/Section";
import React from "react";
import { SERVICES } from "@/constants";
import { AboutPageImage1, AboutPageImage, AboutPageImage2 } from "@/assets";
import { Button } from "@/components/ui/button";
import { Link2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TREATMENT_POINTS = [
	{
		title: "Scan Your Skin",
		description:
			"Upload a clear facial image, and our AI will analyze acne severity instantly.",
	},
	{
		title: "Receive Your Diagnosis",
		description:
			"Our model detects different acne types and categorizes severity levels.",
	},

	{
		title: "Get Personalized Treatments",
		description:
			"Receive expert-backed skincare suggestions based on your skin condition.",
	},
];

const AboutPage = () => {
	return (
		<>
			<Section className="flex flex-row py-10 ">
				<div className="w-1/2 flex flex-col gap-10 justify-center">
					<h1 className="text-5xl w-[80%] font-bold">
						A Smarter Way to Treat Acne
					</h1>

					<p className="w-[80%] text-justify">
						AI-Powered Acne Detection and Treatment Suggestions Our advanced
						AI system analyzes facial acne photos to detect acne levels and
						recommend personalized treatments. Say goodbye to guessing and
						ineffective skincare—get precise, data-driven advice tailored to
						your skin.
					</p>

					<Button className="max-w-[200px] bg-gradient-to-r from-pink-500 to-violet-500 font-bold">
						Explore More <Link2 />{" "}
					</Button>
				</div>
				<div
					className="w-1/2 bg-cover bg-center rounded-3xl "
					style={{ backgroundImage: `url(${AboutPageImage2.src})` }}></div>
			</Section>

			<Section className="rounded-3xl bg-white dark:text-black border shadow-xl">
				<div className="w-full flex flex-row p-8">
					<div className="w-1/2">
						<h1 className="text-5xl font-bold">
							We Bring You AI-Powered Skincare Solutions
						</h1>
					</div>
					<div className="w-1/2 flex flex-col gap-5">
						<p>
							We use cutting-edge machine learning to assess acne severity
							and suggest effective treatments, ensuring you get the best
							care based on your unique skin type.
						</p>
						<Button className="rounded-full px-10 max-w-[150px] bg-gradient-to-r from-pink-500 to-violet-500 font-bold">
							Expore More
						</Button>
					</div>
				</div>
				<div className="w-full flex flex-col">
					<div className="flex w-full justify-between p-8">
						{SERVICES.map((item, idx) => (
							<p key={idx}>{item.serviceName}</p>
						))}
					</div>

					<div
						className="w-full h-28 mt-28 bg-cover bg-center"
						style={{ backgroundImage: `url(${AboutPageImage.src})` }}>
						seneth
					</div>
				</div>
			</Section>

			<Section className="py-16">
				<h1 className="text-5xl font-bold">
					Comprehensive Acne Diagnosis & Treatment
				</h1>

				<div className="flex flex-row gap-10 py-10">
					{TREATMENT_POINTS.map((item, idx) => (
						<TreatmentBenefits
							key={idx}
							{...item}
						/>
					))}
				</div>
			</Section>
		</>
	);
};

export default AboutPage;

const TreatmentBenefits = (props) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{props.title}</CardTitle>
			</CardHeader>
			<CardContent>{props.description}</CardContent>
		</Card>
	);
};
