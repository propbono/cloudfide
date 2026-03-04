import { create } from "zustand";
import type { TreeNode } from "./types";

type FolderTreeState = {
	tree: TreeNode | null;
	setTree: (tree: TreeNode | null) => void;
};

export const useTreeStore = create<FolderTreeState>((set) => ({
	tree: null,
	setTree: (tree) => set({ tree }),
}));
