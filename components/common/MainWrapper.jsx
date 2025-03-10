import React from "react";

const MainWrapper = ({ children, className }) => {
	return (
		<div
			className={`${className} w-full max-w-[1024px] mx-auto flex md:flex-row flex-col h-screen lg:h-[650px] md:px-5 lg:px-0`}>
			{children}
		</div>
	);
};

export default MainWrapper;
