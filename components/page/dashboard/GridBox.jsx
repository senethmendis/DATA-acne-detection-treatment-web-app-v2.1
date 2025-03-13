import React from "react";

const GridBox = ({ children, className, bgImage }) => {
	return (
		<div
			style={{ backgroundImage: `url(${bgImage})` }}
			className={`${className} bg-gray-100 rounded-xl p-6 bg-cover bg-center`}>
			{children}
		</div>
	);
};

export default GridBox;
