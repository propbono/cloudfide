import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { JsonInput } from "@components/JsonInput";
import { useTreeStore } from "../store";
import { validateTreeJSON } from "@utils/validation";

export function HomeView() {
	const [error, setError] = useState<string | null>(null);
	const { setTree } = useTreeStore();
	const navigate = useNavigate();

	const handleParse = (input: string) => {
		try {
			const parsed = validateTreeJSON(input);
			setTree(parsed);
			navigate("/tree");
		} catch (e) {
			setError(e instanceof Error ? e.message : "Invalid JSON");
		}
	};

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
