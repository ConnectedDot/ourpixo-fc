export default function Hero({onSearch}: {onSearch: (q: string) => void}) {
	return (
		<div className="relative h-[40vh] md:h-[50vh] flex flex-col items-center justify-center text-white overflow-hidden bg-slate-900">
			<div className="absolute inset-0 z-0">
				<img
					src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop"
					className="w-full h-full object-cover opacity-40 blur-[1px]"
					alt="Church Gallery"
				/>
				<div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/90" />
			</div>

			<div className="relative z-10 text-center px-6 w-full max-w-4xl">
				{/* Text sizes adjusted for mobile (text-3xl) vs desktop (text-7xl) */}
				<h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold mb-2 tracking-tight">
					Faith City <span className="text-blue-400">Media</span>
				</h1>
				<p className="text-sm sm:text-lg md:text-xl text-gray-300 mb-6 md:mb-10 font-medium">
					Relive the moments. Download the memories.
				</p>

				<div className="relative max-w-2xl mx-auto group">
					<input
						type="text"
						placeholder="Search albums..."
						onChange={e => onSearch(e.target.value)}
						// Smaller padding on mobile (py-3) vs desktop (py-5)
						className="w-full px-5 py-3 md:px-8 md:py-5 rounded-xl md:rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-base md:text-lg shadow-2xl"
					/>
					<div className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-blue-600 p-1.5 md:p-2 rounded-lg md:rounded-xl">
						<svg
							className="w-5 h-5 md:w-6 md:h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</div>
				</div>
			</div>
		</div>
	);
}
