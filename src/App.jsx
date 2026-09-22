import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from "./context/ThemeContext"
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { QueryProvider } from "./providers/QueryProvider";
import { AuthProvider } from "./context/AuthProvider";
import { AppRoutes } from "./routes";
import { Toaster } from "sonner";

function App() {
	return (
		<QueryProvider>
			<AuthProvider>
				<ThemeProvider>
					<BrowserRouter>
						<Toaster expand richColors position="top-center" />
						<ScrollToTop />
						<AppRoutes />
					</BrowserRouter>
				</ThemeProvider>
			</AuthProvider>
		</QueryProvider>
	);
}

export default App
