import { del, get, set } from "idb-keyval";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { TreeNode } from "../types";
import { loadTreeFromStorage, saveTreeToStorage } from "./storage";

vi.mock("idb-keyval", () => ({
	get: vi.fn(),
	set: vi.fn(),
	del: vi.fn(),
}));

const MOCK_TREE: TreeNode = {
	type: "folder",
	name: "root",
	children: [
		{ type: "file", name: "file1.txt", size: 1024 },
		{ type: "folder", name: "src", children: [] },
	],
};

const STORAGE_KEY = "fileTree";

describe("storage utils", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("saveTreeToStorage", () => {
		it("should save tree to IndexedDB when tree is provided", async () => {
			await saveTreeToStorage(MOCK_TREE);
			expect(set).toHaveBeenCalledWith(STORAGE_KEY, MOCK_TREE);
		});

		it("should remove tree from IndexedDB when null is provided", async () => {
			await saveTreeToStorage(null);
			expect(del).toHaveBeenCalledWith(STORAGE_KEY);
		});

		it("should handle IndexedDB errors gracefully", async () => {
			const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
			vi.mocked(set).mockRejectedValueOnce(new Error("QuotaExceeded"));

			await saveTreeToStorage(MOCK_TREE);

			expect(consoleSpy).toHaveBeenCalledWith(
				"Failed to save tree to IndexedDB:",
				"QuotaExceeded",
			);
			consoleSpy.mockRestore();
		});
	});

	describe("loadTreeFromStorage", () => {
		it("should return parsed tree when IndexedDB has valid data", async () => {
			vi.mocked(get).mockResolvedValueOnce(MOCK_TREE);
			const result = await loadTreeFromStorage();
			expect(result).toEqual(MOCK_TREE);
		});

		it("should return null when IndexedDB is empty", async () => {
			vi.mocked(get).mockResolvedValueOnce(undefined);
			const result = await loadTreeFromStorage();
			expect(result).toBeNull();
		});

		it("should handle IndexedDB errors gracefully", async () => {
			const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
			vi.mocked(get).mockRejectedValueOnce(new Error("AccessDenied"));

			const result = await loadTreeFromStorage();

			expect(result).toBeNull();
			expect(consoleSpy).toHaveBeenCalledWith(
				"Failed to load tree from IndexedDB:",
				"AccessDenied",
			);
			consoleSpy.mockRestore();
		});
	});
});
