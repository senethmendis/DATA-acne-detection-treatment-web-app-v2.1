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
import { AboutPageImage } from "@/assets";

const Dashboard = () => {
	const { user } = useAuthContext();
	const router = useRouter();
	const [acneHistorys, setAcneHistory] = useState();
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
							<h1 className="text-2xl capitalize">
								{data.firstName} {data.lastName}
							</h1>
							<h3 className="text-xl capitalize font-bold">
								{data.age} <span className="font-thin">years</span>
							</h3>
							<p className="">{data.email}</p>
						</div>
					</GridBox>

					<GridBox>
						<h1 className="text-6xl font-bold">
							{acneHistorys?.length || 0}
						</h1>
						<p>Treatments</p>
					</GridBox>
					<GridBox>
						<h1 className="text-5xl font-bold">10</h1>
						<p>Treatments</p>
					</GridBox>
					<GridBox>
						<h1 className="text-5xl font-bold">10</h1>
						<p>Treatments</p>
					</GridBox>
					<GridBox></GridBox>
				</div>

				<div className="w-1/2 py-10">
					<h1 className="text-3xl font-bold"> Current Treatment Progress</h1>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Blanditiis minima temporibus voluptates.
					</p>

					<Progress
						className="mt-6"
						value={33}
					/>
				</div>
			</section>

			<Section className=" max-w-[1024px]  w-full mx-auto h-auto px-4  lg:px-4 xl:px-0 py-10"></Section>
		</>
	);
};

export default Dashboard;
