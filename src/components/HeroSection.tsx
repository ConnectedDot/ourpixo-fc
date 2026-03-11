// components/Hero.tsx
export default function Hero({onSearch}: {onSearch: (q: string) => void}) {
	return (
		<div className="relative h-[45vh] flex flex-col items-center justify-center text-white overflow-hidden bg-slate-900">
			{/* Background with Overlay */}
			<div className="absolute inset-0 z-0">
				<img
					src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop"
					className="w-full h-full object-cover opacity-40 blur-[1px]"
					alt="Church Gallery"
				/>
				<div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/80" />
			</div>

			<div className="relative z-10 text-center px-4 max-w-4xl">
				<h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight">
					Faith City <span className="text-blue-400">Media</span>
				</h1>
				<p className="text-lg md:text-xl text-gray-300 mb-10 font-medium">
					Relive the moments. Download the memories.
				</p>

				{/* The Search Bar */}
				<div className="relative max-w-2xl mx-auto group">
					<input
						type="text"
						placeholder="Search albums or photos..."
						onChange={e => onSearch(e.target.value)}
						className="w-full px-8 py-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-lg shadow-2xl"
					/>
					<div className="absolute right-4 top-1/2 -translate-y-1/2 bg-blue-600 p-2 rounded-xl">
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
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</div>
				</div>
			</div>
		</div>
	);
}
