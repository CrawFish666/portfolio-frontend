import { NavLink } from "react-router-dom"
import { NAV_ITEMS } from "../../constants/navigation"


export function HeaderNav({
	mobile = false,
	onNavigate
}) {

	return (
		<nav className={mobile ? "flex flex-col gap-2" : "hidden md:flex items-center gap-1"}>
			{NAV_ITEMS.map((item) => (
				<NavLink key={item.path} to={item.path} onClick={onNavigate}
					className={({ isActive }) =>
						mobile
							? `px-4 py-3 rounded-xl ${isActive
								? "text-primary bg-active"
								: "text-secondary hover:text-primary hover:bg-active"
							}`
							: `px-4 py-2 rounded-xl text-sm font-medium transition-colors ${isActive
								? "text-primary bg-active"
								: "text-secondary hover:text-primary hover:bg-active"
							}`
					} >{item.label}</NavLink>
			))}
		</nav>
	)
}
