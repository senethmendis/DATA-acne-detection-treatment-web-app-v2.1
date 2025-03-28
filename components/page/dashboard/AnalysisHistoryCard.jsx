"use client";
import Section from "@/components/common/Section";
import React, { useEffect, useState } from "react";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";

const AnalysisHistoryCard = ({ acneHistory = [], isHistoryLoading }) => {
	return (
		<>
			<Section className="max-w-[1024px]  w-full mx-auto h-auto px-4  lg:px-4 xl:px-0 py-10 sm:my-0 my-10">
				<h2 className="text-3xl font-bold">Analysis History</h2>
				<Accordion
					type="single"
					collapsible
					className="w-full my-5">
					{isHistoryLoading && (
						<div className="flex flex-col gap-5">
							<SkeletonDashboard />
							<SkeletonDashboard />
							<SkeletonDashboard />
						</div>
					)}
					{acneHistory?.map((entry, idx) => (
						<AccordionItem
							key={entry.id}
							value={`item-${idx}`}
							className="border-b border-gray-700">
							<AccordionTrigger className="flex justify-between items-center py-3">
								<h2 className="text-lg font-medium">
									Acne Severity:
									<span
										className={`ml-2 font-semibold ${
											entry.severity === "Severe"
												? "text-red-500"
												: entry.severity === "Moderate"
												? "text-orange-400"
												: "text-yellow-400"
										}`}>
										{entry.severity}
									</span>
								</h2>
								<span className="text-sm text-gray-500">
									Detected on -{" "}
									{entry.timestamp.toDate().toLocaleString()}
								</span>
							</AccordionTrigger>
							<AccordionContent className="p-4 bg-gray-800 rounded-md mb-3">
								<p className="text-gray-300">
									Total Spots:{" "}
									<span className="font-semibold">
										{entry.acne_spots}
									</span>
								</p>
								<h3 className="font-semibold mt-3 text-gray-200">
									Recommended Treatments:
								</h3>
								<ul className="list-disc ml-5 text-gray-400">
									{entry.treatments.map((treat, i) => (
										<li key={i}>{treat.description}</li>
									))}
								</ul>
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</Section>
		</>
	);
};

export default AnalysisHistoryCard;

const SkeletonDashboard = () => {
	return (
		<div className="flex items-center space-x-4">
			<Skeleton className="h-12 w-12 rounded-full" />
			<div className="space-y-2">
				<Skeleton className="h-4 w-[250px]" />
				<Skeleton className="h-4 w-[200px]" />
			</div>
		</div>
	);
};
