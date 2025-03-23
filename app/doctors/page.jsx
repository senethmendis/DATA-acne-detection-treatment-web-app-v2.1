import Section from "@/components/common/Section";
import React from "react";
import { DOCSTORS_LIST } from "@/constants";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import { EyeClosedIcon, EyeIcon, View, ViewIcon } from "lucide-react";

const DoctorsList = () => {
	return (
		<>
			<Section>
				<ScrollArea className="w-full h-full rounded-md border">
					<div className="p-4">
						<h4 className="mb-4 text-2xl text-clip bg-gradient-to-l from-yellow-300 to-green-400 bg-clip-text text-transparent font-bold leading-none ">
							Dermatologist List Sri Lanka
						</h4>
						{DOCSTORS_LIST.map((doc, idx) => (
							<div
								key={idx}
								className="w-full flex flex-col">
								<HoverCard>
									<div className="w-full flex flex-row items-center justify-between pr-10">
										<span className="text-sm"> {doc.name}</span>
										<HoverCardTrigger asChild>
											<EyeIcon
												size={15}
												className="cursor-pointer"
											/>
										</HoverCardTrigger>
									</div>
									<span className="text-sm text-pink-500">
										{doc?.hospitals[0]?.hospitalName}
									</span>
									<span className="text-sm text-purple-500">
										{doc?.hospitals[0]?.contact}
									</span>

									<HoverCardContent className="w-80">
										<div className="flex justify-between space-x-4">
											<div className="space-y-1">
												<h4 className="text-sm font-semibold">
													@nextjs
												</h4>
												<p className="text-sm">
													The React Framework – created and
													maintained by @vercel.
												</p>
											</div>
										</div>
									</HoverCardContent>

									<Separator className="my-2 " />
								</HoverCard>
							</div>
						))}
					</div>
				</ScrollArea>
			</Section>
		</>
	);
};

export default DoctorsList;
