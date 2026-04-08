import { MainLayout } from "@layouts/MainLayout";
import { HomeView } from "@views/HomeView";
import { NodeDetailsView } from "@views/NodeDetailsView";
import { Route, Routes } from "react-router-dom";

function App() {
	return (
		<Routes>
			<Route path="/" element={<HomeView />} />
			<Route path="/tree" element={<MainLayout />}>
				<Route path=":nodeId" element={<NodeDetailsView />} />
				<Route index element={<NodeDetailsView />} />
			</Route>
		</Routes>
	);
}

export default App;
