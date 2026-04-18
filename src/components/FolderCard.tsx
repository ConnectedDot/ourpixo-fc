import { motion } from "framer-motion";

export default function FolderGrid({
	folders,
	onSelect,
}: {
	folders: any[];
	onSelect: (id: string) => void;
}) {
	return (
		<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 mb-16 px-2">
			{folders.map((folder, index) => (
				<motion.div
					key={folder.id}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: index * 0.05, duration: 0.5 }}
					onClick={() => onSelect(folder.id)}
					className="group relative cursor-pointer"
				>
					{/* Folder Icon / Illustration Container */}
					<div className="relative aspect-[4/3] rounded-xl md:rounded-3xl overflow-hidden bg-white border border-slate-200/60 shadow-sm group-hover:shadow-2xl group-hover:shadow-blue-500/10 transition-all duration-500">
						{/* Background Decoration */}
						<div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

						{/* Main Icon */}
						<div className="absolute inset-0 flex flex-col items-center justify-center p-2 md:p-6 text-center">
							<div className="relative mb-1 md:mb-4">
                                {/* Stacked element to look like a folder tab */}
                                <div className="absolute -top-0.5 md:-top-1 left-2 w-5 md:w-8 h-1 md:h-2 bg-blue-100 rounded-t-lg group-hover:bg-blue-200 transition-colors"></div>
								<div className="w-10 h-7 md:w-16 md:h-12 bg-blue-600/10 rounded-lg md:rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-500">
                                    <svg
                                        className="w-5 h-5 md:w-8 md:h-8 text-blue-600 group-hover:text-white transition-colors"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                                        />
                                    </svg>
                                </div>
							</div>
                            
                            <h3 className="font-bold text-[10px] sm:text-[13px] md:text-[15px] text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors px-1">
                                {folder.name}
                            </h3>
                            <p className="text-[7px] md:text-[10px] font-medium text-slate-400 uppercase tracking-widest mt-0.5 md:mt-1">
                                Open Album
                            </p>
						</div>



						{/* Bottom Glow */}
						<div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-2/3 h-10 bg-blue-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
					</div>
				</motion.div>
			))}
		</div>
	);
}

