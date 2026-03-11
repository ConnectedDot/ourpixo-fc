// import {useEffect, useMemo, useRef, useState} from "react";
// import {listDrive, type DriveFile, type DriveFolder} from "./lib/drive";
// import GalleryGrid from "./components/GalleryGrid";
// import Lightbox from "./components/Lightbox";
// import FolderSidebar from "./components/FolderSidebar";
// import Breadcrumbs from "./components/Breadcrumbs";

// export default function App() {
// 	const [currentFolder, setCurrentFolder] = useState<string | undefined>(
// 		undefined,
// 	);
// 	const [files, setFiles] = useState<DriveFile[]>([]);
// 	const [folders, setFolders] = useState<DriveFolder[]>([]);
// 	const [stack, setStack] = useState<{id: string; name: string}[]>([]);
// 	const [active, setActive] = useState<number | null>(null);

// 	// loading flags
// 	const [loading, setLoading] = useState(false);
// 	const [loadingMore, setLoadingMore] = useState(false);

// 	// paging
// 	const [nextToken, setNextToken] = useState<string | null>(null);
// 	const pageSize = 48;

// 	// fetch initial page for currentFolder
// 	useEffect(() => {
// 		let mounted = true;
// 		(async () => {
// 			setLoading(true);
// 			try {
// 				const data = await listDrive(currentFolder, undefined, pageSize);
// 				if (!mounted) return;
// 				setFiles(data.files);
// 				setFolders(data.folders);
// 				setNextToken(data.nextPageToken || null);
// 			} finally {
// 				if (mounted) setLoading(false);
// 			}
// 		})();
// 		return () => {
// 			mounted = false;
// 		};
// 	}, [currentFolder]);

// 	// load more
// 	async function loadMore() {
// 		if (!nextToken || loadingMore) return;
// 		setLoadingMore(true);
// 		try {
// 			const data = await listDrive(currentFolder, nextToken, pageSize);
// 			setFiles(prev => [...prev, ...data.files]);
// 			setNextToken(data.nextPageToken || null);
// 		} finally {
// 			setLoadingMore(false);
// 		}
// 	}

// 	// infinite scroll sentinel
// 	const sentinelRef = useRef<HTMLDivElement | null>(null);
// 	useEffect(() => {
// 		if (!sentinelRef.current) return;
// 		const el = sentinelRef.current;
// 		const io = new IntersectionObserver(
// 			entries => {
// 				if (entries.some(e => e.isIntersecting)) {
// 					loadMore();
// 				}
// 			},
// 			{rootMargin: "1200px 0px"},
// 		); // prefetch early
// 		io.observe(el);
// 		return () => io.disconnect();
// 	}, [sentinelRef.current, nextToken, loadingMore]);

// 	function openFolder(folder: DriveFolder) {
// 		setStack(prev => [...prev, {id: folder.id, name: folder.name}]);
// 		setCurrentFolder(folder.id);
// 	}

// 	function goBreadcrumb(index: number) {
// 		const newStack = stack.slice(0, index + 1);
// 		setStack(newStack);
// 		setCurrentFolder(newStack[newStack.length - 1]?.id);
// 	}

// 	const ROOT_HERO_IMAGE = "/FC-BG.jpg";

// 	// pick hero image (first file of current set)
// 	const hero = useMemo(() => files[0], [files]);

// 	return (
// 		<div className="min-h-screen bg-gray-50 text-gray-900">
// 			{/* <div className="relative h-[420px] rounded-2xl overflow-hidden shadow-lg">
// 				{hero ?
// 					<>
// 						<img
// 							src={hero.viewUrl}
// 							className="absolute inset-0 w-full h-full object-cover brightness-75"
// 						/>
// 						<div className="absolute inset-0 bg-gradient-to-t from-[#003A78]/80 to-transparent" />
// 						<div className="absolute bottom-10 left-10 text-white">
// 							<h2 className="text-4xl font-bold mb-3">
// 								Moments of Worship & Fellowship
// 							</h2>
// 							<p className="text-lg opacity-90">
// 								Capturing God’s presence in every gathering.
// 							</p>
// 						</div>
// 					</>
// 				:	<div className="h-full w-full bg-gray-200 animate-pulse" />}
// 			</div> */}

// 			<header className="sticky top-0 z-40 bg-faithBlue text-white shadow-md">
// 				<div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
// 					<h1 className="text-xl font-semibold tracking-wide">
// 						Faith City Media Gallery
// 					</h1>
// 					<a
// 						href="#gallery"
// 						className="px-5 py-2 rounded-xl bg-white/20 hover:bg-white/30 transition"
// 					>
// 						Open Gallery
// 					</a>
// 				</div>
// 			</header>

// 			{/* COVER / HERO */}
// 			{/* <section className="bg-white border-b">
// 				<div className="max-w-6xl mx-auto px-4 py-10 md:py-14 grid md:grid-cols-2 gap-8 items-center">
// 					<div>
// 						<h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
// 							Beautiful, simple photo delivery
// 						</h2>
// 						<p className="text-gray-600 mb-6">
// 							Browse event albums, preview in a smooth lightbox, download and
// 							share — all from one clean interface.
// 						</p>
// 						<a
// 							href="#gallery"
// 							className="inline-flex items-center px-5 py-2.5 rounded-lg bg-accent text-white"
// 						>
// 							View Gallery
// 						</a>
// 					</div>

