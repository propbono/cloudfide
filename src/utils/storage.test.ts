import { beforeEach, describe, expect, it, vi } from "vitest";
import type { TreeNode } from "../types";
import {
	loadTreeFromStorage,
	parseStorageEvent,
	saveTreeToStorage,
} from "./storage";

// Mock validation to isolate storage logic
vi.mock("@utils/validation", () => ({
	validateTreeJSON: vi.fn((input: string) => JSON.parse(input)),
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
		localStorage.clear();
	});

	describe("saveTreeToStorage", () => {
		it("should save tree to localStorage when tree is provided", () => {
			saveTreeToStorage(MOCK_TREE);
			expect(localStorage.getItem(STORAGE_KEY)).toBe(JSON.stringify(MOCK_TREE));
		});

		it("should remove tree from localStorage when null is provided", () => {
			localStorage.setItem(STORAGE_KEY, "some data");
			saveTreeToStorage(null);
			expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
		});

		it("should handle localStorage errors gracefully", () => {
			const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
			const setItemSpy = vi
				.spyOn(Storage.prototype, "setItem")
				.mockImplementation(() => {
					throw new Error("QuotaExceeded");
				});

			saveTreeToStorage(MOCK_TREE);

			expect(consoleSpy).toHaveBeenCalledWith(
				"Failed to save tree to localStorage:",
				"QuotaExceeded",
			);
			consoleSpy.mockRestore();
			setItemSpy.mockRestore();
		});
	});

	describe("loadTreeFromStorage", () => {
		it("should return parsed tree when localStorage has valid data", () => {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_TREE));
			const result = loadTreeFromStorage();
			expect(result).toEqual(MOCK_TREE);
		});

		it("should return null when localStorage is empty", () => {
			const result = loadTreeFromStorage();
			expect(result).toBeNull();
		});

		it("should handle localStorage errors gracefully", () => {
			const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
			vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
				throw new Error("AccessDenied");
			});

			const result = loadTreeFromStorage();

			expect(result).toBeNull();
			expect(consoleSpy).toHaveBeenCalledWith(
				"Failed to load tree from localStorage:",
				"AccessDenied",
			);
			consoleSpy.mockRestore();
		});
	});

	describe("parseStorageEvent", () => {
		it("should return undefined if key does not match", () => {
			const event = new StorageEvent("storage", { key: "otherKey" });
			expect(parseStorageEvent(event)).toBeUndefined();
		});

		it("should return parsed tree if newValue is present", () => {
			const event = new StorageEvent("storage", {
				key: STORAGE_KEY,
				newValue: JSON.stringify(MOCK_TREE),
			});
			expect(parseStorageEvent(event)).toEqual(MOCK_TREE);
		});

		it("should return null if newValue is null (cleared)", () => {
			const event = new StorageEvent("storage", {
				key: STORAGE_KEY,
				newValue: null,
			});
			expect(parseStorageEvent(event)).toBeNull();
		});

		it("should handle parsing errors gracefully", () => {
			const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
			const event = new StorageEvent("storage", {
				key: STORAGE_KEY,
				newValue: "invalid-json",
			});

			// Since our mock just does JSON.parse, it will throw
			const result = parseStorageEvent(event);

			expect(result).toBeUndefined();
			expect(consoleSpy).toHaveBeenCalled();
			consoleSpy.mockRestore();
		});
	});
});
