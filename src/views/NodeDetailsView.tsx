import { FolderContents } from "@components/FolderContents";
import { NodeBreadcrumbs } from "@components/NodeBreadcrumbs";
import { NodeHeader } from "@components/NodeHeader";
import { NodeStatistics } from "@components/NodeStatistics";
import { findNodeByPath } from "@utils/findNodeByPath";
import { HardDrive } from "lucide-react";
import { useParams } from "react-router-dom";
import { useTreeStore } from "../store";

export function NodeDetailsView() {
	const params = useParams();
	const { tree } = useTreeStore();
	const nodePath = params["*"] || "";

	if (!nodePath) {
		return (
			<div className="flex h-full items-center justify-center text-gray-400 flex-col gap-4">
				<HardDrive className="w-16 h-16 text-gray-200" />
				<p className="text-lg">Select a file or folder to view its details</p>
			</div>
		);
	}

	if (!tree) return null;

	const node = findNodeByPath(tree, nodePath);

	if (!node) {
		return (
			<div className="flex h-full items-center justify-center text-red-400 flex-col gap-4">
				<p className="text-lg font-medium">Node not found</p>
				<p className="text-sm text-gray-500">{nodePath}</p>
			</div>
		);
	}

	const pathParts = nodePath.split("/");
	const isFolder = node.type === "folder";

	return (
		<div className="p-8 max-w-4xl mx-auto w-full">
			<NodeBreadcrumbs pathParts={pathParts} />

			<div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
				<NodeHeader node={node} />
				<NodeStatistics node={node} />
				{isFolder && (
					<FolderContents childrenNodes={node.children} parentPath={nodePath} />
				)}
			</div>
		</div>
	);
}
