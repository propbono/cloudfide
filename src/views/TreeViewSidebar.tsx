import { Search } from "@components/Search";
import { TreeNodeItem } from "@components/TreeNodeItem";
import { searchTree } from "@utils/searchTree";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useTreeStore } from "../store";

export function TreeViewSidebar() {
	const { tree } = useTreeStore();
	const [searchParams] = useSearchParams();
	const query = searchParams.get("q") || "";

	const searchResults = useMemo(() => {
		if (!tree || !query) return null;
		return searchTree(tree, query);
	}, [tree, query]);

	if (!tree) return null;

	return (
		<div className="flex flex-col h-full">
			<div className="p-4 border-b border-gray-200 bg-white">
				<Search />
			</div>

			<div className="flex-1 overflow-y-auto p-4">
				{query ? (
					<div>
						<h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
							Search Results
						</h3>
						{searchResults && searchResults.length > 0 ? (
							<ul className="space-y-1">
								{searchResults.map((result) => (
									<TreeNodeItem
										key={result.path}
										node={result.node}
										path={result.path}
										forceOpen={true}
										isSearchResult={true}
									/>
								))}
							</ul>
						) : (
							<p className="text-sm text-gray-500 italic">No matches found.</p>
						)}
					</div>
				) : (
					<ul className="space-y-1">
						<TreeNodeItem node={tree} path={tree.name} />
					</ul>
				)}
			</div>
		</div>
	);
}
