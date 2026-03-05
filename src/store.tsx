import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import type { TreeNode } from "./types";
import {
	loadTreeFromStorage,
	parseStorageEvent,
	saveTreeToStorage,
} from "./utils/storage";

type TreeContextType = {
	tree: TreeNode | null;
	setTree: (tree: TreeNode | null) => void;
};

const TreeContext = createContext<TreeContextType | undefined>(undefined);

export const TreeProvider = ({ children }: { children: ReactNode }) => {
	const [tree, setTreeState] = useState<TreeNode | null>(() =>
		loadTreeFromStorage(),
	);

	const setTree = (newTree: TreeNode | null) => {
		setTreeState(newTree);
		saveTreeToStorage(newTree);
	};

	useEffect(() => {
		const handleStorageChange = (e: StorageEvent) => {
			const newTree = parseStorageEvent(e);
			if (newTree !== undefined) {
				setTreeState(newTree);
			}
		};

		if (typeof window !== "undefined") {
			window.addEventListener("storage", handleStorageChange);
			return () => window.removeEventListener("storage", handleStorageChange);
		}
	}, []);

	return (
		<TreeContext.Provider value={{ tree, setTree }}>
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
