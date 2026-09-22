import { createContext, useContext, useEffect, useState } from "react";

// Создаем контекст
const ThemeContext = createContext();

function ThemeProvider({ children }) {
	// Берем тему из localStorage. useState используется, чтобы при рендере компонента уже была тема
	const [theme, setTheme] = useState(() => {
		return localStorage.getItem('theme') || "dark"
	});

	useEffect(() => {
		// Меняем атрибут data-theme, по TailwindCSS
		document.documentElement.setAttribute("data-theme", theme)
		localStorage.setItem("theme", theme)
	}, [theme])

	const toggleTheme = () => setTheme(prevValue => prevValue === "light" ? "dark" : "light")

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}

function useTheme() {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("Хук useTheme невозможно использовать вне ThemeProvider")
	}
	return context;
}

export { useTheme, ThemeProvider }
