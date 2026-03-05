import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { TreeProvider } from "./store.tsx";
import "./index.css";
import App from "./App.tsx";

const rootElement = document.getElementById("root");
if (rootElement) {
	createRoot(rootElement).render(
		<StrictMode>
			<TreeProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</TreeProvider>
		</StrictMode>,
	);
}
