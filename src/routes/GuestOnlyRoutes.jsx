import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ROUTES } from "../routes/pathsConstants"


export function GuestOnlyRoutes() {
	const { user, loading } = useAuth();
	
	if (loading) return null;

	return user ? <Navigate to={ROUTES.HOME} replace /> : <Outlet />;
}