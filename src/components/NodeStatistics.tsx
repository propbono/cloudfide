import { calculateTotalSize } from "@utils/calculateTotalSize";
import { formatBytes } from "@utils/formatBytes";
import { Files } from "lucide-react";
import { useMemo } from "react";
import type { TreeNode } from "src/types";

type Props = {
	node: TreeNode;
};

export const NodeStatistics = ({ node }: Props) => {
	const isFolder = node.type === "folder";
	const totalSize = useMemo(() => calculateTotalSize(node), [node]);

	return (
		<div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white">
			<div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
				<p className="text-sm text-gray-500 font-medium mb-1">Total Size</p>
				<p className="text-2xl font-semibold text-gray-900">
					{formatBytes(totalSize)}
				</p>
			</div>

			{isFolder && (
				<div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
					<p className="text-sm text-gray-500 font-medium mb-1">
						Direct Children
					</p>
					<div className="flex items-center gap-2 text-2xl font-semibold text-gray-900">
						<span>{node.children.length}</span>
						<Files className="w-5 h-5 text-gray-400" />
					</div>
				</div>
			)}
		</div>
	);
};
