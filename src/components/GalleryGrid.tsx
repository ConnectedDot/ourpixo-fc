// import type { DriveFile } from '../lib/drive'

// export default function GalleryGrid({
//   files, onOpen
// }: { files: DriveFile[]; onOpen: (index: number) => void }) {
//   return (
//     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
//       {files.map((f, i) => (
//         <button key={f.id} onClick={() => onOpen(i)} className="group relative">
//           <div className="aspect-[4/3] overflow-hidden rounded-xl bg-gray-200">
//             <img
//               src={f.thumb || f.viewUrl}
//               alt={f.name}
//               loading="lazy"
//               decoding="async"
//               className="h-full w-full object-cover transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
//             />
//           </div>
//           <div className="absolute bottom-1 left-1 right-1 opacity-0 group-hover:opacity-100 transition text-xs bg-black/40 text-white rounded px-1 py-0.5">
//             {f.name}
//           </div>
//         </button>
//       ))}
//     </div>
//   )
// }

import {useState} from "react";
import type {DriveFile} from "../lib/drive";

export default function GalleryGrid({
	files,
	onOpen,
}: {
	files: DriveFile[];
	onOpen: (index: number) => void;
}) {
	return (
		<div className="animate-fadeIn columns-2 sm:columns-3 md:columns-4 xl:columns-5 gap-5">
			{/* <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-5 mb-5"> */}
			{files.map((file, i) => (
				<Tile key={file.id} file={file} onClick={() => onOpen(i)} />
			))}
		</div>
	);
}

function Tile({file, onClick}: {file: DriveFile; onClick: () => void}) {
	const [loaded, setLoaded] = useState(false);

	return (
		<div
			onClick={onClick}
			className="relative mb-4 break-inside-avoid cursor-pointer group overflow-hidden rounded-xl"
		>
			{/* Blur placeholder */}
			{file.blurDataURL && (
				<img
					src={file.blurDataURL}
					className={`absolute inset-0 w-full h-full object-cover scale-110 blur-xl transition-opacity duration-700 ${
						loaded ? "opacity-0" : "opacity-100"
					}`}
				/>
			)}

			{/* Main image */}
			<img
				src={file.thumb!}
				alt={file.name}
				loading="lazy"
				onLoad={() => setLoaded(true)}
				className={`w-full rounded-xl object-cover transition duration-700
        ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}
			/>

			{/* Hover overlay */}
			<div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-300" />
		</div>
	);
}

// import {useState} from "react";
// import type {DriveFile} from "../lib/drive";

// function Tile({file, onClick}: {file: DriveFile; onClick: () => void}) {
// 	const [loaded, setLoaded] = useState(false);
// 	return (
// 		<button onClick={onClick} className="group relative">
// 			<div className="aspect-[4/3] overflow-hidden rounded-xl bg-gray-200">
// 				{!loaded && <div className="h-full w-full animate-pulse bg-gray-200" />}
// 				<img
// 					src={file.thumb || file.viewUrl}
// 					alt={file.name}
// 					loading="lazy"
// 					decoding="async"
// 					onLoad={() => setLoaded(true)}
// 					className={`h-full w-full object-cover transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 ${loaded ? "opacity-100" : "opacity-0"}`}
// 				/>
// 			</div>
// 			<div className="absolute bottom-1 left-1 right-1 opacity-0 group-hover:opacity-100 transition text-xs bg-black/40 text-white rounded px-1 py-0.5">
// 				{file.name}
// 			</div>
// 		</button>
// 	);
// }

// export default function GalleryGrid({
// 	files,
// 	onOpen,
// }: {
// 	files: DriveFile[];
// 	onOpen: (index: number) => void;
// }) {
// 	return (
// 		<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
// 			{files.map((f, i) => (
// 				<Tile key={f.id} file={f} onClick={() => onOpen(i)} />
// 			))}
// 		</div>
// 	);
// }
