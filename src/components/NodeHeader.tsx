import { File, Folder } from "lucide-react";
import type { TreeNode } from "src/types";

type Props = {
	node: TreeNode;
};

export const NodeHeader = ({ node }: Props) => {
	const isFolder = node.type === "folder";

	return (
		<div className="p-6 border-b border-gray-100 flex items-start gap-4 bg-gray-50/50">
			<div
				className={`p-3 rounded-xl ${isFolder ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"}`}
			>
				{isFolder ? (
					<Folder className="w-8 h-8" />
				) : (
					<File className="w-8 h-8" />
				)}
			</div>
			<div>
				<h1 className="text-2xl font-bold text-gray-900">{node.name}</h1>
				<p className="text-gray-500 font-medium capitalize mt-1 text-sm flex items-center gap-2">
					{node.type}
				</p>
			</div>
		</div>
	);
};
