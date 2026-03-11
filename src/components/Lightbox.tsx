// import { useEffect } from 'react'
// import type { DriveFile } from '../lib/drive'

// export default function Lightbox({
//   files, index, onClose, onNavigate
// }: { files: DriveFile[]; index: number; onClose: () => void; onNavigate: (i: number) => void }) {

//   const f = files[index]

//   useEffect(() => {
//     function onKey(e: KeyboardEvent) {
//       if (e.key === 'Escape') onClose()
//       if (e.key === 'ArrowRight') onNavigate(Math.min(files.length - 1, index + 1))
//       if (e.key === 'ArrowLeft') onNavigate(Math.max(0, index - 1))
//     }
//     window.addEventListener('keydown', onKey)
//     return () => window.removeEventListener('keydown', onKey)
//   }, [files.length, index, onClose, onNavigate])

//   async function share() {
//     try {
//       if (navigator.share) {
//         await navigator.share({ title: f.name, url: f.viewUrl, text: 'Check this out!' })
//       } else {
//         await navigator.clipboard.writeText(f.viewUrl)
//         alert('Link copied to clipboard!')
//       }
//     } catch {}
//   }

//   // Preload neighbor image
//   const next = files[index + 1]?.viewUrl
//   if (next) {
//     const link = document.createElement('link')
//     link.rel = 'preload'
//     link.as = 'image'
//     link.href = next
//     document.head.appendChild(link)
//     setTimeout(() => document.head.removeChild(link), 3000)
//   }

//   return (
//     <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur flex items-center justify-center p-4">
//       <button className="absolute top-4 right-4 text-white text-2xl" onClick={onClose}>✕</button>
//       <button
//         className="absolute left-4 text-white text-3xl"
//         onClick={() => onNavigate(Math.max(0, index - 1))}
//         disabled={index === 0}
//       >‹</button>
//       <button
//         className="absolute right-4 text-white text-3xl"
//         onClick={() => onNavigate(Math.min(files.length - 1, index + 1))}
//         disabled={index === files.length - 1}
//       >›</button>

//       <div className="max-w-5xl w-full space-y-3">
//         <div className="w-full aspect-video bg-black/20 flex items-center justify-center">
//           <img
//             src={f.viewUrl}
//             alt={f.name}
//             loading="eager"
//             fetchPriority="high"
//             className="max-h-[80vh] object-contain rounded-xl"
//           />
//         </div>

//         <div className="flex items-center justify-between gap-3 text-white">
//           <div className="truncate">{f.name}</div>
//           <div className="flex items-center gap-2">
//             <a href={f.downloadUrl} download className="px-3 py-1 rounded bg-white/10 hover:bg-white/20">Download</a>
//             <button onClick={share} className="px-3 py-1 rounded bg-white/10 hover:bg-white/20">Share</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

import {useEffect, useRef} from "react";
import type {DriveFile} from "../lib/drive";
import {motion} from "framer-motion";

export default function Lightbox({
	files,
	index,
	onClose,
	onNavigate,
}: {
	files: DriveFile[];
	index: number;
	onClose: () => void;
	onNavigate: (i: number) => void;
}) {
	const f = files[index];
	const overlayRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function onKey(e: KeyboardEvent) {
			if (e.key === "Escape") onClose();
			if (e.key === "ArrowRight")
				onNavigate(Math.min(files.length - 1, index + 1));
			if (e.key === "ArrowLeft") onNavigate(Math.max(0, index - 1));
		}
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [index, files]);

	function clickOutside(e: any) {
		if (e.target === overlayRef.current) onClose();
	}

	return (
		<div
			ref={overlayRef}
			onMouseDown={clickOutside}
			className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-6"
		>
			<button
				className="absolute top-8 right-8 text-white text-xl hover:text-gray-300"
				onClick={onClose}
			>
				✕
			</button>

			{/* <img
				src={f.viewUrl}
				className="max-h-[85vh] object-contain rounded-2xl shadow-2xl"
				fetchPriority="high"
			/> */}

			<motion.img
				src={f.viewUrl}
				initial={{opacity: 0, scale: 0.95}}
				animate={{opacity: 1, scale: 1}}
				transition={{duration: 0.25}}
				className="max-h-[85vh] object-contain rounded-2xl shadow-2xl"
			/>

			<div className="absolute bottom-8 text-white text-center">
				<p className="font-medium text-lg">{f.name}</p>
				<div className="mt-3 flex items-center gap-4 justify-center">
					<a
						className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg"
						href={f.downloadUrl}
						download
					>
						Download
					</a>
					<button
						className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg"
						onClick={() => navigator.share?.({title: f.name, url: f.viewUrl})}
					>
						Share
					</button>
				</div>
			</div>

			{index > 0 && (
				<button
					className="absolute left-10 text-white text-5xl"
					onClick={() => onNavigate(index - 1)}
				>
					‹
				</button>
			)}

			{index < files.length - 1 && (
				<button
					className="absolute right-10 text-white text-5xl"
					onClick={() => onNavigate(index + 1)}
				>
					›
				</button>
			)}
		</div>
	);
}

