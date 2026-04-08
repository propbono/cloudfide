import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import type { TreeNode } from "./types";
import { loadTreeFromStorage, saveTreeToStorage } from "./utils/storage";

type TreeContextType = {
	tree: TreeNode | null;
	setTree: (tree: TreeNode | null) => void;
	isInitializing: boolean;
};

const TreeContext = createContext<TreeContextType | undefined>(undefined);

export const TreeProvider = ({ children }: { children: ReactNode }) => {
	const [tree, setTreeState] = useState<TreeNode | null>(null);
	const [isInitializing, setIsInitializing] = useState(true);

	useEffect(() => {
		loadTreeFromStorage().then((savedTree) => {
			setTreeState(savedTree);
			setIsInitializing(false);
		});
	}, []);

	const setTree = (newTree: TreeNode | null) => {
		setTreeState(newTree);
		saveTreeToStorage(newTree);
	};

	return (
		<TreeContext.Provider value={{ tree, setTree, isInitializing }}>
			{children}
		</TreeContext.Provider>
	);
};

export const useTreeStore = () => {
	const context = useContext(TreeContext);
	if (context === undefined) {
		throw new Error("useTreeStore must be used within a TreeProvider");
	}
	return context;
};
