import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ROUTES } from "../routes/pathsConstants"
import { NotFoundPage } from "../pages/NotFoundPage";

export function AdminOnlyRoutes() {
	const { user, loading } = useAuth();

	if (loading) return null;

	// if (!user) return <Navigate to={ROUTES.HOME} replace />;

	{/* Так лучше сделать для secure */ }
	if (user.role !== "admin") return <NotFoundPage />;

	return <Outlet />;
}