import { Search as SearchIcon, X } from "lucide-react";
import type { ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";

export const Search = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const query = searchParams.get("q") || "";

	const handleClear = () => {
		setSearchParams((prev) => {
			const next = new URLSearchParams(prev);
			next.delete("q");
			return next;
		});
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (value) {
			setSearchParams((prev) => {
				const next = new URLSearchParams(prev);
				next.set("q", value);
				return next;
			});
		} else {
			handleClear();
		}
	};

	return (
		<div className="relative w-full">
			<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
				<SearchIcon className="h-4 w-4 text-gray-400" />
			</div>
			<input
				type="text"
				placeholder="Search files and folders..."
				className="block w-full pl-9 pr-9 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50 focus:bg-white transition-all shadow-sm"
				value={query}
				onChange={handleChange}
			/>
			{query && (
				<button
					type="button"
					onClick={handleClear}
					className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400 hover:text-gray-600"
				>
					<X className="h-4 w-4" />
				</button>
			)}
		</div>
	);
};
