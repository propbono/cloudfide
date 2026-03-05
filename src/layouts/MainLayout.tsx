import { TreeViewSidebarView } from "@views/TreeViewSidebarView";
import { FileCode2, RotateCcw } from "lucide-react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useTreeStore } from "../store";

export const MainLayout = () => {
	const { tree } = useTreeStore();

	if (!tree) {
		return <Navigate to="/" replace />;
	}

	return (
		<div className="flex flex-col h-full w-full bg-white">
			<header className="flex-none h-14 border-b border-gray-200 bg-white flex items-center justify-between px-4 shrink-0 shadow-sm z-10">
				<Link
					to="/"
					className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition-colors"
				>
					<FileCode2 className="w-6 h-6" />
					<span className="font-bold text-lg tracking-tight">
						FileTree Explorer
					</span>
				</Link>
				<Link
					to="/"
					className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-50"
				>
					<RotateCcw className="w-4 h-4" />
					Load new tree
				</Link>
			</header>

			<div className="flex flex-1 overflow-hidden">
				<aside className="w-80 border-r border-gray-200 bg-gray-50 flex flex-col shrink-0">
					<TreeViewSidebarView />
				</aside>

				<main className="flex-1 overflow-y-auto bg-white">
					<Outlet />
				</main>
			</div>
		</div>
	);
};
