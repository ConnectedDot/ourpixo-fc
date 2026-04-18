import { motion } from "framer-motion";

export default function Hero({onSearch}: {onSearch: (q: string) => void}) {
	return (
		<div className="relative h-[30vh] sm:h-[45vh] md:h-[60vh] flex flex-col items-center justify-center text-white overflow-hidden bg-slate-950">
			{/* Animated Background Blobs */}
			<div className="absolute top-0 -left-4 w-56 h-56 md:w-72 md:h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
			<div className="absolute top-0 -right-4 w-56 h-56 md:w-72 md:h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
			<div className="absolute -bottom-8 left-20 w-56 h-56 md:w-72 md:h-72 bg-emerald-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

			<div className="absolute inset-0 z-0">
				<img
					src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop"
					className="w-full h-full object-cover opacity-30 brightness-50"
					alt="Church Gallery"
				/>
				<div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/40 to-[#fcfcfd]" />
			</div>

			<motion.div 
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
				className="relative z-10 text-center px-4 w-full max-w-4xl pt-6 md:pt-0"
			>
				<motion.div
					initial={{ scale: 0.9, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ delay: 0.2, duration: 0.5 }}
					className="inline-block px-3 py-1 mb-2 md:mb-6 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
				>
					<span className="text-[8px] md:text-xs font-bold uppercase tracking-[0.3em] text-blue-400">
						Digital Archive
					</span>
				</motion.div>

				<h1 className="text-2xl sm:text-4xl md:text-8xl font-black mb-2 md:mb-4 tracking-tighter leading-tight md:leading-none">
					Faith City <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Media</span>
				</h1>
				<p className="text-[11px] sm:text-lg md:text-2xl text-slate-300 mb-6 md:mb-14 font-light max-w-lg mx-auto leading-relaxed px-4 opacity-80">
					Relive the sacred moments. High-precision captures of our journey together in <span className="text-white font-medium">Faith.</span>
				</p>

				<div className="relative max-w-sm mx-auto group">
					<div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl md:rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
					<input
						type="text"
						placeholder="Search the archive..."
						onChange={e => onSearch(e.target.value)}
						className="relative w-full px-4 py-3 md:px-8 md:py-6 rounded-xl md:rounded-2xl bg-slate-900/40 backdrop-blur-2xl border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-xs md:text-lg shadow-2xl"
					/>
					<div className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 p-1.5 md:p-3 rounded-lg md:rounded-xl shadow-lg shadow-blue-600/20">
						<svg
							className="w-3.5 h-3.5 md:w-5 md:h-5"
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


		</div>
	);
}

