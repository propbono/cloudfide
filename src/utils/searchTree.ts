import type { TreeNode } from "../types";

/**
 * Recursively searches a tree for nodes whose name matches the query.
 * @param node - The root node to start searching from.
 * @param query - The string to search for within node names.
 * @param currentPath - The accumulated path prefix used internally for recursion (default: "").
 * @returns An array containing objects with the matched node and its full path.
 */
export function searchTree(
	node: TreeNode,
	query: string,
	currentPath = "",
): Array<{ node: TreeNode; path: string }> {
	if (!query.trim()) return [];
	const results: Array<{ node: TreeNode; path: string }> = [];
	const nodePath = currentPath ? `${currentPath}/${node.name}` : node.name;

	if (node.name.toLowerCase().includes(query.toLowerCase())) {
		results.push({ node, path: nodePath });
	}

	if (node.type === "folder") {
		for (const child of node.children) {
			results.push(...searchTree(child, query, nodePath));
		}
	}

	return results;
}
