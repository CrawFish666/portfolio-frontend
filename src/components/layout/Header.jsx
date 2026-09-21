import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext"
import { NAV_ITEMS } from "../../constants/navigation"
import { useEffect, useState } from "react";
import { ROUTES } from "../../routes/pathsConstants";
import { MoonStar, Sun, Menu, X } from "lucide-react";
import { HeaderUser } from "./HeaderUser";
import { HeaderNav } from "./HeaderNav";
import { MobileMenu } from "./MobileMenu";

export function Header() {
	const { theme, toggleTheme } = useTheme();

	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	useEffect(() => {
		document.body.style.overflow = mobileMenuOpen ? "hidden" : "";

		return () => {
			document.body.style.overflow = "";
		};
	}, [mobileMenuOpen]);

	return (

		<>
			<header className="glass !border-0 !border-b border-subtle fixed top-0 left-0 right-0 z-50 h-16" >
				<div className="max-w-6xl w-full px-4 sm:px-6 mx-auto flex items-center justify-between h-full">

					<div className="">
						<Link to={ROUTES.HOME} className={"text-lg font-semibold text-primary shrink-0 block md:hidden lg:block"}>
							CrawFish666
						</Link>
					</div>

					<HeaderNav />

					{/* Правый блок */}
					<div className={"flex gap-2.5 items-center"}>
						<button
							onClick={toggleTheme}
							className={"p-2.5 rounded-xl text-secondary hover:text-primary hover:bg-active transition-colors"}
						>
							{theme === "light" ? <Sun className={"w-6 h-6 text-yellow-500"} /> : <MoonStar className={"w-6 h-6"} />}
						</button>

						<div className="hidden md:block">
							<HeaderUser />
						</div>

						<button
							className="md:hidden p-2.5 rounded-xl text-secondary hover:text-primary hover:bg-active transition-colors"
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						>
							{mobileMenuOpen
								? <X className="w-6 h-6" />
								: <Menu className="w-6 h-6" />
							}
						</button>
					</div>

				</div>

			</header>
			<MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
		</>
	)
}