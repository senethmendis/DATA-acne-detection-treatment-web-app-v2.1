"use client";
import Section from "@/components/common/Section";
import React, { useEffect, useState } from "react";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import TreatmentCardComponent from "@/components/page/dashboard/TreatmentCardComponent";
import { TREATMENTS } from "@/constants";
import GridBox from "@/components/page/dashboard/GridBox";
import { Progress } from "@/components/ui/progress";

import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import getData from "@/firebase/firestore/getData";

const Dashboard = () => {
	const { user } = useAuthContext();
	const router = useRouter();

	const [data, setData] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const [treatmentArray, setTreatmentArray] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			const { result, error } = await getData("users", user.uid);

			if (error) {
				setError(error);
			} else if (result.exists()) {
				setData(result.data());
				setTreatmentArray(result.data().treatments);
				console.log(result.data());
			} else {
				setData({});
				setTreatmentArray([]);
			}
			setLoading(false);
		};
		fetchData();
	}, [user.uid]);

	useEffect(() => {
		if (user == null) router.push("/");
	}, [user]);

	return (
		<>
			<section className=" max-w-[1024px] w-full mx-auto h-auto px-4  lg:px-4 xl:px-0">
				<div className="w-auto">
					<h1 className="text-3xl font-bold my-5">Dashboard</h1>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 h-[600px] gap-4 dark:text-black">
					<GridBox className="flex flex-col justify-start   rounded-xl md:col-span-2">
						<h1 className="text-2xl capitalize">
							{data.firstName} {data.lastName}
						</h1>
						<h3 className="text-xl capitalize font-bold">
							{data.age} <span className="font-thin">years</span>
						</h3>
						<p className="">{data.email}</p>
					</GridBox>

					<GridBox className={""}>
						<h1 className="text-5xl font-bold">{data.treatmentCount || 0}</h1>
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

			{/* <Section className=" max-w-[1024px]  w-full mx-auto h-auto px-4  lg:px-4 xl:px-0 py-10">
				<div className="flex  flex-col w-full ">
					<h2 className="text-4xl font-bold mb-4">Suggested Treatments</h2>
					<Carousel>
						<CarouselContent>
							{treatmentArray.map((treatment, idx) => (
								<CarouselItem
									key={idx}
									className="basis-1/3">
									<TreatmentCardComponent {...treatment} />
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious />
						<CarouselNext />
					</Carousel>
				</div>
			</Section> */}
		</>
	);
};

export default Dashboard;
