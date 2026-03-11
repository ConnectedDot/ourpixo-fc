import {useState} from "react";

export default function SearchBar({onSearch}: {onSearch: (q: string) => void}) {
	const [q, setQ] = useState("");

	function handle(e: any) {
		const value = e.target.value;
		setQ(value);
		onSearch(value);
	}

	return (
		<div className="w-full max-w-xl mx-auto mb-6">
			<input
				value={q}
				onChange={handle}
				placeholder="Search photos..."
				className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring"
			/>
		</div>
	);
}
