import { describe, expect, it } from "vitest";
import type { TreeNode } from "../types";
import { findNodeById, findPathToNode } from "./treeHelpers";

const MOCK_TREE: TreeNode = {
	id: "1",
	name: "root",
	type: "folder",
	children: [
		{
			id: "2",
			name: "src",
			type: "folder",
			children: [
				{
					id: "3",
					name: "index.ts",
					type: "file",
					size: 100,
				},
			],
		},
		{
			id: "4",
			name: "package.json",
			type: "file",
			size: 200,
		},
	],
};

describe("treeHelpers", () => {
	describe("findNodeById", () => {
		it("should find the root node", () => {
			const result = findNodeById(MOCK_TREE, "1");
			expect(result?.name).toBe("root");
		});

		it("should find a nested folder", () => {
			const result = findNodeById(MOCK_TREE, "2");
			expect(result?.name).toBe("src");
		});

		it("should find a nested file", () => {
			const result = findNodeById(MOCK_TREE, "3");
			expect(result?.name).toBe("index.ts");
		});

		it("should return null for non-existent id", () => {
			const result = findNodeById(MOCK_TREE, "999");
			expect(result).toBeNull();
		});
	});

	describe("findPathToNode", () => {
		it("should return path to root", () => {
			const result = findPathToNode(MOCK_TREE, "1");
			expect(result).toEqual(["root"]);
		});

		it("should return path to nested folder", () => {
			const result = findPathToNode(MOCK_TREE, "2");
			expect(result).toEqual(["root", "src"]);
		});

		it("should return path to nested file", () => {
			const result = findPathToNode(MOCK_TREE, "3");
			expect(result).toEqual(["root", "src", "index.ts"]);
		});

		it("should return null for non-existent id", () => {
			const result = findPathToNode(MOCK_TREE, "999");
			expect(result).toBeNull();
		});
	});
});
