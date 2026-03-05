import type { TreeNode } from "../types";

/**
 * Finds a specific node in the tree based on its path.
 * @param root - The root node of the tree.
 * @param path - The full path of the target node (e.g., "root/folder/file").
 * @returns The matching TreeNode if found, or null otherwise.
 */
export function findNodeByPath(root: TreeNode, path: string): TreeNode | null {
	if (!path) return null;
	const parts = path.split("/").filter(Boolean);

	let current: TreeNode | undefined = root;
	if (current.name !== parts[0]) return null;

	for (const part of parts.slice(1)) {
		if (current?.type !== "folder") return null;
		current = current.children.find((child) => child.name === part);
	}

	return current || null;
}
