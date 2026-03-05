import { describe, expect, it } from "vitest";
import type { TreeNode } from "../types";
import { findNodeByPath } from "./findNodeByPath";

const mockTree: TreeNode = {
	name: "root",
	type: "folder",
	children: [
		{
			name: "src",
			type: "folder",
			children: [
				{ name: "index.ts", type: "file", size: 1024 },
				{
					name: "components",
					type: "folder",
					children: [{ name: "Button.tsx", type: "file", size: 512 }],
				},
			],
		},
		{ name: "package.json", type: "file", size: 300 },
	],
};

describe("findNodeByPath", () => {
	it("finds root node", () => {
		expect(findNodeByPath(mockTree, "root")?.name).toBe("root");
	});

	it("finds nested file", () => {
		const node = findNodeByPath(mockTree, "root/src/index.ts");
		expect(node?.name).toBe("index.ts");
		expect(node?.type).toBe("file");
	});

	it("finds nested folder", () => {
		const node = findNodeByPath(mockTree, "root/src/components");
		expect(node?.name).toBe("components");
		expect(node?.type).toBe("folder");
	});

	it("returns null for non-existent path", () => {
		expect(findNodeByPath(mockTree, "root/src/nonexistent")).toBeNull();
	});

	it("returns null if root does not match", () => {
		expect(findNodeByPath(mockTree, "other/src")).toBeNull();
	});
});
