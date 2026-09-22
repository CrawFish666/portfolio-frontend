import { Outlet } from "react-router-dom";
import { Header } from "../components/layout/Header"
import { Footer } from "../components/layout/Footer"

export function AppLayout() {

	return (
		<div className="relative flex flex-col min-h-screen">
			<div className="absolute -z-10 inset-0 bg-[linear-gradient(var(--auth-grid)_1px,transparent_1px),linear-gradient(90deg,var(--auth-grid)_1px,transparent_1px)] bg-[size:100px_100px]" />
			<Header />
			<main className="flex-1 pt-16">
				<Outlet />
			</main>
			<Footer />
		</div>
	)

}