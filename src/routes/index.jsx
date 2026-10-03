import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useAuth } from "../hooks/useAuth";
import { useDelayedUnmount } from "../hooks/useDelayedUnmount";

import { AppLayout } from "../layouts/AppLayout";
import { AuthLayout } from "../layouts/AuthLayout";
import { DashboardLayout } from "../layouts/DashboardLayout";

import { AppSplash } from "../components/AppSplash";
import { PageLoader } from "../components/PageLoader";

import { NotFoundPage } from "../pages/NotFoundPage";
import { GuestOnlyRoutes } from "./GuestOnlyRoutes";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { AdminOnlyRoutes } from "./AdminOnlyRoutes";
import { ROUTES } from "./pathsConstants";

const HomePage = lazy(() =>
	import("../pages/public/home/HomePage").then((module) => ({
		default: module.HomePage,
	}))
);

const AboutPage = lazy(() =>
	import("../pages/public/about/AboutPage").then((module) => ({
		default: module.AboutPage,
	}))
);

const ContactPage = lazy(() =>
	import("../pages/public/contact/ContactPage").then((module) => ({
		default: module.ContactPage,
	}))
);

const ExperiencePage = lazy(() =>
	import("../pages/public/experience/ExperiencePage").then((module) => ({
		default: module.ExperiencePage,
	}))
);

const ProjectsPage = lazy(() =>
	import("../pages/public/projects/ProjectsPage").then((module) => ({
		default: module.ProjectsPage,
	}))
);

const ProjectDetailPage = lazy(() =>
	import("../pages/public/projects/ProjectDetailPage").then((module) => ({
		default: module.ProjectDetailPage,
	}))
);

const SignInPage = lazy(() =>
	import("../pages/auth/SignInPage").then((module) => ({
		default: module.SignInPage,
	}))
);

const SignUpPage = lazy(() =>
	import("../pages/auth/SignUpPage").then((module) => ({
		default: module.SignUpPage,
	}))
);

const ForgotPasswordPage = lazy(() =>
	import("../pages/auth/ForgotPasswordPage").then((module) => ({
		default: module.ForgotPasswordPage,
	}))
);

const ResetPasswordPage = lazy(() =>
	import("../pages/auth/ResetPasswordPage").then((module) => ({
		default: module.ResetPasswordPage,
	}))
);

const DashboardHomePage = lazy(() =>
	import("../pages/dashboard/DashboardHomePage").then((module) => ({
		default: module.DashboardHomePage,
	}))
);

const DashboardProjectsPage = lazy(() =>
	import("../pages/dashboard/projects/ProjectsPage").then((module) => ({
		default: module.ProjectsPage,
	}))
);

const DashboardSettingsPage = lazy(() =>
	import("../pages/dashboard/settings/SettingsPage").then((module) => ({
		default: module.SettingsPage,
	}))
);

const DashboardExperiencePage = lazy(() =>
	import("../pages/dashboard/experience/ExperiencePage").then((module) => ({
		default: module.ExperiencePage,
	}))
);

const DashboardMessagesPage = lazy(() =>
	import("../pages/dashboard/messages/MessagesPage").then((module) => ({
		default: module.MessagesPage,
	}))
);

const DashboardTechnologiesPage = lazy(() =>
	import("../pages/dashboard/technologies/TechnologiesPage").then((module) => ({
		default: module.TechnologiesPage,
	}))
);

const DashboardUsersPage = lazy(() =>
	import("../pages/dashboard/users/UsersPage").then((module) => ({
		default: module.UsersPage,
	}))
);

const DashboardAvailabilityStatusesPage = lazy(() =>
	import("../pages/dashboard/availability/AvailabilityStatusesPage").then((module) => ({
		default: module.AvailabilityStatusesPage,
	}))
);







export function AppRoutes() {
	const { loading } = useAuth();

	const showSplash = useDelayedUnmount(loading, 800) // 300ms = длительность fade-out


	return (
		<>
			{/* Splash Screen показывается только при initAuth(loading).
		В AuthContext возможно заменить с loading на initAuth/initialized/isInitializing  */}
			{showSplash && <AppSplash fadingOut={!loading} />}
			<Suspense fallback={<PageLoader />}>
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
			</Suspense>
		</>
	)
}
