import { motion } from "framer-motion";

export default function Hero({onSearch}: {onSearch: (q: string) => void}) {
	return (
		<header className="relative flex min-h-[360px] flex-col justify-end overflow-hidden bg-stone-950 pb-16 text-white sm:min-h-[460px] md:min-h-[620px] md:pb-28">
			<div className="absolute inset-0 z-0">
				<img
					src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop"
					className="h-full w-full scale-105 object-cover opacity-45"
					alt="Church Gallery"
				/>
				<div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(28,25,23,0.32)_0%,rgba(28,25,23,0.62)_58%,#f7f5f1_100%)]" />
				<div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#f7f5f1] to-transparent" />
			</div>

			<motion.div 
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
				className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-8"
			>
				<motion.div
					initial={{ opacity: 0, y: 12 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2, duration: 0.5 }}
					className="mb-4 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 backdrop-blur-md md:mb-6"
				>
					<span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
					<span className="text-[9px] font-bold uppercase tracking-[0.28em] text-stone-100 md:text-xs">
						Digital Archive
					</span>
				</motion.div>

				<h1 className="max-w-3xl text-4xl font-semibold leading-[0.95] tracking-tight text-white sm:text-6xl md:text-8xl">
					Faith City Media
				</h1>
				<p className="mt-4 max-w-2xl text-sm font-light leading-6 text-stone-200 sm:text-base md:mt-6 md:text-xl md:leading-8">
					Relive the sacred moments with a quieter, sharper archive for albums, services, celebrations, and every captured memory.
				</p>

				<div className="group relative mt-8 max-w-xl md:mt-12">
					<input
						type="text"
						placeholder="Search the archive..."
						onChange={e => onSearch(e.target.value)}
						className="relative h-14 w-full rounded-full border border-white/15 bg-white/12 px-5 pr-14 text-sm text-white shadow-2xl shadow-stone-950/20 backdrop-blur-2xl transition-all placeholder:text-stone-300/70 focus:border-amber-200/60 focus:bg-white/16 focus:outline-none focus:ring-4 focus:ring-amber-200/10 md:h-16 md:px-7 md:pr-16 md:text-base"
					/>
					<div className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-amber-200 text-stone-950 shadow-lg shadow-stone-950/10 md:h-12 md:w-12">
						<svg
							className="h-4 w-4 md:h-5 md:w-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2.5"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</div>
				</div>
			</motion.div>
		</header>
	);
}

