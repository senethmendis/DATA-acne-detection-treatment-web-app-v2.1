"use client";

import React, { useState } from "react";
import { Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
	const [year, setYear] = useState(new Date().getFullYear());

	return (
		<footer className="max-w-[1024px] mx-auto w-full">
			<div className="w-full h-16 justify-between items-center flex md:flex-row flex-col">
				<div className="flex flex-row gap-5">
					<h4>Contact Us</h4>
					<Instagram />
					<Linkedin />
					<Twitter />
				</div>
				<h3>Copyright &copy; {year} DATA All Rights Reserved </h3>
			</div>
		</footer>
	);
};

export default Footer;
