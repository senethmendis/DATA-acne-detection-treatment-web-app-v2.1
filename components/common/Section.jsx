const Section = ({ children, className, style }) => {
	return (
		<section
			style={style}
			className={`${className} w-full max-w-[1024px] mx-auto lg:h-[650px] md:px-5 lg:px-0`}>
			{children}
		</section>
	);
};

export default Section;
