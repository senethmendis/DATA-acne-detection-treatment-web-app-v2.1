"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { AboutPageImage } from "@/assets";
import Section from "@/components/common/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ArrowUpRight } from "lucide-react";

import { useAuthContext } from "@/context/AuthContext";
import getDoument from "@/firebase/firestore/getData";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile, getAuth } from "firebase/auth";
import addData from "@/firebase/firestore/addData";

const UserProfilePage = () => {
	const auth = getAuth();
	const { toast } = useToast();
	const { user } = useAuthContext();
	const storage = getStorage();

	const [userData, setUserData] = useState({});
	const [userTretmentsList, setUserTretmentsList] = useState([]);
	const [imageUploading, setImageUploading] = useState(false);

	const { register, handleSubmit, reset } = useForm({
		defaultValues: {
			firstName: userData.firstName,
			lastName: userData.lastName,
			age: userData.age,
			displayName: user.displayName,
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
				addData("users", user.uid, { ...formData }).then((e) => {
					toast({
						title: "Profile Details Updated!",
					});
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
		if (userData && Object.keys(userData).length > 0) {
			reset({
				firstName: userData.firstName || "",
				lastName: userData.lastName || "",
				age: userData.age || "",
				displayName: user.displayName || "",
			});
		}
	}, [userData, reset, user.displayName]);

	useEffect(() => {
		fetchData();
	}, [user]);

	return (
		<Section className="w-full flex flex-row items-center">
			<div className="w-1/2 flex flex-col gap-5">
				<div
					style={{ backgroundImage: `url(${AboutPageImage.src})` }}
					className="w-[250px] max-w-[250px] h-[250px] max-h-[250px]  bg-cover bg-center rounded-full border-2"
				/>

				{/* 🔹 Image Upload Button */}
				<input
					type="file"
					accept="image/*"
					onChange={(e) => handleImageUpload(e.target.files[0])}
					disabled={imageUploading}
					className="text-sm text-gray-600"
				/>
				{imageUploading && <p className="text-sm text-blue-500">Uploading...</p>}

				<form
					className="flex flex-col gap-5"
					onSubmit={handleSubmit(handleFormSubmit)}>
					<div>
						<p className="py-2 text-gray-400">Email: {userData.email}</p>
						<Label
							htmlFor="displayName"
							className="mb-2">
							Display Name
						</Label>
						<Input {...register("displayName", { required: true })} />
					</div>
					<div className="flex flex-col gap-3">
						<div className=" flex flex-col">
							<Label
								htmlFor="firstName"
								className="mb-2">
								First Name
							</Label>

							<Input {...register("firstName", { required: true })} />
						</div>
						<div className=" flex flex-col">
							<Label
								htmlFor="lastName"
								className="mb-2">
								Last Name
							</Label>

							<Input {...register("lastName", { required: true })} />
						</div>
						<div className=" flex flex-col">
							<Label
								htmlFor="age"
								className="mb-2">
								Age
							</Label>

							<Input {...register("age", { required: true })} />
						</div>
					</div>

					<Button type="submit">Save</Button>
				</form>
			</div>
			<div className="w-1/2 flex flex-col  justify-center items-start gap-5 px-10">
				<h1 className="text-4xl">User Treatment List</h1>
				<ScrollArea className="min-h-[400px] h-full w-full rounded-md border p-3">
					{userTretmentsList?.map((treatment, idx) => (
						<div key={idx}>
							<Link
								href={""}
								className="flex flex-row gap-3">
								{treatment.treatmentTitle} <ArrowUpRight size={15} />
							</Link>
							<p className="text-gray-600">
								{treatment.treatmentDescription}
							</p>

							<Separator className="my-2" />
						</div>
					))}
				</ScrollArea>
			</div>
		</Section>
	);
};

export default UserProfilePage;
