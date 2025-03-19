"use client";
import Section from "@/components/common/Section";
import React, { useEffect, useState } from "react";
import { storage, db } from "@/firebase/config";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

import GridBox from "@/components/page/dashboard/GridBox";
import { Progress } from "@/components/ui/progress";
import { collection, addDoc } from "firebase/firestore";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import getData from "@/firebase/firestore/getData";
import { getDocs } from "firebase/firestore";
import { AboutPageImage, DashGridImage01 } from "@/assets";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

const Dashboard = () => {
	const { user } = useAuthContext();
	const router = useRouter();
	const [acneHistorys, setAcneHistory] = useState([]);
	const [data, setData] = useState({});

	useEffect(() => {
		if (user == null) router.push("/");

		const getUserData = async () => {
			try {
				// Fetch user profile data
				const { result, error } = await getData("users", user.uid);
				if (error) {
					console.error("Error fetching user data:", error);
					return;
				}
				if (result.exists()) {
					setData(result.data()); // Correctly setting formData
				} else {
					setData(null);
				}
			} catch (error) {
				console.error("Unexpected error fetching user data:", error);
			}
		};

		const getUserAcneData = async (userId) => {
			try {
				const querySnapshot = await getDocs(
					collection(db, `users/${userId}/acne_detections`)
				);
				const history = querySnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setAcneHistory(history);
			} catch (error) {
				console.error("Error fetching acne data:", error);
			}
		};

		getUserData();
		getUserAcneData(user.uid);
	}, [user]);

	console.log(acneHistorys);

	return (
		<>
			<section className=" max-w-[1024px] w-full mx-auto h-auto px-4  lg:px-4 xl:px-0">
				<div className="w-auto">
					<h1 className="text-3xl font-bold my-5">Dashboard</h1>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 h-[600px] gap-4 dark:text-black">
					<GridBox className="flex flex-col justify-start   rounded-xl md:col-span-2">
						<div className="w-full h-full">
							<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight  text-transparent lg:text-5xl bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text">
								{data.firstName} {data.lastName}
							</h1>
							<p className="font-light tracking-wider ml-1">{data.email}</p>
							<h3 className="text-xl capitalize font-bold mt-5">
								{data.age} <span className="font-thin">years</span>
							</h3>
						</div>
					</GridBox>

					<GridBox
						bgImage={DashGridImage01.src}
						className="text-white bg-blend-multiply">
						<h1 className="text-[6rem]  font-bold">
							{acneHistorys?.length || 0}
						</h1>
						<p className="font-semibold tracking-wide">Analysis Count</p>
					</GridBox>
					<GridBox>
						<h1 className="text-5xl font-bold">10</h1>
						<p>Treatments</p>
					</GridBox>
					<GridBox className={"md:col-span-2"}>
						<h1 className="text-5xl font-bold">10</h1>
						<p>Treatments</p>
					</GridBox>
				</div>
			</section>

			<Section className=" max-w-[1024px]  w-full mx-auto h-auto px-4  lg:px-4 xl:px-0 py-10">
				<h2 className="text-3xl font-bold">Analysis History</h2>
				<Accordion
					type="single"
					collapsible
					className="w-full my-5">
					{acneHistorys.map((entry, idx) => (
						<AccordionItem
							key={entry.id}
							value={`item-${idx}`}>
							<AccordionTrigger>
								<h2>
									Acne Severity:{" "}
									<span
										className={`${
											entry.severity === "Severe"
												? "text-red-600"
												: entry.severity === "Moderate"
												? "text-orange-500"
												: "text-yellow-500"
										}`}>
										{entry.severity}
									</span>
									<span className="ml-3 text-gray-600">
										| Detected on{" "}
										{`- ${entry.timestamp.toDate().toLocaleString()}`}{" "}
									</span>
								</h2>
							</AccordionTrigger>
							<AccordionContent>
								<p>Total Spots: {entry.acne_spots}</p>
								{/* <p>Total Area: {entry.total_acne_area}</p> */}
								<h3 className="font-bold mt-2">
									Recommended Treatments:
								</h3>
								<ul className="list-disc ml-5">
									{entry.treatments.map((treat, i) => (
										<li key={i}>{treat.description}</li>
									))}
								</ul>
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</Section>
		</>
	);
};

export default Dashboard;
