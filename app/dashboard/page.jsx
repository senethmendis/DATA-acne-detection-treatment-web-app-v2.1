"use client";
import Section from "@/components/common/Section";
import React, { useEffect, useState } from "react";
import { storage, db } from "@/firebase/config";
import { Skeleton } from "@/components/ui/skeleton";
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
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { WobbleCard } from "@/components/ui/wobble-card";
import { Separator } from "@/components/ui/separator";
import AnalysisHistoryCard from "@/components/page/dashboard/AnalysisHistoryCard";

const Dashboard = () => {
	const { user } = useAuthContext();
	const router = useRouter();
	const [acneHistory, setAcneHistory] = useState([]);
	const [data, setData] = useState({});
	const [isHistoryLoading, setIsHistoryLoading] = useState(false);

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
				setIsHistoryLoading(true);
				const querySnapshot = await getDocs(
					collection(db, `users/${userId}/acne_detections`)
				);
				const history = querySnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setIsHistoryLoading(false);
				setAcneHistory(history);
			} catch (error) {
				console.error("Error fetching acne data:", error);
			}
		};

		getUserData();
		getUserAcneData(user.uid);
	}, [user]);

	console.log(acneHistory);

	return (
		<>
			<Section className=" max-w-[1024px] w-full  h-auto px-4  lg:px-4 xl:px-0">
				<div className="w-auto">
					<h1 className="text-3xl font-bold my-5">Dashboard</h1>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 h-[600px] gap-4 dark:text-black">
					<WobbleCard
						containerClassName="col-span-1  lg:col-span-2 h-full bg-white min-h-[500px] lg:min-h-[300px]"
						className="bg-black text-white dark:text-black  dark:bg-white">
						<div className="w-full h-full">
							<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight  text-transparent lg:text-5xl bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text">
								{data?.firstName ? (
									data?.firstName
								) : (
									<p className="font-light tracking-wider ml-1">
										No First Name
									</p>
								)}
								{data?.lastName ? (
									data?.lastName
								) : (
									<p className="font-light tracking-wider ml-1">
										No Last Name
									</p>
								)}
							</h1>
							<p className="font-light tracking-wider ml-1">
								{data?.email}
							</p>
							<h3 className="text-xl capitalize font-bold mt-5">
								{data?.age} <span className="font-thin">years</span>
							</h3>
						</div>
					</WobbleCard>

					<WobbleCard className="text-white dark:text-black bg-blend-multiply dark:bg-white bg-black">
						<h1 className="text-[6rem]  font-bold">
							{acneHistory?.length || 0}
						</h1>
						<p className="font-semibold tracking-wide">Analysis Count</p>
					</WobbleCard>
					<WobbleCard className=" bg-black  text-white dark:text-black  dark:bg-white">
						<h1 className="text-5xl font-bold">10</h1>
						<p>Treatments</p>
					</WobbleCard>
					<WobbleCard
						className={
							"md:col-span-2 bg-black  text-white dark:text-black  dark:bg-white"
						}>
						<h1 className="text-5xl font-bold">10</h1>
						<p>Treatments</p>
					</WobbleCard>
					<Link
						href={"/doctors"}
						className="text-xl text-white flex gap-5 w-full h-full cursor-pointer">
						<WobbleCard>
							<p>
								Ckick here to see the Doctors List <ExternalLink />{" "}
							</p>
						</WobbleCard>
					</Link>
				</div>
			</Section>

			<Separator className="my-10" />

			{/* <AnalysisHistoryCard data={acneHistory} /> */}

			<Section className="max-w-[1024px]  w-full mx-auto h-auto px-4  lg:px-4 xl:px-0 py-10 sm:my-0 my-10">
				<h2 className="text-3xl font-bold">Analysis History</h2>
				<Accordion
					type="single"
					collapsible
					className="w-full my-5">
					{isHistoryLoading && (
						<div className="flex flex-col gap-5">
							<SkeletonDashboard />
							<SkeletonDashboard />
							<SkeletonDashboard />
						</div>
					)}
					{acneHistory.map((entry, idx) => (
						<AccordionItem
							key={entry.id}
							value={`item-${idx}`}
							className="border-b border-gray-700">
							<AccordionTrigger className="flex justify-between items-center py-3">
								<h2 className="text-lg font-medium">
									Acne Severity:
									<span
										className={`ml-2 font-semibold ${
											entry.severity === "Severe"
												? "text-red-500"
												: entry.severity === "Moderate"
												? "text-orange-400"
												: "text-yellow-400"
										}`}>
										{entry.severity}
									</span>
								</h2>
								<span className="text-sm text-gray-500">
									Detected on -{" "}
									{entry.timestamp.toDate().toLocaleString()}
								</span>
							</AccordionTrigger>
							<AccordionContent className="p-4 bg-gray-800 rounded-md mb-3">
								<p className="text-gray-300">
									Total Spots:{" "}
									<span className="font-semibold">
										{entry.acne_spots}
									</span>
								</p>
								<h3 className="font-semibold mt-3 text-gray-200">
									Recommended Treatments:
								</h3>
								<ul className="list-disc ml-5 text-gray-400">
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

const SkeletonDashboard = () => {
	return (
		<div className="flex items-center space-x-4">
			<Skeleton className="h-12 w-12 rounded-full" />
			<div className="space-y-2">
				<Skeleton className="h-4 w-[250px]" />
				<Skeleton className="h-4 w-[200px]" />
			</div>
		</div>
	);
};