// 					<div className="aspect-video rounded-xl overflow-hidden bg-gray-100 relative">
// 						{hero ?
// 							<>
// 								<img
// 									src={hero.viewUrl}
// 									alt={hero.name}
// 									className="h-full w-full object-cover"
// 									fetchPriority="high"
// 								/>
// 								<div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
// 							</>
// 						:	<div className="h-full w-full grid place-items-center text-gray-400">
// 								Cover image / hero
// 							</div>
// 						}
// 					</div>
// 				</div>
// 			</section> */}

// 			<section className="bg-white border-b">
// 				<div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-10 items-center">
// 					<div>
// 						<h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-faithBlue">
// 							Capturing Worship, Fellowship & Community
// 						</h2>
// 						<p className="text-gray-600 mb-8 text-lg leading-relaxed">
// 							A visual reflection of God’s presence in our gatherings — worship,
// 							praise, joy, and every unforgettable moment at RCCG Faith City.
// 						</p>
// 						<a
// 							href="#gallery"
// 							className="inline-flex items-center px-6 py-3 rounded-xl bg-faithBlue text-white shadow hover:bg-faithBlue/90 transition"
// 						>
// 							Browse Gallery
// 						</a>
// 					</div>

// 					<div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl">
// 						{hero ?
// 							<>
// 								<img
// 									src={hero.viewUrl}
// 									className="absolute inset-0 w-full h-full object-cover brightness-75"
// 								/>
// 								<div className="absolute inset-0 bg-gradient-to-t from-faithBlue/60 to-transparent" />
// 							</>
// 						:	<>
// 								<img
// 									src={ROOT_HERO_IMAGE}
// 									className="absolute inset-0 w-full h-full object-cover brightness-75"
// 								/>
// 								<div className="absolute inset-0 bg-gradient-to-t from-faithBlue/60 to-transparent" />
// 							</>
// 						}

// 						<div className="absolute bottom-6 left-6 text-white max-w-md">
// 							<h3 className="text-2xl font-semibold">Faith City Moments</h3>
// 							<p className="opacity-90">
// 								“For where two or three gather in my name, there am I with
// 								them.” — Matthew 18:20
// 							</p>
// 						</div>
// 					</div>
// 				</div>
// 			</section>

// 			<main
// 				id="gallery"
// 				className="max-w-6xl mx-auto px-4 py-6 grid md:grid-cols-[240px_1fr] gap-6"
// 			>
// 				<aside className="md:sticky md:top-20 h-fit bg-white border rounded-lg p-3">
// 					<FolderSidebar
// 						folders={folders}
// 						onOpen={openFolder}
// 						onBack={() => {
// 							setStack([]);
// 							setCurrentFolder(undefined);
// 						}}
// 					/>
// 				</aside>

// 				<section>
// 					<Breadcrumbs
// 						stack={stack}
// 						onClick={goBreadcrumb}
// 						rootLabel="All Albums"
// 					/>

// 					{/* Initial skeleton while fetching */}
// 					{loading ?
// 						<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
// 							{Array.from({length: 12}).map((_, i) => (
// 								<div
// 									key={i}
// 									className="aspect-[4/3] rounded-xl skeleton"
// 									// className="aspect-[4/3] rounded-xl bg-gray-200 animate-pulse"
// 								/>
// 							))}
// 						</div>
// 					:	<>
// 							<GalleryGrid files={files} onOpen={i => setActive(i)} />
// 							{!loading && files.length === 0 && (
// 								<div className="mt-4 text-sm text-gray-500">
// 									No images found in this album.
// 								</div>
// 							)}

// 							{/* Load more / sentinel */}
// 							{nextToken && (
// 								<div className="mt-6 flex items-center justify-center">
// 									<button
// 										onClick={loadMore}
// 										disabled={loadingMore}
// 										className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-60"
// 									>
// 										{loadingMore ? "Loading…" : "Load more"}
// 									</button>
// 								</div>
// 							)}
// 							{/* Invisible sentinel for infinite scroll */}
// 							<div ref={sentinelRef} aria-hidden className="h-1" />
// 						</>
// 					}
// 				</section>
// 			</main>

// 			{active !== null && (
// 				<Lightbox
// 					files={files}
// 					index={active}
// 					onClose={() => setActive(null)}
// 					onNavigate={i => setActive(i)}
// 				/>
// 			)}

// 			<button
// 				onClick={() => window.scrollTo({top: 0, behavior: "smooth"})}
// 				className="fixed bottom-6 right-6 bg-faithBlue text-white p-3 rounded-full shadow-lg"
// 			>
// 				↑
// 			</button>

// 			<footer className="mt-20 py-10 text-center text-gray-500 text-sm">
// 				© {new Date().getFullYear()} RCCG Faith City. All Rights Reserved.
// 			</footer>
// 		</div>
// 	);
// }
import {useEffect, useState} from "react";
import Lightbox from "./components/Lightbox";
import MasonryGallery from "./components/MasonryGallery";
import SearchBar from "./components/SearchBar";
import {createSearch} from "./lib/ai-search";
import type {DriveFile} from "./lib/drive";

export default function App() {
	const [files, setFiles] = useState<DriveFile[]>([]);
	const [filtered, setFiltered] = useState<DriveFile[]>([]);
	const [active, setActive] = useState<number | null>(null);

	useEffect(() => {
		fetch("/api/drive")
			.then(r => r.json())
			.then(data => {
				setFiles(data.files);
				setFiltered(data.files);
			});
	}, []);

	const search = createSearch(files);

	function handleSearch(q: string) {
		setFiltered(search(q));
	}

	return (
		<div className="p-6">
			<SearchBar onSearch={handleSearch} />

			<MasonryGallery files={filtered} onOpen={setActive} />

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
