import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ROUTES } from "./pathsConstants";

export function ProtectedRoutes() {
	const { user, loading } = useAuth();

	if (loading) {
		return <div className="flex items-center justify-center min-h-screen">
			<div className="w-8 h-8 border-2 border-accent-400 border-t-transparent rounded-full animate-spin" />
		</div>;
	}

	return user ? <Outlet /> : <Navigate to={ROUTES.HOME} replace />;
}