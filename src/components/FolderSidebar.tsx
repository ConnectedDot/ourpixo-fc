// import type {DriveFolder} from "../lib/drive";

// export default function FolderSidebar({
// 	folders,
// 	onOpen,
// 	onBack,
// }: {
// 	folders: DriveFolder[];
// 	onOpen: (f: DriveFolder) => void;
// 	onBack: () => void;
// }) {
// 	return (
// 		<div>
// 			<div className="flex items-center justify-between mb-2">
// 				<h2 className="font-medium">Folders</h2>
// 				<button
// 					onClick={onBack}
// 					className="text-sm text-accent hover:underline"
// 				>
// 					All Albums
// 				</button>
// 			</div>
// 			<ul className="space-y-1">
// 				{folders.length === 0 && (
// 					<li className="text-sm text-gray-500">No subfolders</li>
// 				)}
// 				{folders.map(f => (
// 					<li key={f.id}>
// 						<button
// 							onClick={() => onOpen(f)}
// 							className="w-full text-left px-2 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-2"
// 						>
// 							{f.icon && <img src={f.icon} className="w-4 h-4" alt="" />}
// 							<span className="truncate">{f.name}</span>
// 						</button>
// 					</li>
// 				))}
// 			</ul>
// 		</div>
// 	);
// }

import type {DriveFolder} from "../lib/drive";

export default function FolderSidebar({
	folders,
	onOpen,
	onBack,
}: {
	folders: DriveFolder[];
	onOpen: (f: DriveFolder) => void;
	onBack: () => void;
}) {
	return (
		<div className="bg-white rounded-xl shadow p-4">
			<div className="flex items-center justify-between mb-3">
				<h2 className="font-semibold text-faithBlue">Albums</h2>
				<button
					className="text-sm text-faithBlue hover:underline"
					onClick={onBack}
				>
					All Albums
				</button>
			</div>

			<ul className="space-y-1">
				{folders.length === 0 && (
					<li className="text-gray-400 text-sm">No albums inside</li>
				)}
				{folders.map(f => (
					<li key={f.id}>
						<button
							onClick={() => onOpen(f)}
							className="w-full text-left px-3 py-2 rounded-lg hover:bg-faithBlue/10 transition"
						>
							{f.name}
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
