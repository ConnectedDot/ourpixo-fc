import {useEffect, useMemo, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import Lightbox from "./components/Lightbox";
import MasonryGallery from "./components/MasonryGallery";
import {createSearch} from "./lib/ai-search";
import {listDrive, type DriveFile, type DriveFolder} from "./lib/drive";
import FolderGrid from "./components/FolderCard";
import Hero from "./components/HeroSection";

type AnyObj = Record<string, unknown>;
type FolderCrumb = Pick<DriveFolder, "id" | "name">;

export default function App() {
	const [folders, setFolders] = useState<DriveFolder[]>([]);
	const [files, setFiles] = useState<DriveFile[]>([]);
	const [filtered, setFiltered] = useState<DriveFile[]>([]);
	const [datas, setData] = useState<AnyObj | null>(null);
	const [active, setActive] = useState<number | null>(null);
	const [folderPath, setFolderPath] = useState<FolderCrumb[]>([]);
	const [loading, setLoading] = useState(false);
	const activeCrumb = folderPath[folderPath.length - 1];
	const currentFolderId = activeCrumb?.id;

	useEffect(() => {
		setLoading(true);
		window.scrollTo({top: 0, behavior: "smooth"});

		listDrive(currentFolderId)
			.then(data => {
				setFolders(data.folders || []);
				setFiles(data.files || []);
				setFiltered(data.files || []);
				setData(data as any);
			})
			.finally(() => setLoading(false));
	}, [currentFolderId]);

	const search = useMemo(() => createSearch(files), [files]);
	const captureCount = (datas as any)?.totalCount ?? files.length;
	const currentFolderName = activeCrumb?.name ?? "Gallery";

	function handleSearch(q: string) {
		setFiltered(search(q));
	}

	function openFolder(folder: DriveFolder) {
		setFolderPath(path => [...path, {id: folder.id, name: folder.name}]);
	}

	function goBackOneFolder() {
		setFolderPath(path => path.slice(0, -1));
	}

	function goToCrumb(index: number) {
		setFolderPath(path => path.slice(0, index + 1));
	}

	function goToRoot() {
		setFolderPath([]);
	}

	return (
		<div className="min-h-screen overflow-x-hidden bg-[#f7f5f1] text-stone-950 selection:bg-amber-200/70">
			<Hero onSearch={handleSearch} />

			<main className="relative z-10 mx-auto max-w-[1440px] px-3 pb-20 sm:px-5 md:px-8">
				{loading ?
					<div className="flex flex-col items-center justify-center space-y-6 py-24 md:py-32">
						<div className="relative">
							<div className="h-12 w-12 rounded-full border border-stone-300 md:h-16 md:w-16"></div>
							<div className="absolute inset-0 h-12 w-12 animate-spin rounded-full border border-stone-950 border-t-transparent md:h-16 md:w-16"></div>
						</div>
						<p className="animate-pulse text-sm font-medium text-stone-500 md:text-base">
							Organizing your gallery...
						</p>
					</div>
				:	<AnimatePresence mode="wait">
						<motion.div
							key={currentFolderId ?? "root"}
							initial={{opacity: 0, y: 18}}
							animate={{opacity: 1, y: 0}}
							exit={{opacity: 0, y: -12}}
							transition={{duration: 0.45, ease: [0.22, 1, 0.36, 1]}}
							className="-mt-10 md:-mt-16"
						>
							<section className="sticky top-3 z-30 mb-8 rounded-[1.25rem] border border-white/70 bg-white/80 px-3 py-3 shadow-[0_18px_60px_rgba(28,25,23,0.08)] backdrop-blur-2xl sm:px-5 md:mb-12 md:rounded-[1.75rem] md:py-4">
								<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
									<div className="min-w-0">
										<div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-stone-500">
											<span>{folderPath.length ? "Album Path" : "Faith City Archive"}</span>
										</div>
										<div className="mt-2 flex min-w-0 flex-wrap items-center gap-2">
											<button
												onClick={goToRoot}
												className="text-left text-lg font-semibold tracking-tight text-stone-950 transition-colors hover:text-amber-700 md:text-2xl"
											>
												Gallery
											</button>
											{folderPath.map((crumb, index) => (
												<div key={crumb.id} className="flex min-w-0 items-center gap-2">
													<span className="text-stone-300">/</span>
													<button
														onClick={() => goToCrumb(index)}
														className="max-w-[10rem] truncate text-left text-lg font-semibold tracking-tight text-stone-950 transition-colors hover:text-amber-700 md:max-w-[18rem] md:text-2xl"
													>
														{crumb.name}
													</button>
												</div>
											))}
										</div>
									</div>

									<div className="flex items-center justify-between gap-3 md:justify-end">
										{currentFolderId && (
											<button
												onClick={goBackOneFolder}
												className="group inline-flex h-11 items-center gap-2 rounded-full bg-stone-950 px-4 text-sm font-semibold text-white shadow-lg shadow-stone-950/10 transition-transform duration-300 hover:-translate-y-0.5 md:h-12 md:px-5"
											>
												<svg className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path d="M15 19l-7-7 7-7" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
												</svg>
												Back
											</button>
										)}
										<div className="rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-right">
											<p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-stone-400">
												{currentFolderName}
											</p>
											<p className="text-sm font-bold text-stone-900">{captureCount} captures</p>
										</div>
									</div>
								</div>
							</section>

							{folders.length > 0 && (
								<section className="pt-2">
									<div className="mb-5 flex items-end justify-between px-1 md:mb-7">
										<div>
											<p className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-700">
												{currentFolderId ? "Inside This Album" : "Recent Albums"}
											</p>
											<h2 className="mt-1 text-2xl font-semibold tracking-tight text-stone-950 md:text-4xl">
												Choose a folder
											</h2>
										</div>
										<div className="hidden h-px flex-1 bg-stone-200 md:ml-8 md:block" />
									</div>
									<FolderGrid folders={folders} onSelect={openFolder} />
								</section>
							)}

							<section className={folders.length > 0 ? "mt-4 md:mt-8" : "mt-8 md:mt-12"}>
								{filtered.length > 0 ?
									<MasonryGallery files={filtered} onOpen={setActive} />
								:	!loading && folders.length === 0 && (
										<div className="flex flex-col items-center justify-center py-28 text-center">
											<div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm">
												<svg className="h-10 w-10 text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
												</svg>
											</div>
											<h3 className="mb-1 font-bold text-stone-900">No media found</h3>
											<p className="max-w-xs text-sm text-stone-500">
												We could not find any photos in this album yet.
											</p>
										</div>
									)
								}
							</section>
						</motion.div>
					</AnimatePresence>
				}
			</main>

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
