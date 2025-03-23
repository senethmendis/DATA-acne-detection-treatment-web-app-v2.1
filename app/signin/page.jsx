"use client";
import React, { useState } from "react";
import signIn from "@/firebase/auth/signIn";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { LoginImage } from "@/assets";
import { useAuthContext } from "@/context/AuthContext";
import Link from "next/link";

function SignInPage() {
	const router = useRouter();
	const { toast } = useToast();
	const { user } = useAuthContext();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleForm = async (event) => {
		event.preventDefault();

		const { result, error } = await signIn(email, password);

		if (error) {
			toast({ title: `Passoword or usename is wrong` + error.message });
			return console.log(error);
		}

		toast({ title: `Login successful!` });
		return router.push("/");
	};

	console.log(user);

	return (
		<>
			<div className="grid min-h-svh lg:grid-cols-2">
				<div className="flex flex-col gap-4 p-6 md:p-10">
					<div className="flex flex-1 items-center justify-center">
						<div className="w-full max-w-xs">
							{/* <LoginForm /> */}

							<form
								className={cn("flex flex-col gap-6")}
								onSubmit={handleForm}>
								<div className="flex flex-col items-center gap-2 text-center">
									<h1 className="text-2xl font-bold">
										Login to your account
									</h1>
									<p className="text-balance text-sm text-muted-foreground">
										Enter your email below to login to your account
									</p>
								</div>
								<div className="grid gap-6">
									<div className="grid gap-2">
										<Label htmlFor="email">Email</Label>
										<Input
											onChange={(e) => setEmail(e.target.value)}
											required
											id="email"
											type="email"
											placeholder="m@example.com"
										/>
									</div>
									<div className="grid gap-2">
										<div className="flex items-center">
											<Label htmlFor="password">Password</Label>
											<Link
												href="/reset"
												className="ml-auto text-sm underline-offset-4 hover:underline">
												Forgot your password?
											</Link>
										</div>
										<Input
											id="password"
											type="password"
											required
											onChange={(e) => setPassword(e.target.value)}
										/>
									</div>
									<Button
										type="submit"
										className="w-full">
										Login
									</Button>
								</div>
								<div className="text-center text-sm">
									Don&apos;t have an account?{" "}
									<Link
										href={"/signup"}
										className="underline underline-offset-4">
										Sign up
									</Link>
								</div>
							</form>
						</div>
					</div>
				</div>
				<div className="relative hidden bg-muted lg:block">
					<img
						src={LoginImage.src}
						alt="Image"
						className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
					/>
				</div>
			</div>

			{/* <Section className="w-full flex flex-row">
				<div className="w-1/2"></div>
				<div className="w-1/2 flex flex-col">
					<div className="form-wrapper">
						<h1 className="mt-60 mb-30 text-4xl font-bold">Sign In</h1>
						<form
							onSubmit={handleForm}
							className="form">
							<div className="py-10 flex flex-col gap-4">
								<div className=" flex flex-col">
									<Label
										htmlFor="email"
										className="mb-2">
										Email
									</Label>

									<Input
										onChange={(e) => setEmail(e.target.value)}
										required
										type="email"
										name="email"
										id="email"
										placeholder="example@mail.com"
									/>
								</div>

								<Label
									htmlFor="email"
									className="mb-2">
									Password
								</Label>

								<Input
									onChange={(e) => setPassword(e.target.value)}
									required
									type="password"
									name="password"
									id="password"
									placeholder="password"
								/>

								<Button
									type="submit"
									className="min-w-40">
									Sign In
								</Button>
							</div>
						</form>
					</div>
				</div>
			</Section>
			<Section></Section> */}
		</>
	);
}

export default SignInPage;
