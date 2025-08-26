import "./App.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/ui/Navbar";
import HomePage from "./components/pages/HomePage";
import CreatePage from "./components/pages/CreatePage";
import { Toaster } from "@/components/ui/sonner";

function App() {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<Toaster richColors />
			<div>
				<Navbar />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/create" element={<CreatePage />} />
				</Routes>
			</div>
		</ThemeProvider>
	);
}

export default App;
