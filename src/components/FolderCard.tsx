export default function FolderGrid({
	folders,
	onSelect,
}: {
	folders: any[];
	onSelect: (id: string) => void;
}) {
	return (
		// Changed to 2 columns on mobile instead of 1 for better use of space
		<div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-12 p-4 md:p-8">
			{folders.map(folder => (
				<div
					key={folder.id}
					onClick={() => onSelect(folder.id)}
					className="group relative cursor-pointer overflow-hidden rounded-xl md:rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
				>
					{/* Aspect ratio changed to be visible on mobile */}
					<div className="aspect-video sm:aspect-square md:aspect-video bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
						<svg
							className="w-8 h-8 md:w-12 md:h-12 text-blue-400 group-hover:text-blue-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="1.5"
								d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
							/>
						</svg>
					</div>
					<div className="p-3 md:p-4 bg-white">
						<h3 className="font-semibold text-sm md:text-base text-gray-800 truncate">
							{folder.name}
						</h3>
						<p className="text-[10px] md:text-xs text-gray-500 mt-0.5 md:mt-1 uppercase tracking-wider font-bold">
							View Album
						</p>
					</div>
				</div>
			))}
		</div>
	);
}
