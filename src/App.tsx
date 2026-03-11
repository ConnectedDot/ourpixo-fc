import {useEffect, useState} from "react";
import Lightbox from "./components/Lightbox";
import MasonryGallery from "./components/MasonryGallery";
import SearchBar from "./components/SearchBar";
import {createSearch} from "./lib/ai-search";
import {listDrive, type DriveFile, type DriveFolder} from "./lib/drive";
import FolderGrid from "./components/FolderCard";
import Hero from "./components/HeroSection";

export default function App() {
	const [folders, setFolders] = useState<DriveFolder[]>([]); // Add this
	const [files, setFiles] = useState<DriveFile[]>([]);
	const [filtered, setFiltered] = useState<DriveFile[]>([]);
	const [active, setActive] = useState<number | null>(null);
	const [currentFolderId, setCurrentFolderId] = useState<string | undefined>();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		// Use your listDrive helper to get formatted URLs automatically
		setLoading(true);
		listDrive(currentFolderId).then(data => {
			setFolders(data.folders || []);
			setFiles(data.files || []);
			setFiltered(data.files || []);
			setLoading(false); // End loading
		});
	}, [currentFolderId]); // Re-run when folder changes

	const search = createSearch(files);

	function handleSearch(q: string) {
		setFiltered(search(q));
	}

	return (
		<div className="p-0">
			{/* <SearchBar onSearch={handleSearch} />

			{folders.length > 0 && (
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
					{folders.map(folder => (
						<button
							key={folder.id}
							onClick={() => setCurrentFolderId(folder.id)}
							className="p-4 border rounded-lg hover:bg-gray-100 flex flex-col items-center"
						>
							<span className="text-4xl">📁</span>
							<span className="mt-2 text-sm font-medium">{folder.name}</span>
						</button>
					))}
				</div>
			)}

			{currentFolderId && (
				<button
					onClick={() => setCurrentFolderId(undefined)}
					className="mb-4 text-blue-600 hover:underline"
				>
					← Back to Root
				</button>
			)}

			{filtered.length > 0 ?
				<MasonryGallery files={filtered} onOpen={setActive} />
			:	!folders.length && (
					<div className="text-center py-20 text-gray-500">
						No items found here.
					</div>
				)
			} */}

			<div className="min-h-screen bg-[#fafafa]">
				<Hero onSearch={handleSearch} />

				<div className="max-w-[1400px] mx-auto px-6 pb-20">
					{loading ?
						// <div className="flex flex-col items-center justify-center py-20">
						// 	<div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
						// 	<p className="text-gray-500 animate-pulse text-sm font-medium">
						// 		Fetching your memories...
						// 	</p>
						// </div>

						<div className="flex flex-col items-center justify-center py-32 space-y-6">
							<div className="relative">
								<div className="w-16 h-16 border-4 border-blue-100 rounded-full"></div>
								<div className="absolute inset-0 w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
							</div>
							<p className="text-gray-500 font-medium animate-pulse">
								Organizing your gallery...
							</p>
						</div>
					:	<>
							{/* Folders first, then Gallery */}
							{folders.length > 0 && (
								<FolderGrid folders={folders} onSelect={setCurrentFolderId} />
							)}

							{currentFolderId && (
								<button
									onClick={() => setCurrentFolderId(undefined)}
									className="flex items-center gap-2 mt-4 mb-8 text-sm font-bold text-gray-400 hover:text-blue-600 transition-colors"
								>
									<svg
										className="w-4 h-4"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M15 19l-7-7 7-7" strokeWidth="3" />
									</svg>
									BACK TO ALBUMS
								</button>
							)}

							<MasonryGallery files={filtered} onOpen={setActive} />
						</>
					}
				</div>

				{active !== null && (
					<Lightbox
						files={filtered}
						index={active}
						onClose={() => setActive(null)}
						onNavigate={setActive}
					/>
				)}
			</div>
		</div>
	);
}
