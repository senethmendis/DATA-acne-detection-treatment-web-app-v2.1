import React, { useEffect, useState } from "react";
import axios from "axios";

import getData from "@/firebase/firestore/getData";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, db } from "@/firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { useAuthContext } from "@/context/AuthContext";
import { getDocs } from "firebase/firestore";
import { Badge } from "@/components/ui/badge";

import Section from "@/components/common/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, FileImage, Image, Loader } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

import { FileUpload } from "@/components/ui/file-upload";

const UploadImage = () => {
	const { toast } = useToast();
	const { user } = useAuthContext();

	const [userId, setUserId] = useState("");
	const [formData, setFormData] = useState(null);
	const [image, setImage] = useState(null);
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState(null);
	const [acneHistory, setAcneHistory] = useState([]);

	// Fetch user data from Firestore
	useEffect(() => {
		if (user) {
			setUserId(user.uid);
			const getUserData = async () => {
				try {
					// Fetch user profile data
					const { result, error } = await getData("users", user.uid);
					if (error) {
						console.error("Error fetching user data:", error);
						return;
					}
					if (result.exists()) {
						setFormData(result.data()); // Correctly setting formData
					} else {
						setFormData(null);
					}
				} catch (error) {
					console.error("Unexpected error fetching user data:", error);
				}
			};

			getUserData();
			// getUserAcneData(user.uid);
		}
	}, [user]);

	const handleFileChange = (e) => {
		setImage(e[0]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!image || !formData) {
			toast({ title: "Please select an image and ensure user data is loaded." });
			return;
		}

		setLoading(true);

		try {
			// Ensure formData has required fields
			const { firstName, age } = formData;
			if (!firstName || !age) {
				throw new Error("User data is incomplete.");
			}

			// Prepare FormData for API
			const apiData = new FormData();
			apiData.append("user_id", user.uid);
			apiData.append("name", firstName);
			apiData.append("age", age);
			apiData.append("file", image);

			// Send request to backend
			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}`,
				apiData,
				{
					headers: { "Content-Type": "multipart/form-data" },
				}
			);

			const {
				acne_spots,
				total_acne_area,
				severity,
				processed_image,
				user_id,
				treatments,
			} = res.data;

			// Fetch and upload processed image to Firebase Storage
			const response = await fetch(processed_image);
			if (!response.ok) throw new Error("Failed to fetch processed image");
			const blob = await response.blob();

			const storageRef = ref(storage, `processed_images/${user_id}_${image.name}`);
			await uploadBytes(storageRef, blob);
			const downloadURL = await getDownloadURL(storageRef);

			// Save results to Firestore
			await addDoc(collection(db, `users/${user.uid}/acne_detections`), {
				image_url: downloadURL,
				acne_spots,
				total_acne_area,
				severity,
				timestamp: new Date(),
				treatments: treatments.map((treatment) => ({ description: treatment })), // Store as objects
			});

			// Update state with results
			setResult({
				user_id,
				acne_spots,
				total_acne_area,
				severity,
				image_url: downloadURL,
				treatments,
			});

			// Clear selected image
			setImage(null);
		} catch (error) {
			console.error("Error:", error);
			toast({
				title: "Processing failed. Please try again.",
				variant: "destructive",
			});
		}
		setLoading(false);
	};

	const handleClearImage = () => {
		window.location.reload();
		setImage(null);
	};

	console.log("results", result);

	return (
		<>
			<Separator className="my-5" />

			<Section className="flex flex-col md:flex-row relative ">
				<div className="orange__gradient w-[300px] h-[300px] absolute -z-40" />
				<div className="aqua__gradient w-[300px] h-[300px] absolute -z-40 right-0" />

				<form
					onSubmit={handleSubmit}
					className="w-full md:w-1/2 flex flex-col justify-center items-center gap-6 md:py-0">
					<div className="flex items-center justify-center w-full ">
						{/* <Input
							id="dropzone-file"
							type="file"
							accept="image/*"
							onChange={handleFileChange}
							className="bg-transparent border-white/50"
						/> */}
						<div className="w-full max-w-4xl mr-5 mx-auto min-h-32 border border-dashed bg-black/20 border-neutral-200 dark:border-neutral-800 rounded-lg">
							<FileUpload onChange={handleFileChange} />
						</div>
					</div>

					<ol className="text-sm text-gray-500 dark:text-gray-400 list-decimal list-inside">
						<li className="text-white">
							Make Sure that you have removed anythign thats hides you skin
						</li>
						<li className="text-white">User a well lit area for the scan</li>
						<li className="text-white">
							Make sure you are not wearing any makeup
						</li>
					</ol>
					<div className="flex gap-4">
						<Button
							type="submit"
							disabled={loading}
							className="relative inline-flex w-48 cursor-pointer  overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50">
							<span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
							<span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-dark px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
								{loading && <Loader className="animate-spin" />}{" "}
								{loading && `Processing...`} {!loading && "Upload Image"}
							</span>
						</Button>
						<Button
							type="button"
							onClick={handleClearImage}
							className="bg-gray-200 hover:bg-white text-black font-bold py-2 px-8 rounded-full">
							Clear
						</Button>
					</div>
				</form>

				<div className="w-full md:w-1/2 flex flex-col justify-center md:items-start items-center mt-10 md:mt-0 gap-6 md:py-0">
					{!result && (
						<h1 className="flex flex-row items-center gap-3 font-semibold text-center">
							<Image />{" "}
							<TextGenerateEffect
								className="mb-4"
								words={"Upload an image and process"}
							/>
						</h1>
					)}
					{result && (
						<>
							<h1 className="font-bold text-xl">
								Recommended Treatments and Solutions
							</h1>
							<Badge
								className={`${
									result?.severity === "Mild"
										? "bg-green-500 text-white"
										: result?.severity === "Moderate"
										? "bg-yellow-500 text-white"
										: result?.severity === "Severe"
								}`}>
								{result?.severity || "Serverity Not Calculated"}
							</Badge>
						</>
					)}

					<ScrollArea className="px-5 md:px-0">
						<ul className="my-6 ml-6 list-disc [&>li]:mt-2">
							{result?.treatments.map((item, idx) => (
								<li key={idx}>{item}</li>
							))}
						</ul>
					</ScrollArea>

					{result && (
						<Link
							href={"/dashboard"}
							className="flex flex-row gap-2  bg-gradient-to-l from-yellow-500 to-green-400 p-2 rounded-md">
							Go to the Dashboard to see more details
							<ExternalLink />
						</Link>
					)}
				</div>
			</Section>

			{result && (
				<Section className="flex flex-row mb-10">
					<div
						className="w-full h-screen md:h-auto m-4 md:m-0 border bg-contain bg-center rounded-xl bg-no-repeat px-2  flex flex-col justify-start items-start  md:py-0"
						style={{
							backgroundImage: result && `url(${result.image_url})`,
						}}>
						<>
							<h1 className="mt-2 font-semibold p-2 bg-white/50 rounded-md text-black flex flex-row items-center gap-2">
								✨ Processed Image
							</h1>
							{!result && (
								<h1 className="dark:text-white/20 text-black/50 flex gap-5">
									<FileImage /> Upload an image to process
								</h1>
							)}
						</>
					</div>
				</Section>
			)}
		</>
	);
};

export default UploadImage;
