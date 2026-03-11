import Masonry from "react-responsive-masonry";
import ResponsiveMasonry from "react-responsive-masonry";
import type {DriveFile} from "../lib/drive";
import GalleryImage from "./GalleryImage";

export default function MasonryGallery({
	files,
	onOpen,
}: {
	files: DriveFile[];
	onOpen: (i: number) => void;
}) {
	return (
		<ResponsiveMasonry
			columnsCountBreakPoints={{
				350: 1,
				640: 2,
				900: 3,
				1200: 4,
				1600: 5,
			}}
		>
			<Masonry gutter="16px">
				{files.map((file, index) => (
					<GalleryImage
						key={file.id}
						file={file}
						onClick={() => onOpen(index)}
					/>
				))}
			</Masonry>
		</ResponsiveMasonry>
	);
}
