"use client";
import React, { useState } from "react";
import signUp from "@/firebase/auth/signUp";
import { useRouter } from "next/navigation";
import Section from "@/components/common/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RegisterImage } from "@/assets";

import { toast, useToast } from "@/hooks/use-toast";

function SignUpPage() {
	const router = useRouter();
	const { toast } = useToast();

	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",

		age: "",
		email: "",
		password: "",
		displayName: "",
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const { firstName, lastName, age, email, password } = formData;
		const { result, error } = await signUp(email, password, {
			firstName,
			lastName,
			age,
			displayName: `${firstName + " " + lastName}`,
		});

		if (error) {
			alert(`Error: ${error.message}`);
			toast({
				title: `Error ${error.message}`,
			});
		} else {
			toast({
				title: `Welcome ${result.displayName}!`,
			});
			router.push("/");
		}
	};

	return (
		<>
			<Section className="flex flex-row w-full h-screen ">
				<div
					className="w-1/2 flex flex-col items-end bg-cover bg-center rounded-2xl m-5"
					style={{ backgroundImage: `url(${RegisterImage.src})` }}></div>
				<div className="w-1/2 mx-10 flex flex-col justify-center items-start">
					<h1 className="text-4xl font-bold  mb-30">Sign up</h1>
					<form
						onSubmit={handleSubmit}
						className="form ">
						<div className="py-10 flex flex-col gap-4">
							<div className="flex flex-row gap-4">
								<div className=" flex flex-col">
									<Label
										htmlFor="firstName"
										className="mb-2">
										First Name
									</Label>

									<Input
										onChange={handleChange}
										required
										type="text"
										name="firstName"
										id="firstName"
										placeholder="Jhon"
									/>
								</div>
								<div className=" flex flex-col">
									<Label
										htmlFor="lastName"
										className="mb-2">
										Last Name
									</Label>

									<Input
										onChange={handleChange}
										required
										type="text"
										name="lastName"
										id="lastName"
										placeholder="Cena"
									/>
								</div>
							</div>
							<div className=" flex flex-col">
								<Label
									htmlFor="age"
									className="mb-2">
									Age
								</Label>

								<Input
									onChange={handleChange}
									required
									type="number"
									min={18}
									max={100}
									name="age"
									id="age"
									placeholder="24"
								/>
							</div>
							<div className=" flex flex-col">
								<Label
									htmlFor="email"
									className="mb-2">
									Email
								</Label>

								<Input
									onChange={handleChange}
									required
									type="email"
									name="email"
									id="email"
									placeholder="example@mail.com"
								/>
							</div>
							<div className=" flex flex-col">
								<Label
									htmlFor="password"
									className="mb-2">
									Password
								</Label>

								<Input
									onChange={handleChange}
									required
									type="password"
									name="password"
									id="password"
									placeholder="password"
								/>
							</div>
						</div>
						<Button
							type="submit"
							className="min-w-40">
							Sign up
						</Button>
					</form>
				</div>
			</Section>
			<Section></Section>
		</>
	);
}

export default SignUpPage;
