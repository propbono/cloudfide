import { del, get, set } from "idb-keyval";
import type { TreeNode } from "../types";

const STORAGE_KEY = "fileTree";

export const loadTreeFromStorage = async (): Promise<TreeNode | null> => {
	try {
		const saved = await get<TreeNode>(STORAGE_KEY);
		return saved || null;
	} catch (e) {
		console.warn(
			"Failed to load tree from IndexedDB:",
			e instanceof Error ? e.message : "Unknown error",
		);
		return null;
	}
};

export const saveTreeToStorage = async (
	tree: TreeNode | null,
): Promise<void> => {
	try {
		if (tree) {
			await set(STORAGE_KEY, tree);
		} else {
			await del(STORAGE_KEY);
		}
	} catch (e) {
		console.warn(
			"Failed to save tree to IndexedDB:",
			e instanceof Error ? e.message : "Unknown error",
		);
	}
};
