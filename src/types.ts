import { z } from "zod";

export type FileNode = {
	id: string;
	name: string;
	type: "file";
	size: number;
};

export type FolderNode = {
	id: string;
	name: string;
	type: "folder";
	children: TreeNode[];
};

export type TreeNode = FileNode | FolderNode;

const baseNodeSchema = z.object({
	id: z.string().default(() => crypto.randomUUID()),
	name: z.string().min(1, "Name cannot be empty"),
});

export const fileNodeSchema = baseNodeSchema.extend({
	type: z.literal("file"),
	size: z.number().nonnegative("Size must be non-negative"),
});

export const treeNodeSchema: z.ZodType<TreeNode> = z.lazy(() =>
	z.discriminatedUnion("type", [
		fileNodeSchema,
		baseNodeSchema.extend({
			type: z.literal("folder"),
			children: z.array(treeNodeSchema),
		}),
	]),
);
