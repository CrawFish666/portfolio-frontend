import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext"
import { UserRound, MoonStar, Sun } from "lucide-react"
import { NAV_ITEMS } from "../constants/navigation"

export function Header() {
	const { theme, toggleTheme } = useTheme();
	return (
		// glass border-b border-white/10
		<header className="glass border-b border-white/10 fixed top-0 left-0 right-0 z-50 h-16" >
			<div className="justify-between max-w-6xl flex mx-auto sm:px-6 items-center h-full">

				<Link to={"/"} className={"text-lg font-semibold text-white hidden sm:block"}>
					CrawFish666
				</Link>
				<nav>
					{NAV_ITEMS.map((item) => (
						<NavLink className={({ isActive }) =>
							`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${isActive
								? 'text-white bg-white/10'
								: 'text-dark-400 hover:text-white hover:bg-white/5'
							}`
						} key={item.path} to={item.path}>{item.label}</NavLink>
					))}
				</nav>
				{/* Правый блок */}
				<div className={"flex gap-2.5 items-center"}>
					<button
						onClick={toggleTheme}
						className={"p-2.5 rounded-xl text-dark-400 hover:text-white hover:bg-white/10 transition-colors"}
					>
						{theme === "dark" ? <MoonStar className={"w-8 h-8"} /> : <Sun className={"w-8 h-8 text-yellow-500"} />}
					</button>
					<Link to={'/login'} className={"primary-button text-base"}>
						<UserRound className="w-6 h-6" />
						Войти
					</Link>
				</div>

			</div>
		</header>
	)
}