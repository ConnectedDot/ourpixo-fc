import {useState} from "react";
import type {DriveFile} from "../lib/drive";

export default function GalleryImage({
	file,
	onClick,
}: {
	file: DriveFile;
	onClick: () => void;
}) {
	const [loaded, setLoaded] = useState(false);

	return (
		<div
			onClick={onClick}
			className="relative overflow-hidden rounded-xl cursor-pointer group bg-gray-100"
			style={{aspectRatio: "auto"}}
		>
			<img
				src={file.thumb}
				alt={file.name}
				onLoad={() => setLoaded(true)}
				// This ensures that if the image is cached, it still shows
				className={`w-full transition-all duration-700 ease-in-out ${
					loaded ?
						"opacity-100 blur-0 scale-100"
					:	"opacity-0 blur-lg scale-105"
				}`}
				loading="lazy"
			/>
			{/* Hover State */}
			<div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
				<p className="text-white text-xs truncate">{file.name}</p>
			</div>
		</div>
	);
}
