import { describe, expect, it } from "vitest";
import { validateTreeJSON } from "./validation";

describe("validateTreeJSON", () => {
	it("parses valid JSON tree successfully", () => {
		const validJson = JSON.stringify({
			name: "root",
			type: "folder",
			children: [],
		});
		const result = validateTreeJSON(validJson);
		expect(result.name).toBe("root");
		expect(result.type).toBe("folder");
	});
	it("throws an error for non-JSON strings", () => {
		expect(() => validateTreeJSON("hello world")).toThrow();
	});

	it("throws an error for arrays", () => {
		const arrayJson = JSON.stringify([{ name: "root", type: "folder" }]);
		expect(() => validateTreeJSON(arrayJson)).toThrow("Invalid tree format");
	});

	it("throws an error for null", () => {
		expect(() => validateTreeJSON("null")).toThrow("Invalid tree format");
	});

	it("throws an error if name is missing", () => {
		const invalidJson = JSON.stringify({ type: "folder" });
		expect(() => validateTreeJSON(invalidJson)).toThrow("Invalid tree format");
	});

	it("throws an error if type is missing", () => {
		const invalidJson = JSON.stringify({ name: "root" });
		expect(() => validateTreeJSON(invalidJson)).toThrow("Invalid tree format");
	});
});
