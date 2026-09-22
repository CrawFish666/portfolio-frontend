import { Route, Routes } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useDelayedUnmount } from "../hooks/useDelayedUnmount";

import { AppLayout } from "../layouts/AppLayout";
import { AuthLayout } from "../layouts/AuthLayout";
import { DashboardLayout } from "../layouts/DashboardLayout";

import { AppSplash } from "../components/AppSplash";

import { HomePage } from "../pages/public/home/HomePage";
import { AboutPage } from "../pages/public/about/AboutPage";
import { ContactPage } from "../pages/public/contact/ContactPage";
import { ExperiencePage } from "../pages/public/experience/ExperiencePage";
import { ProjectsPage } from "../pages/public/projects/ProjectsPage";
import { ProjectDetailPage } from "../pages/public/projects/ProjectDetailPage";

import { SignInPage } from "../pages/auth/SignInPage";
import { SignUpPage } from "../pages/auth/SignUpPage";
import { ForgotPasswordPage } from "../pages/auth/ForgotPasswordPage";
import { ResetPasswordPage } from "../pages/auth/ResetPasswordPage";

import { DashboardHomePage } from "../pages/dashboard/DashboardHomePage";
import {
	ProjectsPage as DashboardProjectsPage,
} from "../pages/dashboard/projects/ProjectsPage";
import {
	SettingsPage as DashboardSettingsPage,
} from "../pages/dashboard/settings/SettingsPage";
import {
	ExperiencePage as DashboardExperiencePage,
} from "../pages/dashboard/experience/ExperiencePage";
import {
	MessagesPage as DashboardMessagesPage,
} from "../pages/dashboard/messages/MessagesPage";
import {
	TechnologiesPage as DashboardTechnologiesPage,
} from "../pages/dashboard/technologies/TechnologiesPage";
import {
	UsersPage as DashboardUsersPage,
} from "../pages/dashboard/users/UsersPage";
import {
	AvailabilityStatusesPage as DashboardAvailabilityStatusesPage,
} from "../pages/dashboard/availability/AvailabilityStatusesPage";

import { NotFoundPage } from "../pages/NotFoundPage";
import { GuestOnlyRoutes } from "./GuestOnlyRoutes";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { AdminOnlyRoutes } from "./AdminOnlyRoutes";
import { ROUTES } from "./pathsConstants";





export function AppRoutes() {
	const { loading } = useAuth();

	const showSplash = useDelayedUnmount(loading, 800) // 300ms = длительность fade-out


	return (
		<>
			{/* Splash Screen показывается только при initAuth(loading).
		В AuthContext возможно заменить с loading на initAuth/initialized/isInitializing  */}
			{showSplash && <AppSplash fadingOut={!loading} />}
			<Routes>
				{/* Публичные роуты */}
				<Route element={<AppLayout />}>
					<Route path={ROUTES.HOME} element={<HomePage />} />
					<Route path={ROUTES.ABOUT} element={<AboutPage />} />
					<Route path={ROUTES.PROJECTS} element={<ProjectsPage />} />
					<Route path={ROUTES.EXPERIENCE} element={<ExperiencePage />} />
					<Route path={ROUTES.CONTACT} element={<ContactPage />} />
					<Route path={ROUTES.PROJECT_DETAIL} element={<ProjectDetailPage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Route>

				{/* Гостевые роуты */}
				<Route element={<AuthLayout />}>
					<Route element={<GuestOnlyRoutes />}>
						<Route path={ROUTES.SIGN_IN} element={<SignInPage />} />
						<Route path={ROUTES.SIGN_UP} element={<SignUpPage />} />
						<Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
						<Route path={ROUTES.RESET_PASSWORD} element={<ResetPasswordPage />} />
					</Route>
				</Route>

				{/* Авторизованные (любая роль) */}
				<Route element={<ProtectedRoutes />}>
					{/* <Route path={ROUTES.PROFILE} element={<ProfilePage />} /> */}


					{/* Только админ роуты */}
					<Route element={<AdminOnlyRoutes />}>
						<Route path={ROUTES.ADMIN} element={<DashboardLayout />}>
							{/* <Route element={<AdminDashBoardLayout />}> */}
							<Route index element={<DashboardHomePage />} />
							<Route path="projects" element={<DashboardProjectsPage />} />
							<Route path="users" element={<DashboardUsersPage />} />
							<Route path="experience" element={<DashboardExperiencePage />} />
							<Route path="settings" element={<DashboardSettingsPage />} />
							<Route path="availability-statuses" element={<DashboardAvailabilityStatusesPage />} />
							<Route path="categories-technologies" element={<DashboardTechnologiesPage />} />
							<Route path="messages" element={<DashboardMessagesPage />} />
						</Route>
					</Route>
				</Route>
			</Routes>
		</>
	)
}
