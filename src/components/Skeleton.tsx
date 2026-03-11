// components/Skeleton.tsx
export const GallerySkeleton = () => (
	<div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
		{[...Array(6)].map((_, i) => (
			<div
				key={i}
				className="mb-4 break-inside-avoid bg-gray-200 animate-pulse rounded-xl h-64 w-full"
			/>
		))}
	</div>
);
