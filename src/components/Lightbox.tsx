import {useEffect, useRef} from "react";
import {motion} from "framer-motion";
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
				className="absolute top-8 right-8 text-white text-xl"
				onClick={onClose}
			>
				✕
			</button>

			<motion.img
				src={f.viewUrl}
				initial={{opacity: 0, scale: 0.95}}
				animate={{opacity: 1, scale: 1}}
				transition={{duration: 0.25}}
				className="max-h-[85vh] object-contain rounded-2xl shadow-2xl"
			/>

			<div className="absolute bottom-8 text-white text-center">
				<p className="font-medium text-lg">{f.name}</p>

				<div className="mt-3 flex gap-4 justify-center">
					<a
						href={f.downloadUrl}
						download
						className="px-4 py-2 bg-white/10 rounded-lg"
					>
						Download
					</a>

					<button
						onClick={() => navigator.share?.({title: f.name, url: f.viewUrl})}
						className="px-4 py-2 bg-white/10 rounded-lg"
					>
						Share
					</button>
				</div>
			</div>
		</div>
	);
}
