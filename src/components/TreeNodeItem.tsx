import { ChevronDown, ChevronRight, File, Folder } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import type { TreeNode } from "../types";

type Props = {
	node: TreeNode;
	path: string;
	forceOpen?: boolean;
	isSearchResult?: boolean;
	onToggle?: () => void;
};

export const TreeNodeItem = ({
	node,
	path,
	forceOpen = false,
	isSearchResult = false,
	onToggle,
}: Props) => {
	const location = useLocation();
	const currentUrlPath = `/tree/${node.id}`;

	// Decoding uri components so paths match even with spaces
	const decodedPathname = decodeURIComponent(location.pathname);
	const isActive =
		decodedPathname === currentUrlPath ||
		decodedPathname === `${currentUrlPath}/`;

	const isFolder = node.type === "folder";

	const handleToggle = (e: React.MouseEvent) => {
		e.preventDefault();
		if (isFolder) {
			onToggle?.();
		}
	};

	return (
		<div className="list-none">
			<div
				className={`flex items-center group py-1 px-2 rounded-md transition-colors ${isActive ? "bg-indigo-50" : "hover:bg-gray-100"}`}
			>
				<div className="flex items-center gap-1.5 flex-1 min-w-0">
					{isFolder ? (
						<button
							type="button"
							onClick={handleToggle}
							className="p-0.5 hover:bg-gray-200 rounded text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300"
							aria-label={forceOpen ? "Collapse folder" : "Expand folder"}
							aria-hidden="true"
							tabIndex={-1}
						>
							{forceOpen ? (
								<ChevronDown className="w-4 h-4" />
							) : (
								<ChevronRight className="w-4 h-4" />
							)}
						</button>
					) : (
						<span className="w-5" />
					)}

					<Link
						to={`${currentUrlPath}${location.search}`}
						className="flex items-center gap-2 flex-1 min-w-0 overflow-hidden text-sm"
						tabIndex={0}
					>
						{isFolder ? (
							<Folder className="w-4 h-4 shrink-0 text-gray-400" />
						) : (
							<File className="w-4 h-4 shrink-0 text-gray-400" />
						)}
						<span
							className={`truncate font-medium ${isActive ? "text-indigo-700" : "text-gray-700"}`}
						>
							{node.name}
						</span>
						{isSearchResult && (
							<span className="truncate text-xs text-gray-400 ml-2">
								{path}
							</span>
						)}
					</Link>
				</div>
			</div>
		</div>
	);
};
