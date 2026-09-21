import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Решает проблему. При переходе на другую страницу(не по якорю), то скролл вверх

export function ScrollToTop() {
	const { pathname, hash } = useLocation();

	useEffect(() => {
		if (!hash) {
			window.scrollTo(0, 0);
		}
	}, [pathname, hash]);

	return null;
}