import { File, Files, Folder, HardDrive } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useTreeStore } from "../store";
import { formatBytes } from "@utils/formatBytes";
import type { TreeNode } from "src/types";
import { NodeBreadcrumbs } from "@components/NodeBreadcrumbs";
import { findNodeByPath } from "@utils/findNodeByPath";
import { calculateTotalSize } from "@utils/calculateTotalSize";

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

	const totalSize = calculateTotalSize(node);

	const pathParts = nodePath.split("/");

	const isFolder = node.type === "folder";

	return (
		<div className="p-8 max-w-4xl mx-auto w-full">
			<NodeBreadcrumbs pathParts={pathParts} />

			<div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
				{/* Node Header */}
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
				{/* Node Statistics */}
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
				{/* Folder Contents */}
				{isFolder && node.children.length > 0 && (
					<div className="border-t border-gray-100">
						<h3 className="px-6 py-4 text-sm font-semibold text-gray-900 bg-gray-50 border-b border-gray-100 uppercase tracking-wider">
							Contents
						</h3>
						<ul className="divide-y divide-gray-100">
							{node.children.map((child: TreeNode) => {
								const childPath = `${nodePath}/${child.name}`;
								const isChildFolder = child.type === "folder";
								return (
									<li
										key={childPath}
										className="hover:bg-gray-50 transition-colors"
									>
										<Link
											to={`/tree/${childPath}`}
											className="flex items-center justify-between px-6 py-4"
										>
											<div className="flex items-center gap-3">
												{isChildFolder ? (
													<Folder className="w-5 h-5 text-blue-500" />
												) : (
													<File className="w-5 h-5 text-gray-400" />
												)}
												<span className="font-medium text-gray-700">
													{child.name}
												</span>
											</div>
											<span className="text-sm text-gray-500">
												{isChildFolder
													? `${child.children.length} items`
													: formatBytes(child.size)}
											</span>
										</Link>
									</li>
								);
							})}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
}
