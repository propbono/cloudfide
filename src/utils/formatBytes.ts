const BYTES_PER_KILOBYTE = 1024;
const SIZE_LABELS = ["B", "KB", "MB", "GB", "TB"] as const;

/**
 * Formats a byte size into a human-readable string with appropriate units.
 * @param bytes - The size in bytes to format.
 * @param decimals - The number of decimal places to include (default: 2).
 * @returns A formatted string with the appropriate size label (e.g., "1.5 MB").
 */
export const formatBytes = (bytes: number, decimals = 2) => {
	if (!+bytes) return "0 B";

	const fixedDecimals = decimals < 0 ? 0 : decimals;
	const sizeIndex = Math.floor(Math.log(bytes) / Math.log(BYTES_PER_KILOBYTE));
	const size = bytes / BYTES_PER_KILOBYTE ** sizeIndex;

	return `${parseFloat(size.toFixed(fixedDecimals))} ${SIZE_LABELS[sizeIndex]}`;
};
