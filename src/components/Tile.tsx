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
				decoding="async"
				onLoad={() => setLoaded(true)}
				className={`w-full object-cover transition duration-500 ${
					loaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
				}`}
			/>

			<div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition" />

			<div className="absolute bottom-3 left-3 right-3 text-white opacity-0 group-hover:opacity-100 transition">
				<p className="text-sm font-medium truncate">{file.name}</p>
			</div>
		</div>
	);
}