// import {useEffect, useRef} from "react";
// import type {DriveFile} from "../lib/drive";

// export default function Lightbox({
// 	files,
// 	index,
// 	onClose,
// 	onNavigate,
// }: {
// 	files: DriveFile[];
// 	index: number;
// 	onClose: () => void;
// 	onNavigate: (i: number) => void;
// }) {
// 	const f = files[index];
// 	const overlayRef = useRef<HTMLDivElement | null>(null);

// 	useEffect(() => {
// 		function onKey(e: KeyboardEvent) {
// 			if (e.key === "Escape") onClose();
// 			if (e.key === "ArrowRight")
// 				onNavigate(Math.min(files.length - 1, index + 1));
// 			if (e.key === "ArrowLeft") onNavigate(Math.max(0, index - 1));
// 		}
// 		window.addEventListener("keydown", onKey);
// 		return () => window.removeEventListener("keydown", onKey);
// 	}, [files.length, index, onClose, onNavigate]);

// 	async function share() {
// 		try {
// 			if (navigator.share) {
// 				await navigator.share({
// 					title: f.name,
// 					url: f.viewUrl,
// 					text: "Check this out!",
// 				});
// 			} else {
// 				await navigator.clipboard.writeText(f.viewUrl);
// 				alert("Link copied to clipboard!");
// 			}
// 		} catch {}
// 	}

// 	// click outside to close
// 	function onOverlayMouseDown(e: React.MouseEvent) {
// 		if (e.target === overlayRef.current) onClose();
// 	}

// 	const canPrev = index > 0;
// 	const canNext = index < files.length - 1;

// 	return (
// 		<div
// 			ref={overlayRef}
// 			onMouseDown={onOverlayMouseDown}
// 			className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
// 			role="dialog"
// 			aria-modal="true"
// 		>
// 			<button
// 				className="absolute top-4 right-4 text-white text-2xl focus:outline-none focus:ring-2 focus:ring-white/60 rounded"
// 				onClick={onClose}
// 				aria-label="Close"
// 			>
// 				✕
// 			</button>

// 			<button
// 				className={`absolute left-4 text-white text-3xl px-2 rounded focus:outline-none focus:ring-2 focus:ring-white/60 ${!canPrev ? "opacity-40 cursor-default" : ""}`}
// 				onClick={() => canPrev && onNavigate(index - 1)}
// 				disabled={!canPrev}
// 				aria-label="Previous"
// 			>
// 				‹
// 			</button>

// 			<button
// 				className={`absolute right-4 text-white text-3xl px-2 rounded focus:outline-none focus:ring-2 focus:ring-white/60 ${!canNext ? "opacity-40 cursor-default" : ""}`}
// 				onClick={() => canNext && onNavigate(index + 1)}
// 				disabled={!canNext}
// 				aria-label="Next"
// 			>
// 				›
// 			</button>

// 			<div className="max-w-5xl w-full space-y-3">
// 				<div className="w-full aspect-video bg-black/20 flex items-center justify-center">
// 					<img
// 						src={f.viewUrl}
// 						alt={f.name}
// 						loading="eager"
// 						fetchPriority="high"
// 						className="max-h-[80vh] w-auto object-contain rounded-xl shadow-2xl"
// 					/>
// 				</div>

// 				<div className="flex items-center justify-between gap-3 text-white">
// 					<div className="truncate">{f.name}</div>
// 					<div className="flex items-center gap-2">
// 						<a
// 							href={f.downloadUrl}
// 							download
// 							className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/60"
// 						>
// 							Download
// 						</a>
// 						<button
// 							onClick={share}
// 							className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/60"
// 						>
// 							Share
// 						</button>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }
