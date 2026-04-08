import { JsonInput } from "@components/JsonInput";
import { validateTreeJSON } from "@utils/validation";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTreeStore } from "../store";

export function HomeView() {
	const [error, setError] = useState<string | null>(null);
	const { tree, setTree, isInitializing } = useTreeStore();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isInitializing && tree) {
			navigate("/tree");
		}
	}, [isInitializing, tree, navigate]);

	const handleParse = async (input: string) => {
		try {
			const parsed = validateTreeJSON(input);
			setTree(parsed);
			navigate("/tree");
		} catch (e) {
			setError(e instanceof Error ? e.message : "Invalid JSON format");
		}
	};

	if (isInitializing || tree) {
		return (
			<div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-50 to-white">
				<div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
			</div>
		);
	}

	return (
		<div className="flex h-full w-full items-center justify-center p-6 bg-gradient-to-br from-indigo-50 to-white">
			<JsonInput
				onSubmit={handleParse}
				error={error}
				onErrorChange={setError}
			/>
		</div>
	);
}
