import type { TreeNode } from "../types";

/**
 * Calculates the total size of a node and all its children iteratively (safer than recursive).
 * @param node - The root node to calculate the size for.
 * @returns The total size of all files within the node in bytes.
 */
export const calculateTotalSize = (node: TreeNode) => {
	let totalSize = 0;
	const stack: TreeNode[] = [node];

	while (stack.length > 0) {
		const current = stack.pop();
		if (!current) continue;

		if (current.type === "file") {
			totalSize += current.size;
		}

		if (current.type === "folder") {
			stack.push(...current.children);
		}
	}

	return totalSize;
};
