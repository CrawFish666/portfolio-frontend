import { Outlet } from "react-router-dom";

export function AuthLayout() {
	return (
		<div className="relative min-h-dvh flex items-center justify-center">
			{/* Background */}
			<div className="absolute -z-10 inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:100px_100px]" />


			<Outlet />

		</div>
	)
}