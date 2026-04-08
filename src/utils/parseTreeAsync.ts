import type { TreeNode } from "../types";

export const parseTreeAsync = (jsonString: string): Promise<TreeNode> => {
	return new Promise((resolve, reject) => {
		const worker = new Worker(
			new URL("../workers/parseTreeWorker.ts", import.meta.url),
			{
				type: "module",
			},
		);

		worker.onmessage = (
			e: MessageEvent<{ success: boolean; tree?: TreeNode; error?: string }>,
		) => {
			if (e.data.success && e.data.tree) {
				resolve(e.data.tree);
			} else {
				reject(new Error(e.data.error || "Failed to parse tree"));
			}
			worker.terminate();
		};

		worker.onerror = (error) => {
			reject(new Error(error.message || "Worker error occurred"));
			worker.terminate();
		};

		worker.postMessage(jsonString);
	});
};
