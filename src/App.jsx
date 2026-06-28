import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ThemeProvider } from "./context/ThemeContext"
import { AppLayout } from "./layouts/AppLayout"
import { HomePage } from "./pages/HomePage"
import { NotFoundPage } from "./pages/NotFoundPage"
import { AboutPage } from "./pages/AboutPage"
import { ExperiencePage } from "./pages/ExperiencePage"
import { ContactPage } from "./pages/ContactPage"
import { ScrollToTop } from "./components/ScrollToTop"


function App() {


	return (
		<ThemeProvider>
			<BrowserRouter>
				<ScrollToTop />
				<Routes>
					<Route element={<AppLayout />}>
						<Route path="/" element={<HomePage />} />
						<Route path="/about" element={<AboutPage />} />
						<Route path="/experience" element={<ExperiencePage />} />
						<Route path="/contact" element={<ContactPage />} />
						<Route path="*" element={<NotFoundPage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	)
}

export default App
