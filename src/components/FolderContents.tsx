import { formatBytes } from "@utils/formatBytes";
import { File, Folder } from "lucide-react";
import { Link } from "react-router-dom";
import type { TreeNode } from "src/types";

type Props = {
	childrenNodes: TreeNode[];
	parentPath: string;
};

export const FolderContents = ({ childrenNodes, parentPath }: Props) => {
	if (childrenNodes.length === 0) return null;

	return (
		<div className="border-t border-gray-100">
			<h3 className="px-6 py-4 text-sm font-semibold text-gray-900 bg-gray-50 border-b border-gray-100 uppercase tracking-wider">
				Contents
			</h3>
			<ul className="divide-y divide-gray-100">
				{childrenNodes.map((child: TreeNode) => {
					const childPath = `${parentPath}/${child.name}`;
					const isChildFolder = child.type === "folder";
					return (
						<li key={childPath} className="hover:bg-gray-50 transition-colors">
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
	);
};
