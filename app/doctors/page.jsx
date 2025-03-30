"use client";
import Section from "@/components/common/Section";
import React, { useState } from "react";
import { DOCSTORS_LIST } from "@/constants";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const DoctorsList = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [sortOrder, setSortOrder] = useState("A-Z");
	const [currentPage, setCurrentPage] = useState(1);
	const [selectedHospital, setSelectedHospital] = useState("");

	const entriesPerPage = 25;

	// Helper function to remove "Dr." or "DR" prefix
	const removePrefix = (name) => name.replace(/^(Dr\.|DR)\s*/i, "");

	// Get unique hospital names for the combobox
	const hospitalOptions = Array.from(
		new Set(DOCSTORS_LIST.flatMap((doc) => doc.hospitals.map((h) => h.hospitalName)))
	).filter(Boolean);

	// Filter doctors based on the search term and selected hospital
	const filteredDoctors = DOCSTORS_LIST.filter((doc) => {
		const matchesSearch = removePrefix(doc.name)
			.toLowerCase()
			.includes(searchTerm.toLowerCase());
		const matchesHospital =
			!selectedHospital ||
			doc.hospitals.some((h) => h.hospitalName === selectedHospital);
		return matchesSearch && matchesHospital;
	});

	// Sort doctors based on the selected sort order
	const sortedDoctors = [...filteredDoctors].sort((a, b) => {
		if (sortOrder === "A-Z") {
			return removePrefix(a.name).localeCompare(removePrefix(b.name));
		} else if (sortOrder === "Z-A") {
			return removePrefix(b.name).localeCompare(removePrefix(a.name));
		}
		return 0;
	});

	// Calculate pagination
	const totalPages = Math.ceil(sortedDoctors.length / entriesPerPage);
	const paginatedDoctors = sortedDoctors.slice(
		(currentPage - 1) * entriesPerPage,
		currentPage * entriesPerPage
	);

	const handlePageChange = (page) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page);
		}
	};

	return (
		<>
			<Section className="mt-10 mb-24">
				<div className="mb-4 mx-2 md:mx-0 flex flex-col md:flex-row gap-4">
					<Input
						type="text"
						placeholder="Search doctors by name..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="w-full p-2 border rounded-md "
					/>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant="outline"
								role="combobox"
								aria-expanded={!!selectedHospital}
								className="w-full md:w-64 justify-between">
								{selectedHospital || "Filter by hospital"}
								<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-full md:w-64 p-0">
							<Command>
								<CommandInput placeholder="Search hospital..." />
								<CommandList>
									<CommandEmpty>No hospital found.</CommandEmpty>
									<CommandGroup>
										<CommandItem
											onSelect={() => setSelectedHospital("")}>
											<Check
												className={cn(
													"mr-2 h-4 w-4",
													selectedHospital === ""
														? "opacity-100"
														: "opacity-0"
												)}
											/>
											All Hospitals
										</CommandItem>
										{hospitalOptions.map((hospital, idx) => (
											<CommandItem
												key={idx}
												onSelect={() =>
													setSelectedHospital(
														selectedHospital === hospital
															? ""
															: hospital
													)
												}>
												<Check
													className={cn(
														"mr-2 h-4 w-4",
														selectedHospital === hospital
															? "opacity-100"
															: "opacity-0"
													)}
												/>
												{hospital}
											</CommandItem>
										))}
									</CommandGroup>
								</CommandList>
							</Command>
						</PopoverContent>
					</Popover>
					<div className="flex gap-2 mx-1 md:mx-0">
						<Button
							variant={sortOrder === "A-Z" ? "default" : "outline"}
							onClick={() => setSortOrder("A-Z")}>
							A-Z
						</Button>
						<Button
							variant={sortOrder === "Z-A" ? "default" : "outline"}
							onClick={() => setSortOrder("Z-A")}>
							Z-A
						</Button>
					</div>
				</div>
				<ScrollArea className="w-full h-full rounded-md border">
					<Table className="w-full border-collapse border">
						<TableHeader>
							<TableRow>
								<TableHead className="p-2">Name</TableHead>
								<TableHead className="p-2">Hospital</TableHead>
								<TableHead className="p-2">Contact</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{paginatedDoctors.map((doc, idx) => (
								<TableRow key={idx}>
									<TableCell className="p-2">{doc.name}</TableCell>
									<TableCell className="p-2">
										{doc.hospitals
											.filter(
												(hospital) =>
													hospital.hospitalName !== "N/A"
											)
											.map((hospital, hIdx) => (
												<div key={hIdx}>
													<strong>
														{hospital.hospitalName}
													</strong>
												</div>
											))}
									</TableCell>
									<TableCell className="p-2">
										{doc.hospitals
											.filter(
												(hospital) => hospital.contact !== "N/A"
											)
											.map((hospital, hIdx) => (
												<div key={hIdx}>{hospital.contact}</div>
											))}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</ScrollArea>
				<Pagination className="mt-4">
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious
								onClick={() => handlePageChange(currentPage - 1)}
								disabled={currentPage === 1}
							/>
						</PaginationItem>
						{Array.from({ length: totalPages }, (_, i) => (
							<PaginationItem key={i}>
								<PaginationLink
									onClick={() => handlePageChange(i + 1)}
									active={(currentPage === i + 1).toString()}>
									{i + 1}
								</PaginationLink>
							</PaginationItem>
						))}
						<PaginationItem>
							<PaginationNext
								onClick={() => handlePageChange(currentPage + 1)}
								disabled={currentPage === totalPages}
							/>
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</Section>
		</>
	);
};

export default DoctorsList;
