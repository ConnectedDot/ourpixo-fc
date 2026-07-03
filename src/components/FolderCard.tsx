import { motion } from "framer-motion";
import type {DriveFolder} from "../lib/drive";

export default function FolderGrid({
	folders,
	onSelect,
}: {
	folders: DriveFolder[];
	onSelect: (folder: DriveFolder) => void;
}) {
	return (
		<div className="mb-12 grid grid-cols-2 gap-3 sm:gap-4 md:mb-16 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
			{folders.map((folder, index) => (
				<motion.div
					key={folder.id}
					initial={{ opacity: 0, y: 22 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-40px" }}
					transition={{ delay: Math.min(index * 0.04, 0.28), duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
					whileHover={{ y: -4 }}
					onClick={() => onSelect(folder)}
					className="group relative cursor-pointer"
				>
					<div className="relative aspect-[1.08] overflow-hidden rounded-2xl border border-white/80 bg-white shadow-[0_16px_50px_rgba(28,25,23,0.06)] transition-all duration-500 group-hover:shadow-[0_22px_70px_rgba(28,25,23,0.12)] md:aspect-[4/3] md:rounded-[1.5rem]">
						<div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(251,191,36,0.20),transparent_28%),linear-gradient(135deg,#fffaf0,#f4f1ea_58%,#ffffff)]" />
						<div className="absolute -right-8 top-8 h-24 w-24 rotate-12 rounded-2xl border border-stone-200/70 bg-white/50 backdrop-blur-sm transition-transform duration-700 group-hover:rotate-6 md:h-32 md:w-32" />
						<div className="absolute -right-3 bottom-5 h-20 w-24 -rotate-6 rounded-2xl border border-stone-200/70 bg-stone-900/5 transition-transform duration-700 group-hover:-rotate-2 md:h-28 md:w-32" />

						<div className="absolute inset-0 flex flex-col justify-between p-4 md:p-5">
							<div className="flex items-start justify-between">
								<div className="relative">
									<div className="absolute -top-1 left-3 h-2 w-9 rounded-t-lg bg-amber-200 transition-colors group-hover:bg-amber-300 md:w-12" />
									<div className="flex h-11 w-14 items-center justify-center rounded-xl bg-stone-950 text-white shadow-lg shadow-stone-950/10 transition-transform duration-500 group-hover:scale-105 md:h-14 md:w-16">
										<svg
											className="h-6 w-6 md:h-7 md:w-7"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="1.8"
												d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
											/>
										</svg>
									</div>
								</div>
								<span className="rounded-full bg-white/70 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-stone-500 shadow-sm backdrop-blur-sm">
									Album
								</span>
							</div>
							<div>
								<h3 className="line-clamp-2 text-base font-semibold leading-tight tracking-tight text-stone-950 transition-colors group-hover:text-amber-800 md:text-xl">
									{folder.name}
								</h3>
								<p className="mt-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-stone-400">
									Open
									<span className="h-px flex-1 bg-stone-200" />
								</p>
							</div>
						</div>
					</div>
				</motion.div>
			))}
		</div>
	);
}

