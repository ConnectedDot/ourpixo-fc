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
			className="relative overflow-hidden rounded-xl cursor-pointer group"
			onClick={onClick}
			style={{
				background: file.dominantColor || "#e5e7eb",
			}}
		>
			{/* Blur placeholder */}

			<img
				src={file.thumb}
				className={`w-full object-cover transition duration-500 ${
					loaded ?
						"opacity-100 blur-0 scale-100"
					:	"opacity-0 blur-xl scale-105"
				}`}
				onLoad={() => setLoaded(true)}
				loading="lazy"
				decoding="async"
			/>

			{/* Hover overlay */}

			<div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition" />

			<div className="absolute bottom-3 left-3 right-3 text-white opacity-0 group-hover:opacity-100 transition">
				<p className="text-sm font-medium truncate">{file.name}</p>
			</div>
		</div>
	);
}
