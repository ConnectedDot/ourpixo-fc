import {useEffect, useState} from "react";
import Lightbox from "./components/Lightbox";
import MasonryGallery from "./components/MasonryGallery";
import {createSearch} from "./lib/ai-search";
import {listDrive, type DriveFile, type DriveFolder} from "./lib/drive";
import FolderGrid from "./components/FolderCard";
import Hero from "./components/HeroSection";

export default function App() {
	const [folders, setFolders] = useState<DriveFolder[]>([]);
	const [files, setFiles] = useState<DriveFile[]>([]);
	const [filtered, setFiltered] = useState<DriveFile[]>([]);
	const [datas, setData] = useState<[]>([]);
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
						{/* 1. Show folders only if we aren't "inside" a folder or if searching */}
						{!currentFolderId && folders.length > 0 && (
							<div className="pt-8">
								<h2 className="px-4 text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-2">
									Albums
								</h2>
								<FolderGrid folders={folders} onSelect={setCurrentFolderId} />
							</div>
						)}

						{/* 2. Navigation bar for when inside a folder */}
						{currentFolderId && (
							<div className="flex items-center justify-between pt-6 mb-8 px-2">
								<button
									onClick={() => setCurrentFolderId(undefined)}
									className="flex items-center gap-2 py-2 px-4 -ml-4 rounded-full text-xs font-black text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
								>
									<svg
										className="w-4 h-4"
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
									BACK TO ALBUMS
								</button>

								{/* <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">
									{filtered.length} Photos
								</span> */}

								<span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-100 px-2 py-1 rounded-md">
									{filtered.length} {filtered.length === 1 ? "Photo" : "Photos"}
								</span>
							</div>
						)}

						{/* 3. The Masonry Grid */}
						<div
							className={!currentFolderId && folders.length > 0 ? "mt-4" : ""}
						>
							{filtered.length > 0 ?
								<MasonryGallery files={filtered} onOpen={setActive} />
							:	!loading && (
									<div className="text-center py-20">
										<p className="text-gray-400 font-medium">
											No photos found in this album.
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
