import { ArrowRight, Download, MapPin, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { SOCIAL_LIST } from "../constants/socialList"
import { SocialLink } from "../components/SocialLink";

export function HomePage() {

	return (
		<section className="flex items-center min-h-dvh">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 py-5">
				<div className="max-w-3xl ">
					<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm mb-8">
						<Sparkles className="w-4 h-4" />
						Открыт для предложений
					</div>
					<h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
						<span className="text-white">Привет, я </span>
						<span className="gradient-text">React FrontEnd Developer</span>
					</h1>
					<p className="text-xl text-dark-400 mb-4 leading-8">Создаю современной веб-приложения с чистым кодом и отличным UX. Специализируюсь на React, TypeScript, Node.js и PostgreSQL.</p>
					<div className="flex items-center gap-1.5 text-dark-500 mb-8">
					{/** flex items-center gap-2 text-dark-500 mb-8 */}
						<MapPin className="w-5 h-5"/>
						Самара, Россия (удалённо)
					</div>
					<div className="flex flex-wrap gap-6 items-center mb-10">
						<Link className="primary-button text-base px-6 py-3" to={"/projects"}>
							Смотреть проекты
							<ArrowRight className="w-5 h-5"/>
						</Link>
						<a href="4" className="glass-button text-base px-6 py-3">
						<Download className="w-5 h-5"/>
						Скачать CV
						</a>
					</div>
					<div className="flex gap-5 mb-10">
						{SOCIAL_LIST.map(item => (
							<SocialLink item={item} />
						))}
					</div>
				</div>
			</div>
		</section>
	)
}