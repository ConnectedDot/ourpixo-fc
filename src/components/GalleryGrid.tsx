import {useRef} from "react";
import {useVirtualizer} from "@tanstack/react-virtual";
import type {DriveFile} from "../lib/drive";
import Tile from "./Tile";

export default function GalleryGrid({
	files,
	onOpen,
}: {
	files: DriveFile[];
	onOpen: (index: number) => void;
}) {
	const parentRef = useRef<HTMLDivElement>(null);

	const rowVirtualizer = useVirtualizer({
		count: files.length,
		getScrollElement: () => parentRef.current,
		estimateSize: () => 320,
		overscan: 8,
	});

	return (
		<div ref={parentRef} className="h-[75vh] overflow-auto">
			<div
				style={{
					height: `${rowVirtualizer.getTotalSize()}px`,
					position: "relative",
				}}
			>
				{rowVirtualizer.getVirtualItems().map(virtualRow => {
					const file = files[virtualRow.index];

					return (
						<div
							key={file.id}
							className="absolute left-0 w-full p-2"
							style={{
								transform: `translateY(${virtualRow.start}px)`,
							}}
						>
							<Tile file={file} onClick={() => onOpen(virtualRow.index)} />
						</div>
					);
				})}
			</div>
		</div>
	);
}
