import { Link } from "react-router-dom";
import { NAV_ITEMS } from "../../constants/navigation";
import { SocialLink } from "../SocialLink";
import { useSettings } from "../../hooks/queries/useSettings";


export function Footer() {

	const { data: settings = null } = useSettings();

	return (
		<footer className="border-t border-subtle bg-surface backdrop-blur-xl mt-auto">

			<div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">

				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
					{/* Brand */}
					<div className="space-y-3">
						<Link
							to="/"
							className="text-lg font-semibold text-primary inline-block"
						>
							CrawFish666
						</Link>

						<p className="text-secondary text-sm leading-relaxed max-w-sm">
							Портфолио Frontend-разработчика: проекты, опыт и современные
							веб-приложения на React
						</p>
					</div>
					{/* Nav */}
					<div className="flex-1 flex flex-col sm:items-center">
						<h3 className="text-primary font-medium mb-4">Навигация</h3>
						<ul className="space-y-3">
							{NAV_ITEMS.map((item) => (
								<li key={item.path}>
									<Link to={item.path} className="text-secondary hover:text-primary text-sm transition-colors">{item.label}</Link>
								</li>
							))}
						</ul>
					</div>
					{/* Contacts */}
					<div className="flex-1">
						<h3 className="text-primary font-medium mb-4">Контакты</h3>
						<div className="flex flex-wrap gap-3">
							{settings?.contacts?.map(contact => (
								<SocialLink key={contact._id} item={contact} />
							))}
						</div>
					</div>
				</div>

				{/* Down copyright */}
				<div className="text-secondary text-sm mt-8 pt-8 border-t border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 ">
					<p>© {new Date().getFullYear()} Crawfish666. Все права защищены.</p>
					<p>Создано с ❤️ используя React</p>
				</div>

			</div>
		</footer>
	)
}