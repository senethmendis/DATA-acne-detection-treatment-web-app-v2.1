"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Section from "@/components/common/Section";
import { Button } from "@/components/ui/button";
import { Loader, UsersRound } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "sonner";

const ResetPassword = () => {
	const auth = getAuth();
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);

	const submitPasswordReset = async (e) => {
		e.preventDefault();
		setLoading(true);
		await sendPasswordResetEmail(auth, email)
			.then((res) => {
				toast("Email Sent!", {
					description: "Rest email link sent",
				});
				setEmail("");
				setLoading(false);
			})
			.catch((err) => {
				toast({
					variant: "destructive",
					title: "Uh oh! Something went wrong.",
					description: err,
					action: <ToastAction altText="Try again">Try again</ToastAction>,
				});
			});
	};

	return (
		<>
			<Section className="flex flex-row py-10 justify-center items-center">
				<div className={cn("flex flex-col gap-6")}>
					<form onSubmit={submitPasswordReset}>
						<div className="flex flex-col gap-6">
							<div className="flex flex-col items-center gap-2">
								<a
									href="#"
									className="flex flex-col items-center gap-2 font-medium">
									<div className="flex h-8 w-8 items-center justify-center rounded-md">
										<UsersRound className="size-6" />
									</div>
									<span className="sr-only">Acme Inc.</span>
								</a>
								<h1 className="text-xl font-bold">Reset Password.</h1>
							</div>
							<div className="flex flex-col gap-6">
								<div className="grid gap-2">
									<Label htmlFor="email">Enter email to reset</Label>
									<Input
										id="email"
										type="email"
										onChange={(e) => setEmail(e.target.value)}
										placeholder="m@example.com"
										required
									/>
								</div>
								<Button
									type="submit"
									className="w-full">
									{loading && (
										<Loader className="animate-spin size-6" />
									)}{" "}
									Reset
								</Button>
							</div>
						</div>
					</form>
					<div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  ">
						By clicking continue, you agree to our{" "}
						<a href="#">Terms of Service</a> and{" "}
						<a href="#">Privacy Policy</a>.
					</div>
				</div>
			</Section>
		</>
	);
};

export default ResetPassword;
