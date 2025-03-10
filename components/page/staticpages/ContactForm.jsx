"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const ContactForm = () => {
	const { register, handleSubmit, watch } = useForm();

	const onSubmit = (data) => {
		console.log(data);
	};

	return (
		<form
			className="w-full h-full flex-col flex"
			action=""
			onSubmit={handleSubmit(onSubmit)}>
			<h1 className="text-5xl font-bold mb-">Let's Get In Touch</h1>

			<div className="flex-col flex py-16">
				<div className="flex flex-col gap-2 mb-3">
					<Label htmlFor="name">Name</Label>
					<Input
						type="name"
						placeholder="Name"
						{...register("name")}
					/>
				</div>

				<div className="flex flex-col gap-2 mb-3">
					<Label htmlFor="email">Email</Label>
					<Input
						type="email"
						placeholder="Email"
						{...register("email")}
					/>
				</div>
				<div className="flex flex-col gap-2 mb-3">
					<Label htmlFor="message">Message</Label>
					<Textarea
						placeholder="Type your message here."
						{...register("message")}
					/>
				</div>
				<div className="w-full flex">
					<Button className="uppercase font-semibold">send message</Button>
				</div>
			</div>
		</form>
	);
};

export default ContactForm;
