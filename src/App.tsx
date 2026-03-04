import { MainLayout } from "@layouts/MainLayout";
import { HomeView } from "@views/HomeView";
import { Route, Routes } from "react-router-dom";

function App() {
	return (
		<Routes>
			<Route path="/" element={<HomeView />} />
			<Route path="/tree" element={<MainLayout />} />
		</Routes>
	);
}

export default App;
