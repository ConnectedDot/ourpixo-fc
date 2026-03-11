import {useState} from "react";
import type {DriveFile} from "../lib/drive";

function prefetch(src: string) {
	const img = new Image();
	img.src = src;
}

export default function Tile({
	file,
	onClick,
}: {
	file: DriveFile;
	onClick: () => void;
}) {
	const [loaded, setLoaded] = useState(false);

	return (
		<div
			onMouseEnter={() => prefetch(file.viewUrl)}
			onClick={onClick}
			className="group relative overflow-hidden rounded-xl cursor-pointer bg-gray-200"
		>
			{!loaded && (
				<div className="absolute inset-0 animate-pulse bg-gray-300" />
			)}

			<img
				src={file.thumb!}
				alt={file.name}
				loading="lazy"
				onLoad={() => setLoaded(true)}
				className={`w-full object-cover transition duration-500 ${
					loaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
				}`}
			/>

			{/* Always show a slight gradient at the bottom on mobile, full overlay on hover desktop */}
			<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300" />

			<div className="absolute bottom-2 left-2 right-2 text-white pointer-events-none">
				<p className="text-[10px] md:text-sm font-medium truncate drop-shadow-md">
					{file.name}
				</p>
			</div>
		</div>
	);
}
