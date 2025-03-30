"use client";
import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";

import { AboutPageImage } from "@/assets";
import Section from "@/components/common/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

import { LoaderCircle } from "lucide-react";

import { useAuthContext } from "@/context/AuthContext";
import getDoument from "@/firebase/firestore/getData";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile, getAuth } from "firebase/auth";
import addData from "@/firebase/firestore/addData";
import { useRouter } from "next/router";

const UserProfilePage = () => {
	const router = useRouter;
	const auth = getAuth();
	const { toast } = useToast();
	const { user } = useAuthContext();
	const storage = getStorage();

	const [userData, setUserData] = useState({});
	const [userTretmentsList, setUserTretmentsList] = useState([]);
	const [imageUploading, setImageUploading] = useState(false);
	const [loading, setLoading] = useState(false);

	const { register, handleSubmit, reset } = useForm({
		defaultValues: {
			firstName: userData?.firstName,
			lastName: userData?.lastName,
			age: userData?.age,
			displayName: user?.displayName,
		},
	});

	const updateDisplatName = async (displayName) => {
		await updateProfile(auth.currentUser, {
			displayName: displayName,
		})
			.then((res) => {
				toast({
					title: "Profile Updated",
				});
			})
			.catch((err) => {
				console.log(err);
				toast({
					description: err,
				});
			});
	};

	const handleFormSubmit = (formData) => {
		updateDisplatName(formData.displayName)
			.then((res) => {
				setLoading(true);
				addData("users", user?.uid, { ...formData }).then((e) => {
					toast({
						title: "Profile Details Updated!",
					});
					setLoading(false);
				});
			})
			.catch((e) => {
				console.log("other details update error", err);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const fetchData = async () => {
		const { result, err } = await getDoument("users", user.uid);

		if (err) {
			console.log({ "Error Occured": err });
		} else if (result.exists()) {
			setUserData(result.data());
			setUserTretmentsList(result?.data().treatments);
		} else {
			setUserData({});
		}
	};

	const handleImageUpload = async (file) => {
		if (!file) return;

		setImageUploading(true);
		const storageRef = ref(storage, `avatars/${user.uid}`);

		try {
			// Upload image to Firebase Storage
			const snapshot = await uploadBytes(storageRef, file);
			const downloadURL = await getDownloadURL(snapshot.ref);

			// Update Firebase Auth Profile
			await updateProfile(auth.currentUser, { photoURL: downloadURL });

			// Save image URL to Firestore
			await addData("users", user.uid, { avatar: downloadURL });

			// Update UI
			setUserData((prev) => ({ ...prev, avatar: downloadURL }));
			toast({ title: "Avatar Updated!" });
		} catch (err) {
			console.log("Error uploading file:", err);
			toast({ description: "Failed to upload image." });
		} finally {
			setImageUploading(false);
		}
	};

	useEffect(() => {
		if (!user) return router.push("/");
		if (userData && Object.keys(userData).length > 0) {
			reset({
				firstName: userData?.firstName || "",
				lastName: userData?.lastName || "",
				age: userData?.age || "",
				displayName: user?.displayName || "",
			});
		}
	}, [userData, reset, user?.displayName]);

	useEffect(() => {
		fetchData();
	}, [user]);

	return (
		<Section className="w-full flex flex-col md:flex-row items-center my-10 md:my-0 px-4 sm:px-0">
			<div className="w-full md:w-auto mx-auto flex flex-col items-center gap-5">
				<div
					style={{
						backgroundImage: `url(${userData.avatar || AboutPageImage.src})`,
					}}
					className="w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] md:w-[250px] md:h-[250px] bg-cover bg-center rounded-full border-2"
				/>

				{/* 🔹 Image Upload Button */}
				<label
					htmlFor="avatarUpload"
					className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
					{imageUploading ? "Uploading..." : "Upload Image"}
				</label>
				<input
					id="avatarUpload"
					type="file"
					accept="image/*"
					onChange={(e) => handleImageUpload(e.target.files[0])}
					disabled={imageUploading}
					className="hidden"
				/>

				<p className="py-2 text-white font-bold text-center rounded-md bg-gradient-to-l from-yellow-600 to-green-600 w-full px-3 sm:px-5">
					Email: {userData.email}
				</p>
				<form
					className="flex flex-col gap-5 w-full max-w-[400px]"
					onSubmit={handleSubmit(handleFormSubmit)}>
					<div>
						<Label
							htmlFor="displayName"
							className="mb-2">
							Display Name
						</Label>
						<Input {...register("displayName", { required: true })} />
					</div>
					<div className="flex flex-col gap-3">
						<div className="flex flex-col">
							<Label
								htmlFor="firstName"
								className="mb-2">
								First Name
							</Label>
							<Input {...register("firstName", { required: true })} />
						</div>
						<div className="flex flex-col">
							<Label
								htmlFor="lastName"
								className="mb-2">
								Last Name
							</Label>
							<Input {...register("lastName", { required: true })} />
						</div>
						<div className="flex flex-col">
							<Label
								htmlFor="age"
								className="mb-2">
								Age
							</Label>
							<Input {...register("age", { required: true })} />
						</div>
					</div>

					<Button
						type="submit"
						className="w-full sm:w-auto flex justify-center items-center gap-2">
						{loading && <LoaderCircle className="animate-spin" />} Save
					</Button>
				</form>
			</div>
		</Section>
	);
};

export default UserProfilePage;
