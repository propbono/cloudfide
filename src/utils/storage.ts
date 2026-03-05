import { validateTreeJSON } from "@utils/validation";
import type { TreeNode } from "../types";

const STORAGE_KEY = "fileTree";

export const loadTreeFromStorage = (): TreeNode | null => {
	try {
		const saved = localStorage.getItem(STORAGE_KEY);
		return saved ? validateTreeJSON(saved) : null;
	} catch (e) {
		console.warn(
			"Failed to load tree from localStorage:",
			e instanceof Error ? e.message : "Unknown error",
		);
		return null;
	}
};

export const saveTreeToStorage = (tree: TreeNode | null): void => {
	try {
		if (tree) {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(tree));
		} else {
			localStorage.removeItem(STORAGE_KEY);
		}
	} catch (e) {
		console.warn(
			"Failed to save tree to localStorage:",
			e instanceof Error ? e.message : "Unknown error",
		);
	}
};

export const parseStorageEvent = (
	e: StorageEvent,
): TreeNode | null | undefined => {
	if (e.key !== STORAGE_KEY) return undefined;
	try {
		if (e.newValue) {
			return validateTreeJSON(e.newValue);
		}
		return null;
	} catch (err) {
		console.warn(
			"Failed to parse storage update:",
			err instanceof Error ? err.message : "Unknown error",
		);
		return undefined;
	}
};
