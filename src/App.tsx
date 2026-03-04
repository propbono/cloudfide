import { Route, Routes } from "react-router-dom";
import { HomeView } from "@views/HomeView";
import { TreeViewSidebar } from "@views/TreeViewSidebar";

function App() {
	return (
		<Routes>
			<Route path="/" element={<HomeView />} />
			<Route path="/tree" element={<TreeViewSidebar />} />
		</Routes>
	);
}

export default App;
