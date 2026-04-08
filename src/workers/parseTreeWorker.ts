import { treeNodeSchema } from "../types";

self.onmessage = (e: MessageEvent<string>) => {
	try {
		const parsed = JSON.parse(e.data);
		const validated = treeNodeSchema.parse(parsed);

		self.postMessage({ success: true, tree: validated });
	} catch (error) {
		self.postMessage({
			success: false,
			error: error instanceof Error ? error.message : "Invalid JSON format",
		});
	}
};
