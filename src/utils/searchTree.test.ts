import { describe, expect, it } from "vitest";
import type { TreeNode } from "../types";
import { searchTree } from "./searchTree";

const mockTree: TreeNode = {
	id: "root",
	name: "root",
	type: "folder",
	children: [
		{
			id: "src",
			name: "src",
			type: "folder",
			children: [
				{ id: "index.ts", name: "index.ts", type: "file", size: 1024 },
				{
					id: "components",
					name: "components",
					type: "folder",
					children: [
						{ id: "Button.tsx", name: "Button.tsx", type: "file", size: 512 },
						{ id: "Header.tsx", name: "Header.tsx", type: "file", size: 256 },
					],
				},
			],
		},
		{ id: "package.json", name: "package.json", type: "file", size: 300 },
	],
};

describe("searchTree", () => {
	it("returns empty array for empty query", () => {
		expect(searchTree(mockTree, "").length).toBe(0);
		expect(searchTree(mockTree, "   ").length).toBe(0);
	});

	it("finds files and folders by partial case-insensitive match", () => {
		const results = searchTree(mockTree, "INDEX");
		expect(results.length).toBe(1);
		expect(results[0].node.name).toBe("index.ts");
		expect(results[0].path).toBe("root/src/index.ts");
	});

	it("finds folders as well", () => {
		const results = searchTree(mockTree, "component");
		expect(results.length).toBe(1);
		expect(results[0].node.name).toBe("components");
	});

	it("returns multiple results if matching", () => {
		const results = searchTree(mockTree, "o");
		expect(results.map((r) => r.node.name)).toEqual(
			expect.arrayContaining([
				"root",
				"components",
				"package.json",
				"Button.tsx",
			]),
		);
	});
});
