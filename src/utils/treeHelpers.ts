import type { TreeNode } from "../types";

export const findNodeById = (node: TreeNode, id: string): TreeNode | null => {
	if (node.id === id) return node;
	if (node.type === "folder") {
		for (const child of node.children) {
			const found = findNodeById(child, id);
			if (found) return found;
		}
	}
	return null;
};

/**
 * Returns an array of node names representing the path from root to the target node ID.
 */
export const findPathToNode = (
	root: TreeNode,
	targetId: string,
): string[] | null => {
	if (root.id === targetId) {
		return [root.name];
	}

	if (root.type === "folder") {
		for (const child of root.children) {
			const path = findPathToNode(child, targetId);
			if (path) {
				return [root.name, ...path];
			}
		}
	}

	return null;
};
