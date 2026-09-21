import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { ROUTES } from "../routes/pathsConstants";

export function NotFoundPage() {
	return (
		<div className="min-h-dvh flex flex-col items-center justify-center gap-4 px-4 text-center">
			<p className="text-6xl font-bold gradient-text">404</p>
			<h1 className="text-2xl font-semibold text-primary">Страница не найдена</h1>
			<p className="text-secondary max-w-md">
				Похоже, такой страницы не существует или она была перемещена.
			</p>
			<Link to={ROUTES.HOME} className="primary-button mt-4">
				<Home className="w-5 h-5" />
				На главную
			</Link>
		</div>
	);
}