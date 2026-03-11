// import {Masonry, CellMeasurer, CellMeasurerCache} from "react-virtualized";
// import {AutoSizer} from "react-virtualized-auto-sizer";
// import {useRef} from "react";
// import type {DriveFile} from "../lib/drive";
// import Tile from "./Tile";

// const cache = new CellMeasurerCache({
// 	defaultHeight: 250,
// 	defaultWidth: 250,
// 	fixedWidth: true,
// });

// export default function VirtualMasonry({
// 	files,
// 	onOpen,
// }: {
// 	files: DriveFile[];
// 	onOpen: (i: number) => void;
// }) {
// 	const parentRef = useRef<any>(null);

// 	function cellRenderer({
// 		index,
// 		key,
// 		parent,
// 		style,
// 	}: {
// 		index: number;
// 		key: string;
// 		parent: any;
// 		style: any;
// 	}) {
// 		const file = files[index];

// 		return (
// 			<CellMeasurer
// 				cache={cache}
// 				parent={parent}
// 				key={key}
// 				columnIndex={0}
// 				rowIndex={index}
// 			>
// 				<div style={style} className="p-2">
// 					<Tile file={file} onClick={() => onOpen(index)} />
// 				</div>
// 			</CellMeasurer>
// 		);
// 	}

// 	return (
// 		<div className="h-[80vh]">
// 			<AutoSizer>
// 				{({width, height}: {width: number; height: number}) => (
// 					<Masonry
// 						ref={parentRef}
// 						cellCount={files.length}
// 						cellMeasurerCache={cache}
// 						cellRenderer={cellRenderer}
// 						width={width}
// 						height={height}
// 						autoHeight={false}
// 					/>
// 				)}
// 			</AutoSizer>
// 		</div>
// 	);
// }
