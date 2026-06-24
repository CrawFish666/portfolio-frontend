import { Link, NavLink } from "react-router-dom"

import { SOCIAL_LIST } from "../constants/socialList"
import { SocialLink } from "./SocialLink"
const navItems = [
	{ path: '/', label: "Главная" },
	{ path: '/about', label: "Обо мне" },
	{ path: '/projects', label: "Проекты" },
	{ path: '/experience', label: "Опыт" },
	{ path: '/contact', label: "Контакты" }
]





export function Footer() {

	// Вынести navItems из Header и Footer и делать либо props drilling либо context прокидывать
	return (
		<footer className="border-t border-white/10 bg-dark-900/50 backdrop-blur-xl mt-auto">

			<div className="container max-w-6xl mx-auto px-4 sm:px-6 py-12">

				<div className="upper flex justify-between gap-8">
					{/* Brand */}
					<div className="brand flex-1">
						<span className="text-lg font-semibold text-white hidden sm:block">CrawFish666</span>
						<p className="text-dark-500 text-sm">Frontend React Developer portoflio showcasing projects and experience.</p>
					</div>
					{/* Nav */}
					<div className="navigation flex-1 flex flex-col items-center">
						<h3 className="text-white font-medium mb-4">Навигация</h3>
						<ul className="space-y-2">
							{navItems.map((item) => (
								<li key={item.path}>
									<Link to={item.path} className="text-dark-500 hover:text-white text-sm transition-colors">{item.label}</Link>
								</li>
							))}
						</ul>
					</div>
					{/* Contacts */}
					<div className="contacts flex-1">
						<h3 className="text-white font-medium mb-4">Контакты</h3>
						<div className="flex gap-3">
							{SOCIAL_LIST.map((item) => (
								<SocialLink key={item.path} item={item} />
							))}
						</div>
					</div>
				</div>
				{/* Down copyright */}
				<div className="down text-dark-600 text-sm mt-8 pt-8 border-t border-dark-800 flex sm:flex-row items-center justify-between gap-4">
					<p>© {new Date().getFullYear()} Crawfish666. Все права защищены.</p>
					<p>Создано с ❤️ используя React</p>
				</div>
			</div>
		</footer>
	)
}