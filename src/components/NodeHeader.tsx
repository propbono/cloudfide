import { File, Folder } from "lucide-react";
import type { TreeNode } from "src/types";

type Props = {
	node: TreeNode;
	fullPath: string;
};

export const NodeHeader = ({ node, fullPath }: Props) => {
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
			<div className="flex-1 min-w-0">
				<h1
					className="text-2xl font-bold text-gray-900 truncate"
					title={node.name}
				>
					{node.name}
				</h1>
				<div className="flex flex-col gap-1 mt-1">
					<p className="text-gray-500 font-medium capitalize text-sm flex items-center gap-2">
						{node.type}
					</p>
					{!isFolder && (
						<p className="text-sm text-gray-400 break-all">
							Path: <span className="font-mono text-gray-600">{fullPath}</span>
						</p>
					)}
				</div>
			</div>
		</div>
	);
};
