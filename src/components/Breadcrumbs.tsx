// export default function Breadcrumbs({
//   stack, onClick, rootLabel
// }: { stack: { id: string; name: string }[]; onClick: (idx: number) => void }) {
//   if (stack.length === 0) return (
//     <div className="mb-4 text-sm text-gray-500">Root</div>
//   )

//   return (
//     <div className="mb-4 text-sm text-gray-600">
//       <span className="text-gray-400">Root</span>
//       {" / "}
//       {stack.map((s, i) => (
//         <span key={s.id}>
//           <button onClick={() => onClick(i)} className="hover:underline">{s.name}</button>
//           {i < stack.length - 1 && " / "}
//         </span>
//       ))}
//     </div>
//   )
// }

export default function Breadcrumbs({
	stack,
	onClick,
	rootLabel = "All Albums",
}: {
	stack: {id: string; name: string}[];
	onClick: (idx: number) => void;
	rootLabel?: string;
}) {
	if (stack.length === 0)
		return <div className="mb-4 text-sm text-gray-500">{rootLabel}</div>;

	return (
		<div className="mb-4 text-sm text-gray-600">
			<span className="text-gray-400">{rootLabel}</span>
			{" / "}
			{stack.map((s, i) => (
				<span key={s.id}>
					<button onClick={() => onClick(i)} className="hover:underline">
						{s.name}
					</button>
					{i < stack.length - 1 && " / "}
				</span>
			))}
		</div>
	);
}
