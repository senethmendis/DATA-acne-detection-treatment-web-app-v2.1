"use client";
import React, { useEffect, useState } from "react";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";
import { signOutUser } from "@/utils/signOut";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { ArrowArt, ArrowUp, ArrowDownCircle } from "@/assets/icons";
import Image from "next/image";

const RightSidePanel = () => {
	const { user } = useAuthContext();
	const router = useRouter();

	const [hide, setHide] = useState(false);

	useEffect(() => {
		if (user !== null) {
			setHide(true);
		}
	}, [user]);

	const handleSignOut = async () => {
		const { success, message } = await signOutUser();

		if (success) {
			toast({
				title: message,
			});
			setHide(false);
			router.push("/");
		} else {
			toast({
				title: message,
			});
		}
	};

	return (
		<Sheet>
			<SheetTrigger>
				<Avatar>
					<AvatarImage src="https://github.com/shadcn.png" />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle className="font-bold text-2xl bg-gradient-to-l from-pink-600 to-purple-600 bg-clip-text text-transparent">
						{hide && user.displayName}
					</SheetTitle>

					<SheetDescription></SheetDescription>
				</SheetHeader>

				<div className="w-full flex flex-col gap-5 mt-10 relative">
					{hide && (
						<Link
							href={"/dashboard"}
							className="underline">
							Dashboard
						</Link>
					)}

					{hide && (
						<Link
							href={"/profile"}
							className="underline">
							Profile
						</Link>
					)}

					{!hide && (
						<Link
							href={"/signin"}
							className="underline">
							Signin
						</Link>
					)}

					{!hide && (
						<Image
							alt="arrow acicle"
							src={ArrowDownCircle}
							className="absolute -z-20 dark:invert rotate-180 -top-28 -left-28"
						/>
					)}

					{!hide && (
						<Link
							href={"/signup"}
							className="underline">
							SignUp
						</Link>
					)}
				</div>

				<SheetFooter>
					<SheetClose asChild>
						{hide && (
							<Button
								onClick={handleSignOut}
								type="submit"
								className="mt-5">
								<LogOut /> Sign Out
							</Button>
						)}
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};

export default RightSidePanel;
