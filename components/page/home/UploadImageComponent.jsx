import React, { use, useEffect, useState } from "react";
import axios from "axios";

import getData from "@/firebase/firestore/getData";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, db } from "@/firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { useAuthContext } from "@/context/AuthContext";
import { getDocs } from "firebase/firestore";

import Section from "@/components/common/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import {
	ExternalLink,
	FileImage,
	Image,
	Link2,
	Link2Icon,
	Link2OffIcon,
	Loader,
	Rss,
} from "lucide-react";
import { AiGenaratedWaterMarkLogo } from "@/assets/icons";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

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
			// getUserAcneData(user.uid);
		}
	}, [user]);

	const handleFileChange = (e) => {
		setImage(e.target.files[0]);
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
			const res = await axios.post("http://127.0.0.1:8000/analyze_acne/", apiData, {
				headers: { "Content-Type": "multipart/form-data" },
			});

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
		setImage(null);
		setFormData(null);
		setResult(null);
	};

	console.log("results", result);

	return (
		<>
			<Separator className="my-5" />
			<Section className="flex flex-col md:flex-row mb-10">
				<form
					onSubmit={handleSubmit}
					className="w-full md:w-1/2 flex flex-col justify-center items-center gap-6 md:py-0">
					<div className="flex items-center justify-center w-full">
						<label
							htmlFor="dropzone-file"
							className="flex flex-col items-center justify-center p-4 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
							<div className="flex flex-col items-center justify-center pt-5 pb-6">
								<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
									<span className="font-semibold">Click to upload</span>{" "}
									or drag and drop
								</p>
								<p className="text-xs text-gray-500 dark:text-gray-400">
									PNG, JPG (MAX. 800x400px)
								</p>
							</div>
							<Input
								id="dropzone-file"
								type="file"
								accept="image/*"
								onChange={handleFileChange}
							/>
						</label>
					</div>
					<div className="flex gap-4">
						<Button
							type="submit"
							disabled={loading}
							className="rounded-full max-w-52 px-10 bg-gradient-to-r from-pink-500 to-violet-500 font-bold">
							{loading && <Loader className="animate-spin" />}{" "}
							{loading && `Processing...`} {!loading && "Upload Image"}
						</Button>
						<Button
							type="reset"
							onChange={handleClearImage}
							disabled={loading}
							className="rounded-full max-w-52 px-10 dark:bg-white dark:text-black text-white  border font-bold">
							Clear
						</Button>
					</div>
				</form>

				<div className="w-full md:w-1/2 flex flex-col justify-center md:items-start items-center mt-10 md:mt-0 gap-6 md:py-0">
					{!result && (
						<h1 className="flex gap-3 font-semibold text-center">
							<Image /> Upload an image and process
						</h1>
					)}
					{result && (
						<>
							<h1 className="font-bold text-xl">
								Recommended Treatments and Solutions
							</h1>
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
							className="flex flex-row gap-2 md:bg-none bg-gradient-to-l from-yellow-500 to-green-400 p-2 rounded-md">
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
								<AiGenaratedWaterMarkLogo className="w-5 h-5 " />{" "}
								Processed Image
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

			<Separator className="my-5" />
		</>
	);
};

export default UploadImage;
