import { useState } from "react";
import type { DriveFile } from "../lib/drive";
import { motion } from "framer-motion";

export default function GalleryImage({
  file,
  onClick,
}: {
  file: DriveFile;
  onClick: () => void;
}) {
  const [loaded, setLoaded] = useState(false);

	return (
		<motion.div
			initial={{ opacity: 0, y: 22, scale: 0.98 }}
			whileInView={{ opacity: 1, y: 0, scale: 1 }}
			viewport={{ once: true, margin: "-50px" }}
			whileHover={{ y: -5 }}
			transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
			onClick={onClick}
			className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/80 bg-stone-100 shadow-[0_14px_45px_rgba(28,25,23,0.08)] md:rounded-[1.35rem]"
		>
			<img
				src={file.thumb}
				alt={file.name}
				onLoad={() => setLoaded(true)}
				className={`w-full transition-all duration-1000 ease-in-out group-hover:scale-[1.04] ${
					loaded ? "opacity-100 blur-0" : "opacity-0 blur-xl"
				}`}
				loading="lazy"
			/>
			<div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-stone-950/75 via-stone-950/8 to-transparent p-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:p-4">
				<div className="translate-y-3 transition-transform duration-500 group-hover:translate-y-0">
					<div className="flex items-center gap-2">
						<div className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-stone-950">
							<svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
							</svg>
						</div>
						<p className="truncate text-[11px] font-semibold tracking-wide text-white md:text-xs">
							View photo
						</p>
					</div>
				</div>
			</div>
		</motion.div>
	);
}

