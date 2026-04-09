import { describe, expect, it } from "vitest";
import type { TreeNode } from "../types";
import { calculateTotalSize } from "./calculateTotalSize";

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
					],
				},
			],
		},
		{ id: "package.json", name: "package.json", type: "file", size: 300 },
	],
};

describe("calculateTotalSize", () => {
	it("calculates file size correctly for flat nodes", () => {
		const file: TreeNode = {
			id: "test.txt",
			name: "test.txt",
			type: "file",
			size: 100,
		};
		expect(calculateTotalSize(file)).toBe(100);
	});

	it("calculates folder size corectly in deeper nested folders", () => {
		expect(calculateTotalSize(mockTree)).toBe(1836); // 1024 + 512 + 300
	});
});
