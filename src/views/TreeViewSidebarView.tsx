import { Search } from "@components/Search";
import { TreeNodeItem } from "@components/TreeNodeItem";
import { searchTree } from "@utils/searchTree";
import { forwardRef, useCallback, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Virtuoso } from "react-virtuoso";
import { useTreeStore } from "../store";
import type { TreeNode } from "../types";

type FlattenedNode = {
	node: TreeNode;
	path: string;
	depth: number;
	isExpanded: boolean;
};

export function TreeViewSidebarView() {
	const { tree } = useTreeStore();
	const [searchParams] = useSearchParams();
	const query = searchParams.get("q") || "";

	// Keep track of which folders are expanded
	const [expandedIds, setExpandedIds] = useState<Set<string>>(() => {
		return new Set(tree ? [tree.id] : []);
	});

	const toggleExpand = useCallback((id: string) => {
		setExpandedIds((prev) => {
			const next = new Set(prev);
			if (next.has(id)) {
				next.delete(id);
			} else {
				next.add(id);
			}
			return next;
		});
	}, []);

	// Flatten the tree based on expanded state
	const flattenedTree = useMemo(() => {
		if (!tree || query) return [];

		const flat: FlattenedNode[] = [];
		const traverse = (node: TreeNode, currentPath: string, depth: number) => {
			const isExpanded = expandedIds.has(node.id);
			flat.push({
				node,
				path: currentPath,
				depth,
				isExpanded,
			});

			if (node.type === "folder" && isExpanded) {
				for (const child of node.children) {
					traverse(child, `${currentPath}/${child.name}`, depth + 1);
				}
			}
		};

		traverse(tree, tree.name, 0);
		return flat;
	}, [tree, expandedIds, query]);

	const searchResults = useMemo(() => {
		if (!tree || !query) return null;
		return searchTree(tree, query);
	}, [tree, query]);

	if (!tree) return null;

	return (
		<div className="flex flex-col h-full">
			<div className="p-4 border-b border-gray-200 bg-white shrink-0">
				<Search />
			</div>

			<div className="flex-1 overflow-hidden">
				{query ? (
					<div className="p-4 h-full overflow-y-auto">
						<h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
							Search Results
						</h3>
						{searchResults && searchResults.length > 0 ? (
							<ul className="space-y-1">
								{searchResults.map((result) => (
									<TreeNodeItem
										key={result.node.id}
										node={result.node}
										path={result.path}
										isSearchResult={true}
									/>
								))}
							</ul>
						) : (
							<p className="text-sm text-gray-500 italic">No matches found.</p>
						)}
					</div>
				) : (
					<Virtuoso
						style={{ height: "100%", width: "100%" }}
						data={flattenedTree}
						className="p-2"
						components={{
							List: forwardRef<HTMLUListElement, React.HTMLProps<HTMLUListElement>>((props, ref) => (
								// biome-ignore lint/suspicious/noExplicitAny: Virtuoso types force HTMLDivElement props
								<ul {...(props as any)} ref={ref} className="m-0 p-0" />
							)),
						}}
						itemContent={(_, { node, path, depth, isExpanded }) => (
							<div style={{ paddingLeft: `${depth * 16}px` }}>
								<TreeNodeItem
									node={node}
									path={path}
									forceOpen={isExpanded}
									onToggle={() => toggleExpand(node.id)}
								/>
							</div>
						)}
					/>
				)}
			</div>
		</div>
	);
}
