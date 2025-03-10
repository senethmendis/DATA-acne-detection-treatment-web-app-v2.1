import Section from "@/components/common/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { storage, db } from "@/firebase/config";
import { useAuthContext } from "@/context/AuthContext";
import { Separator } from "@/components/ui/separator";
import { FileImage } from "lucide-react";

const UploadImage = () => {
	const { user } = useAuthContext();
	const { toast } = useToast();

	const [userId, setUserId] = useState("");
	const [image, setImage] = useState(null);
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState(null);

	useEffect(() => {
		if (user) {
			setUserId(user.uid);
		}
	}, [user]);

	const handleFileChange = (e) => {
		setImage(e.target.files[0]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!image || !userId) {
			toast({ title: "Please select an image and ensure you are logged in." });
			return;
		}

		setLoading(true);
		const formData = new FormData();

		formData.append("user_id", userId);
		formData.append("name", "senneth");
		formData.append("age", "12");
		formData.append("file", image);

		try {
			// Send image to backend
			const res = await axios.post("http://127.0.0.1:8000/analyze_acne/", formData);

			const { acne_spots, total_acne_area, severity, processed_image, user_id } =
				res.data;

			// Fetch processed image and upload to Firebase Storage
			const response = await fetch(processed_image);
			if (!response.ok) throw new Error("Failed to fetch processed image");
			const blob = await response.blob();

			const storageRef = ref(storage, `processed_images/${user_id}_${image.name}`);
			await uploadBytes(storageRef, blob);
			const downloadURL = await getDownloadURL(storageRef);

			// Save results to Firestore
			await addDoc(collection(db, "acne_detections"), {
				user_id,
				image_url: downloadURL,
				acne_spots,
				total_acne_area,
				severity,
				timestamp: new Date(),
			});

			// Update state with results
			setResult({
				user_id,
				acne_spots,
				total_acne_area,
				severity,
				image_url: downloadURL,
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

	return (
		<>
			<Separator className="my-5" />
			<Section className="flex flex-row mb-10">
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

					<Button
						type="submit"
						disabled={loading}
						className="rounded-full max-w-52 px-10 bg-gradient-to-r from-pink-500 to-violet-500 font-bold">
						{loading ? "Processing..." : "Upload Image"}
					</Button>
				</form>

				<div
					className="w-full bg-cover rounded-xl md:w-1/2 px-5 flex flex-col justify-center items-center py-5 md:py-0"
					style={{
						backgroundImage: result && `url(${result.image_url})`,
					}}>
					{!result && (
						<h1 className="dark:text-white/20 text-black/50 flex gap-5">
							<FileImage /> Upload an image to process
						</h1>
					)}
				</div>
			</Section>

			<Separator className="my-5" />
		</>
	);
};

export default UploadImage;
