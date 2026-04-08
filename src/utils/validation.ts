import { type TreeNode, treeNodeSchema } from "../types";

/**
 * Validates and parses a JSON string representing a file tree.
 * @param input - The JSON representation of the tree to validate.
 * @returns The parsed TreeNode object if valid.
 * @throws Will throw an Error if the input does not conform to the expected TreeNode format.
 */
export const validateTreeJSON = (input: string): TreeNode => {
	const parsed = JSON.parse(input);
	return treeNodeSchema.parse(parsed);
};
