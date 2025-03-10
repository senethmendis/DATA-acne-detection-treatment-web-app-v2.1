import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NoPreviewImage } from "@/assets";

const STATUS = {
	UNREAD: "Unread",
	READ: "Read",
};

const TreatmentCardComponent = (props) => {
	return (
		<div className="w-full max-w-md mx-auto py-10 px-2">
			<div className="bg-gray-100 rounded-lg shadow-xl overflow-hidden transition-all duration-300 hover:shadow-xl dark:bg-gray-100  text-black hover:scale-105 ">
				<img
					src={props.treatmentImage || NoPreviewImage.src}
					alt="Product Image"
					width={600}
					height={400}
					className="w-full h-64 object-cover"
					style={{ aspectRatio: "600/400", objectFit: "cover" }}
				/>

				<div className="p-4 space-y-2">
					<h3 className="text-xl font-semibold">{props.treatmentTitle}</h3>
					<p className="text-gray-500 dark:text-gray-400">
						{props.treatmentDescription.split(" ").slice(0, 8).join(" ")}
						{props.treatmentDescription.split(" ").length > 8 ? "..." : ""}
					</p>

					<div className="flex items-center justify-between">
						<Badge
							className={`${
								props.status === STATUS.UNREAD
									? "bg-yellow-500"
									: "bg-green-600"
							} text-white`}>
							{props.status}
						</Badge>

						<Button>View Details</Button>
					</div>
				</div>
			</div>
		</div>
	);
};
export default TreatmentCardComponent;
