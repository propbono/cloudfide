import { useState, type DragEvent } from "react";

type Props = {
	onSubmit: (jsonString: string) => void;
	error?: string | null;
	onErrorChange?: (error: string | null) => void;
};

export const JsonInput = ({ onSubmit, error, onErrorChange }: Props) => {
	const [input, setInput] = useState("");
	const [isDragging, setIsDragging] = useState(false);

	const handleFile = (file: File) => {
		if (file.type !== "application/json") {
			onErrorChange?.(`File type ${file.type} is not supported.`);
			return;
		}
		const reader = new FileReader();
		reader.onload = (event) => {
			const text = event.target?.result as string;
			setInput(text);
			onErrorChange?.(null);
		};
		reader.onerror = () => {
			onErrorChange?.("Error reading file.");
		};
		reader.readAsText(file);
	};

	const onDragOver = (event: DragEvent) => {
		event.preventDefault();
		setIsDragging(true);
	};

	const onDragLeave = (event: DragEvent) => {
		event.preventDefault();
		setIsDragging(false);
	};

	const onDrop = (event: DragEvent) => {
		event.preventDefault();
		setIsDragging(false);
		const files = event.dataTransfer?.files;
		if (files?.length > 0) {
			handleFile(files[0]);
			event.dataTransfer.clearData();
		}
	};

	return (
		<>
			{/* biome-ignore lint/a11y/noStaticElementInteractions: Drop zone does not require roles */}
			<div
				className={`max-w-xl w-full flex flex-col items-center p-8 rounded-2xl shadow-xl transition-all duration-300 border-2 ${
					isDragging
						? "bg-indigo-50 border-indigo-500 scale-[1.02]"
						: "bg-white border-transparent"
				}`}
				onDragOver={onDragOver}
				onDragLeave={onDragLeave}
				onDrop={onDrop}
			>
				<h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
					FileTree Explorer
				</h1>
				<p className="text-gray-500 mb-6 text-center">
					Paste your JSON representation of a directory structure, or drag and
					drop a file here.
				</p>

				<div className="w-full relative">
					<textarea
						className={`w-full h-64 p-4 font-mono text-sm rounded-xl outline-none transition-all shadow-inner ${
							isDragging
								? "border-2 border-indigo-400 bg-white"
								: "border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 bg-slate-50"
						}`}
						placeholder='{"name": "root", "type": "folder", "children": []}'
						value={input}
						onChange={(e) => {
							setInput(e.target.value);
							onErrorChange?.(null);
						}}
					/>
					{isDragging && (
						<div className="absolute inset-0 flex items-center justify-center bg-indigo-50/80 rounded-xl backdrop-blur-sm pointer-events-none">
							<span className="text-indigo-600 font-semibold text-lg animate-pulse">
								Drop JSON file here
							</span>
						</div>
					)}
				</div>

				{/* File Input */}
				<div className="w-full flex justify-between items-center mt-4 text-sm text-gray-500 font-medium">
					<span>Or browse files:</span>
					<label className="cursor-pointer bg-white px-4 py-2 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-500 transition-colors">
						<span>Upload File</span>
						<input
							type="file"
							accept=".json,application/json"
							className="sr-only"
							onChange={(e) => {
								if (e.target.files && e.target.files.length > 0) {
									handleFile(e.target.files[0]);
								}
							}}
						/>
					</label>
				</div>

				{error && (
					<p className="mt-4 text-red-500 text-sm font-medium w-full text-left bg-red-50 p-3 rounded-lg border border-red-100">
						{error}
					</p>
				)}

				<button
					type="button"
					onClick={() => onSubmit(input)}
					className="mt-6 w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				>
					Explore Tree
				</button>
			</div>
		</>
	);
};
