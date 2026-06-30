import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ThemeProvider } from "./context/ThemeContext"
import { AppLayout } from "./layouts/AppLayout"
import { HomePage } from "./pages/HomePage"
import { NotFoundPage } from "./pages/NotFoundPage"
import { AboutPage } from "./pages/AboutPage"
import { ExperiencePage } from "./pages/ExperiencePage"
import { ContactPage } from "./pages/ContactPage"
import { ScrollToTop } from "./components/ScrollToTop"
import { ProjectsPage } from "./pages/ProjectsPage"
import { ProjectDetailPage } from "./pages/ProjectDetailPage"
import { AuthLayout } from "./layouts/AuthLayout"
import { SingInPage } from "./pages/SingInPage"
import { SingUpPage } from "./pages/SingUpPage"
import { ResetPasswordPage } from "./pages/ResetPasswordPage"


function App() {


	return (
		<ThemeProvider>
			<BrowserRouter>
				<ScrollToTop />
				<Routes>
					<Route element={<AppLayout />}>
						<Route path="/" element={<HomePage />} />
						<Route path="/about" element={<AboutPage />} />
						<Route path="/projects" element={<ProjectsPage />} />
						<Route path="/experience" element={<ExperiencePage />} />
						<Route path="/contact" element={<ContactPage />} />
						<Route path="/projects/:slug" element={<ProjectDetailPage />} />

						<Route path="*" element={<NotFoundPage />} />
					</Route>
					<Route>
						<Route element={<AuthLayout />}>
							<Route path="/sing-in" element={<SingInPage />} />
							<Route path="/sing-up" element={<SingUpPage />} />
							<Route path="/reset-password" element={<ResetPasswordPage />} />
						</Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	)
}

export default App
