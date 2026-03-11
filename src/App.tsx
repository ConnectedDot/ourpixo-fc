import {useEffect, useState} from "react";
import Lightbox from "./components/Lightbox";
import MasonryGallery from "./components/MasonryGallery";
import SearchBar from "./components/SearchBar";
import {createSearch} from "./lib/ai-search";
import {listDrive, type DriveFile, type DriveFolder} from "./lib/drive";

export default function App() {
	const [folders, setFolders] = useState<DriveFolder[]>([]); // Add this
	const [files, setFiles] = useState<DriveFile[]>([]);
	const [filtered, setFiltered] = useState<DriveFile[]>([]);
	const [active, setActive] = useState<number | null>(null);
	const [currentFolderId, setCurrentFolderId] = useState<string | undefined>();

	useEffect(() => {
		// Use your listDrive helper to get formatted URLs automatically
		listDrive(currentFolderId).then(data => {
			setFolders(data.folders || []);
			setFiles(data.files || []);
			setFiltered(data.files || []);
		});
	}, [currentFolderId]); // Re-run when folder changes

	const search = createSearch(files);

	function handleSearch(q: string) {
		setFiltered(search(q));
	}

	return (
		<div className="p-6">
			<SearchBar onSearch={handleSearch} />

			{/* Render Folders if they exist */}
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

			{/* Back Button if inside a folder */}
			{currentFolderId && (
				<button
					onClick={() => setCurrentFolderId(undefined)}
					className="mb-4 text-blue-600 hover:underline"
				>
					← Back to Root
				</button>
			)}

			{/* Render Files */}
			{filtered.length > 0 ?
				<MasonryGallery files={filtered} onOpen={setActive} />
			:	!folders.length && (
					<div className="text-center py-20 text-gray-500">
						No items found here.
					</div>
				)
			}

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
