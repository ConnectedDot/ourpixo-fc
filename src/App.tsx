import {useEffect, useState} from "react";
import Lightbox from "./components/Lightbox";
import MasonryGallery from "./components/MasonryGallery";
import {createSearch} from "./lib/ai-search";
import {listDrive, type DriveFile, type DriveFolder} from "./lib/drive";
import FolderGrid from "./components/FolderCard";
import Hero from "./components/HeroSection";

type AnyObj = Record<string, unknown>;

export default function App() {
	const [folders, setFolders] = useState<DriveFolder[]>([]);
	const [files, setFiles] = useState<DriveFile[]>([]);
	const [filtered, setFiltered] = useState<DriveFile[]>([]);
	// const [datas, setData] = useState([]);
	const [datas, setData] = useState<AnyObj | null>(null);
	const [active, setActive] = useState<number | null>(null);
	const [currentFolderId, setCurrentFolderId] = useState<string | undefined>();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		// Scroll to top when changing folders for a better mobile experience
		window.scrollTo({top: 0, behavior: "smooth"});

		listDrive(currentFolderId).then(data => {
			setFolders(data.folders || []);
			setFiles(data.files || []);
			setFiltered(data.files || []);
			setData(data as any);
			setLoading(false);
		});
	}, [currentFolderId]);
	console.log(filtered, "filtered in App.tsx");
	console.log(datas, "data in App.tsx");

	const search = createSearch(files);

	function handleSearch(q: string) {
		setFiltered(search(q));
	}

	return (
		<div className="min-h-screen bg-[#fafafa] selection:bg-blue-100">
			<Hero onSearch={handleSearch} />

			<main className="max-w-[1400px] mx-auto px-4 md:px-6 pb-20">
				{loading ?
					<div className="flex flex-col items-center justify-center py-24 md:py-32 space-y-6">
						<div className="relative">
							<div className="w-12 h-12 md:w-16 md:h-16 border-4 border-blue-100 rounded-full"></div>
							<div className="absolute inset-0 w-12 h-12 md:w-16 md:h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
						</div>
						<p className="text-sm md:text-base text-gray-500 font-medium animate-pulse">
							Organizing your gallery...
						</p>
					</div>
				:	<div className="animate-in fade-in duration-700">
						{/* 1. Folders Section */}
						{folders.length > 0 && (
							<section className="pt-10">
								<div className="flex items-center justify-between mb-6 px-4">
									<h2 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em]">
										{currentFolderId ? "Sub-Albums" : "Recent Albums"}
									</h2>
									<div className="h-px flex-1 bg-blue-100/50 mx-6 hidden sm:block"></div>
								</div>
								<FolderGrid folders={folders} onSelect={setCurrentFolderId} />
							</section>
						)}

						{/* 2. Navigation bar for when inside a folder */}
						{currentFolderId && (
							<div className="flex items-center justify-between pt-4 mb-6 md:mb-10 px-2 md:px-4">
								<button
									onClick={() => setCurrentFolderId(undefined)}
									className="group flex items-center gap-2 md:gap-3 py-2 md:py-2.5 px-4 md:px-6 rounded-full glass hover:bg-white transition-all duration-300 shadow-sm"
								>
									<div className="w-4 h-4 md:w-5 md:h-5 flex items-center justify-center bg-blue-600 rounded-full text-white group-hover:scale-110 transition-transform">
										<svg
											className="w-2.5 h-2.5 md:w-3.5 md:h-3.5"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												d="M15 19l-7-7 7-7"
												strokeWidth="3"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</div>
									<span className="text-[9px] md:text-[11px] font-bold text-gray-700 uppercase tracking-widest">
										Gallery
									</span>
								</button>

								<div className="flex flex-col items-end">
									<span className="text-[12px] md:text-[14px] font-black text-slate-800 tracking-tight">
										Viewing Album
									</span>
									<span className="text-[8px] md:text-[10px] font-medium text-blue-500 uppercase tracking-widest">
										{(datas as any)?.totalCount ?? files.length} captures
									</span>
								</div>
							</div>
						)}


						{/* 3. The Masonry Grid */}
						<div className="mt-8">
							{filtered.length > 0 ?
								<MasonryGallery files={filtered} onOpen={setActive} />
							:	!loading && folders.length === 0 && (
									<div className="flex flex-col items-center justify-center py-32 text-center">
										<div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
											<svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
											</svg>
										</div>
										<h3 className="text-slate-900 font-bold mb-1">No media found</h3>
										<p className="text-slate-400 text-sm max-w-xs">
											We couldn't find any photos in this specific album yet.
										</p>
									</div>
								)
							}
						</div>

					</div>
				}
			</main>

			{/* Lightbox is fixed, so its placement in the DOM doesn't matter for layout */}
			{active !== null && (
				<Lightbox
					files={filtered}
					index={active}
					onClose={() => setActive(null)}
					onNavigate={setActive}
				/>
			)}
		</div>
	);
}
