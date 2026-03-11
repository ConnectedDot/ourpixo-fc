import {useEffect, useRef, useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import type {DriveFile} from "../lib/drive";

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
	const [highResLoaded, setHighResLoaded] = useState(false);
	const [showToast, setShowToast] = useState(false);
	const [isDownloading, setIsDownloading] = useState(false); // New state

	// Reset loading state whenever the index (image) changes
	useEffect(() => {
		setHighResLoaded(false);
		setIsDownloading(false); // Reset on image change
	}, [index]);

	useEffect(() => {
		function onKey(e: KeyboardEvent) {
			if (e.key === "Escape") onClose();
			if (e.key === "ArrowRight")
				onNavigate(Math.min(files.length - 1, index + 1));
			if (e.key === "ArrowLeft") onNavigate(Math.max(0, index - 1));
		}
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [index, files, onClose, onNavigate]);

	const handleShare = async () => {
		// Crucial: Use your Vercel proxy URL, NOT the google drive URL
		const shareUrl = `${window.location.origin}/api/drive/image?id=${f.id}`;

		if (navigator.share) {
			try {
				await navigator.share({title: f.name, url: shareUrl});
			} catch (err) {
				console.log("Share cancelled");
			}
		} else {
			await navigator.clipboard.writeText(shareUrl);
			setShowToast(true);
			setTimeout(() => setShowToast(false), 3000);
		}
	};

	const handleDownload = async () => {
		if (isDownloading) return;

		setIsDownloading(true);
		try {
			// Trigger the download via the API
			const response = await fetch(`${f.viewUrl}&download=true`);
			if (!response.ok) throw new Error("Download failed");

			// Convert response to a blob and trigger a manual download
			const blob = await response.blob();
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = f.name;
			document.body.appendChild(a);
			a.click();
			window.URL.revokeObjectURL(url);
			document.body.removeChild(a);
		} catch (error) {
			console.error(error);
			alert("Failed to download image. Please try again.");
		} finally {
			setIsDownloading(false);
		}
	};

	return (
		<div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md">
			{/* Background Close Layer: Use a separate div for "click outside" to avoid event bubbling issues */}
			<div className="absolute inset-0" onClick={onClose} />

			{/* Blurred Background (The "Instant" feel) */}
			<img
				src={f.thumb || ""}
				className="absolute inset-0 w-full h-full object-cover opacity-30 blur-3xl pointer-events-none"
				alt=""
			/>

			<button
				className="absolute top-6 right-6 z-[110] text-white/70 hover:text-white p-3 bg-white/10 rounded-full transition-all"
				onClick={onClose}
			>
				<svg
					className="w-6 h-6"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>

			{/* Main Image Container */}
			<div className="relative z-10 w-full max-w-5xl h-full flex flex-col items-center justify-center p-4 pointer-events-none">
				<div className="relative flex items-center justify-center pointer-events-auto">
					{!highResLoaded && (
						<div className="absolute inset-0 flex items-center justify-center">
							<div className="w-10 h-10 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
						</div>
					)}
					<motion.img
						key={f.id}
						src={f.viewUrl}
						onLoad={() => setHighResLoaded(true)}
						className={`max-h-[75vh] md:max-h-[80vh] w-auto object-contain rounded-xl shadow-2xl transition-opacity duration-500 ${highResLoaded ? "opacity-100" : "opacity-0"}`}
					/>
				</div>

				{/* Responsive Controls */}
				<div className="mt-6 text-center text-white pointer-events-auto w-full max-w-sm px-4">
					<h2 className="text-lg font-medium mb-4 truncate">{f.name}</h2>

					<div className="flex flex-col sm:flex-row gap-3">
						<button
							onClick={handleDownload}
							disabled={isDownloading}
							className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold transition-all shadow-lg ${
								isDownloading ?
									"bg-gray-600 cursor-not-allowed"
								:	"bg-white text-black hover:bg-blue-600 hover:text-white"
							}`}
						>
							{isDownloading ?
								<>
									<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
									Processing...
								</>
							:	<>
									<svg
										className="w-5 h-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
										/>
									</svg>
									Download
								</>
							}
						</button>

						<button
							onClick={handleShare}
							className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white/10 border border-white/20 backdrop-blur-md rounded-full hover:bg-white/20 transition-all text-white font-medium"
						>
							<svg
								className="w-5 h-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 100-2.684 3 3 0 000 2.684zm0 12.684a3 3 0 100-2.684 3 3 0 000 2.684z"
								/>
							</svg>
							Share
						</button>
					</div>
				</div>
			</div>
			{/* Navigation Arrows */}
			{/* <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-[105]">
				<button
					disabled={index === 0}
					onClick={() => onNavigate(index - 1)}
					className="p-4 rounded-full bg-white/5 text-white hover:bg-white/20 disabled:opacity-0 transition-all pointer-events-auto"
				>
					<svg
						className="w-8 h-8"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M15 19l-7-7 7-7"
						/>
					</svg>
				</button>
				<button
					disabled={index === files.length - 1}
					onClick={() => onNavigate(index + 1)}
					className="p-4 rounded-full bg-white/5 text-white hover:bg-white/20 disabled:opacity-0 transition-all pointer-events-auto"
				>
					<svg
						className="w-8 h-8"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</button>
			</div> */}

			<div className="absolute bottom-6 md:top-1/2 md:-translate-y-1/2 inset-x-4 flex justify-between items-center z-[110] pointer-events-none">
				<button
					disabled={index === 0}
					onClick={() => onNavigate(index - 1)}
					className="p-3 md:p-4 rounded-full bg-white/10 text-white hover:bg-white/20 disabled:opacity-0 transition-all pointer-events-auto backdrop-blur-md"
				>
					<svg
						className="w-6 h-6 md:w-8 md:h-8"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M15 19l-7-7 7-7"
						/>
					</svg>
				</button>

				{/* Small counter for mobile users */}
				<span className="md:hidden text-white/60 text-xs font-mono">
					{index + 1} / {files.length}
				</span>

				<button
					disabled={index === files.length - 1}
					onClick={() => onNavigate(index + 1)}
					className="p-3 md:p-4 rounded-full bg-white/10 text-white hover:bg-white/20 disabled:opacity-0 transition-all pointer-events-auto backdrop-blur-md"
				>
					<svg
						className="w-6 h-6 md:w-8 md:h-8"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</button>
			</div>

			{/* Share Toast Notification */}
			<AnimatePresence>
				{showToast && (
					<motion.div
						initial={{opacity: 0, y: 50}}
						animate={{opacity: 1, y: 0}}
						exit={{opacity: 0, y: 20}}
						className="fixed bottom-10 left-1/2 -translate-x-1/2 px-6 py-3 bg-blue-600 text-white rounded-full shadow-2xl font-medium z-[200]"
					>
						Link copied to clipboard! 🚀
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
