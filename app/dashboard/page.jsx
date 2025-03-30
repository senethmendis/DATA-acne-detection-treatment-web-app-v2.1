"use client";
import Section from "@/components/common/Section";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import getData from "@/firebase/firestore/getData";
import { WobbleCard } from "@/components/ui/wobble-card";
import { Separator } from "@/components/ui/separator";
import AnalysisHistoryCard from "@/components/page/dashboard/AnalysisHistoryCard";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { db } from "@/firebase/config"; // Ensure the Firebase config is imported

const Dashboard = () => {
	const { user } = useAuthContext();
	const router = useRouter();
	const [acneHistory, setAcneHistory] = useState([]);
	const [data, setData] = useState({});
	const [isHistoryLoading, setIsHistoryLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!user) {
			router.push("/");
			return;
		}

		const getUserData = async () => {
			try {
				const { result, error } = await getData("users", user.uid);
				if (error) {
					setError("Failed to fetch user data.");
					return;
				}
				if (result.exists()) {
					setData(result.data());
				} else {
					setData(null);
				}
			} catch (error) {
				setError("An unexpected error occurred while fetching user data.");
			}
		};

		const getUserAcneData = async (userId) => {
			try {
				setIsHistoryLoading(true);
				const querySnapshot = await getDocs(
					collection(db, `users/${userId}/acne_detections`) // Ensure the correct path is used
				);
				const history = querySnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setAcneHistory(history);
			} catch (error) {
				setError("Failed to fetch acne analysis history.");
			} finally {
				setIsHistoryLoading(false);
			}
		};

		getUserData();
		getUserAcneData(user.uid); // Ensure `user.uid` is passed correctly
	}, [user, router]);

	console.log(acneHistory);

	return (
		<>
			<Section className="max-w-[1024px] w-full h-auto px-4 lg:px-4 xl:px-0">
				<div className="w-auto">
					<h1 className="text-3xl font-bold my-5">Dashboard</h1>
				</div>

				{error && <div className="text-red-500 font-semibold mb-4">{error}</div>}

				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 dark:text-black">
					<WobbleCard
						containerClassName="col-span-1 lg:col-span-2 h-full bg-white min-h-[300px] sm:min-h-[400px] lg:min-h-[300px]"
						className="bg-black text-white dark:text-black dark:bg-white">
						<div className="w-full h-full">
							<h1 className="scroll-m-20 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-transparent bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text">
								{data?.firstName || "No First Name"}{" "}
								{data?.lastName || "No Last Name"}
							</h1>
							<p className="font-light tracking-wider ml-1">
								{data?.email || "No Email"}
							</p>
							<h3 className="text-lg sm:text-xl capitalize font-bold mt-5">
								{data?.age || "N/A"}{" "}
								<span className="font-thin">years</span>
							</h3>
						</div>
					</WobbleCard>

					<WobbleCard className="text-white dark:text-black bg-blend-multiply dark:bg-white bg-black">
						<h1 className="text-6xl sm:text-[6rem] font-bold">
							{acneHistory?.length || 0}
						</h1>
						<p className="font-semibold tracking-wide">Analysis Count</p>
					</WobbleCard>

					<Link
						href={"/doctors"}
						className="text-lg sm:text-xl text-white flex gap-5 w-full h-full cursor-pointer">
						<WobbleCard>
							<p>
								Click here to see the Doctors List <ExternalLink />
							</p>
						</WobbleCard>
					</Link>
				</div>
			</Section>

			<Separator className="my-10" />

			<AnalysisHistoryCard
				acneHistory={acneHistory}
				isHistoryLoading={isHistoryLoading}
			/>

			{!isHistoryLoading && acneHistory.length === 0 && (
				<div className="text-center text-gray-500 mt-5">
					No analysis history available.
				</div>
			)}
		</>
	);
};

export default Dashboard;
