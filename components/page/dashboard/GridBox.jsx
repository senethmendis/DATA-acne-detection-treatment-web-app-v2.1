import React from "react";

const GridBox = ({ children, className }) => {
	return <div className={`${className} bg-gray-100 rounded-xl p-6`}>{children}</div>;
};

export default GridBox;
