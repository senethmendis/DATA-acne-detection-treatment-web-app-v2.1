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

const AnalysisHistoryCard = ({ acneHistory, isHistoryLoading }) => {
	return (
		<>
			<Section className="max-w-[1024px] w-full mx-auto h-auto px-4 sm:px-2 lg:px-4 xl:px-0 py-10 sm:my-0 my-10">
				<h2 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">
					Analysis History
				</h2>
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
							<AccordionTrigger className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3">
								<h2 className="text-base sm:text-lg font-medium">
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
								<span className="text-sm text-gray-500 mt-2 sm:mt-0">
									Detected on -{" "}
									{entry.timestamp.toDate().toLocaleString()}
								</span>
							</AccordionTrigger>
							<AccordionContent className="p-3 sm:p-4 bg-gray-800 rounded-md mb-3">
								<p className="text-sm sm:text-base text-gray-300">
									Total Spots:{" "}
									<span className="font-semibold">
										{entry.acne_spots}
									</span>
								</p>
								<h3 className="font-semibold mt-3 text-gray-200 text-sm sm:text-base">
									Recommended Treatments:
								</h3>
								<ul className="list-disc ml-4 sm:ml-5 text-gray-400 text-sm sm:text-base">
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
		<div className="flex items-start sm:items-center space-x-3 sm:space-x-4">
			<Skeleton className="h-10 sm:h-12 w-10 sm:w-12 rounded-full" />
			<div className="space-y-2">
				<Skeleton className="h-4 w-[120px] sm:w-[250px]" />
				<Skeleton className="h-4 w-[80px] sm:w-[200px]" />
			</div>
		</div>
	);
};
