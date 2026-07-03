import {useEffect, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
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
	const [isDownloading, setIsDownloading] = useState(false);

	useEffect(() => {
		setHighResLoaded(false);
		setIsDownloading(false);
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
			const response = await fetch(`${f.viewUrl}&download=true`);
			if (!response.ok) throw new Error("Download failed");

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
		<div className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-950/96 backdrop-blur-md">
			<div className="absolute inset-0" onClick={onClose} />

			<img
				src={f.thumb || ""}
				className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25 blur-3xl"
				alt=""
			/>

			<button
				className="absolute right-4 top-4 z-[110] rounded-full bg-white/10 p-3 text-white/75 backdrop-blur-md transition-all hover:bg-white/15 hover:text-white md:right-6 md:top-6"
				onClick={onClose}
			>
				<svg className="h-5 w-5 md:h-6 md:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>

			<div className="pointer-events-none relative z-10 flex h-full w-full max-w-6xl flex-col items-center justify-center p-3 md:p-5">
				<div className="pointer-events-auto relative flex items-center justify-center">
					{!highResLoaded && (
						<div className="absolute inset-0 z-20 flex items-center justify-center">
							<div className="h-9 w-9 animate-spin rounded-full border-2 border-white/30 border-t-amber-200 md:h-11 md:w-11"></div>
						</div>
					)}

					<img
						src={(f as any).highResThumb || f.thumb}
						alt=""
						className={`max-h-[64vh] w-auto rounded-2xl object-contain shadow-2xl transition-opacity duration-700 md:max-h-[78vh] ${highResLoaded ? "absolute opacity-0" : "opacity-100"}`}
					/>

					<motion.img
						key={f.id}
						src={f.viewUrl}
						alt={f.name}
						onLoad={() => setHighResLoaded(true)}
						initial={{scale: 0.98}}
						animate={{scale: 1}}
						transition={{duration: 0.45, ease: [0.22, 1, 0.36, 1]}}
						className={`max-h-[64vh] w-auto rounded-2xl object-contain shadow-2xl transition-opacity duration-700 md:max-h-[78vh] ${highResLoaded ? "opacity-100" : "opacity-0"}`}
					/>
				</div>

				<div className="pointer-events-auto mt-4 w-full max-w-sm px-2 text-center text-white md:mt-6">
					<h2 className="mb-4 truncate text-sm font-medium text-white/80 md:text-base">{f.name}</h2>

					<div className="flex gap-2 md:gap-3">
						<button
							onClick={handleDownload}
							disabled={isDownloading}
							className={`flex h-12 flex-1 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold shadow-lg transition-all ${
								isDownloading ?
									"cursor-not-allowed bg-white/20 text-white/70"
								:	"bg-white text-stone-950 hover:bg-amber-200"
							}`}
						>
							{isDownloading ?
								<>
									<div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
									<span className="text-xs">Processing...</span>
								</>
							:	<>
									<svg className="h-4 w-4 md:h-5 md:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
									</svg>
									Download
								</>
							}
						</button>

						<button
							onClick={handleShare}
							className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 text-sm font-medium text-white backdrop-blur-md transition-all hover:bg-white/20"
						>
							<svg className="h-4 w-4 md:h-5 md:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 100-2.684 3 3 0 000 2.684zm0 12.684a3 3 0 100-2.684 3 3 0 000 2.684z" />
							</svg>
							Share
						</button>
					</div>
				</div>
			</div>

			<div className="pointer-events-none absolute inset-x-4 bottom-6 z-[110] flex items-center justify-between md:top-1/2 md:-translate-y-1/2">
				<button
					disabled={index === 0}
					onClick={() => onNavigate(index - 1)}
					className="pointer-events-auto rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition-all hover:bg-white/20 disabled:opacity-0 md:p-4"
				>
					<svg className="h-6 w-6 md:h-8 md:w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
					</svg>
				</button>

				<span className="font-mono text-xs text-white/60 md:hidden">
					{index + 1} / {files.length}
				</span>

				<button
					disabled={index === files.length - 1}
					onClick={() => onNavigate(index + 1)}
					className="pointer-events-auto rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition-all hover:bg-white/20 disabled:opacity-0 md:p-4"
				>
					<svg className="h-6 w-6 md:h-8 md:w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
					</svg>
				</button>
			</div>

			<AnimatePresence>
				{showToast && (
					<motion.div
						initial={{opacity: 0, y: 50}}
						animate={{opacity: 1, y: 0}}
						exit={{opacity: 0, y: 20}}
						className="fixed bottom-10 left-1/2 z-[200] -translate-x-1/2 rounded-full bg-white px-6 py-3 font-medium text-stone-950 shadow-2xl"
					>
						Link copied to clipboard.
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
