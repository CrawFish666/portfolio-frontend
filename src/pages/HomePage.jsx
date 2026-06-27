import { ArrowRight, Download, MapPin, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { SOCIAL_LIST } from "../constants/socialList"
import { SocialLink } from "../components/SocialLink";
import { FaNodeJs, FaReact } from "react-icons/fa";
import { BsTypescript } from "react-icons/bs";
import { DiPostgresql } from "react-icons/di";
import { TbWorld } from "react-icons/tb";


const techList = [
	{ name: "React", icon: FaReact, percentLearning: 92 },
	{ name: "TypeScript", icon: BsTypescript, percentLearning: 93 },
	{ name: "Node.js", icon: FaNodeJs, percentLearning: 94 },
	{ name: "PostgreSQL", icon: DiPostgresql, percentLearning: 95 },
	{ name: "Three.js", icon: TbWorld, percentLearning: 96 },
]

const projectsList = [
	{
		id: 1,
		webPage: "weather-globe",
		title: "Weather Globe",
		description: "Интерактивный 3D глобус с прогнозом погоды",
		tech: ['React', 'Three.js', "Supabase"],
		image: '/photo-1451187580459-43490279c0fa.jpg',
		favorite: false
	},
	{
		id: 2,
		webPage: "weather-globe2",
		title: "Todo Board",
		description: "Kanban-доска для управления задачамиKanban-доска для управления задачамиKanban-доска для управления задачамиKanban-доска для управления задачами",
		tech: ['React', 'DnD', "Supabase"],
		image: '/pexels-photo-6956903.avif',
		favorite: false
	},
	{
		id: 3,
		webPage: "weather-globe3",
		title: "Notes App",
		description: "Приложение для заметок с markwodn",
		tech: ['React', 'TypeScript', "Supabase"],
		image: '/photo-1517842645767-c639042777db.jpg',
		favorite: false
	},
	{
		id: 4,
		webPage: "weather-globe4",
		title: "Weather Globe4",
		description: "Интерактивный 3D глобус с прогнозом погоды",
		tech: ['React', 'Three.js', "Supabase"],
		image: '777',
		favorite: true
	},
]

export function HomePage() {

	return (
		<>
			{/** hero section */}
			<section className="flex items-center min-h-dvh py-10">
				<div className="max-w-6xl mx-auto px-4 sm:px-6">
					<div className="max-w-3xl ">
						<div className="animate-glow inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 text-sm mb-8 ">
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
							<MapPin className="w-5 h-5" />
							Самара, Россия (удалённо)
						</div>
						<div className="flex flex-wrap gap-6 items-center mb-10">
							<Link className="primary-button text-base px-6 py-3" to={"/projects"}>
								Смотреть проекты
								<ArrowRight className="w-5 h-5" />
							</Link>
							<a href="4" className="glass-button text-base px-6 py-3">
								<Download className="w-5 h-5" />
								Скачать CV
							</a>
						</div>
						<div className="flex gap-5">
							{SOCIAL_LIST.map(item => (
								<SocialLink key={item.path} item={item} />
							))}
						</div>
					</div>
				</div>
			</section>

			{/** tech section */}
			<section className="max-w-6xl mx-auto px-4 sm:px-6 dark:bg-white">
				<div className="mb-12 text-center">
					<h2 className="text-3xl font-bold text-white mb-4">Технологии</h2>
					<p className="text-dark-400">Основной стек, с которым работаю</p>
				</div>
				<div className="flex gap-6">
					{techList.map((item) => {
						return (
							<div key={item.name} className="flex-1 glass-card p-6 text-center hover:border-white/20 transition-all flex flex-col items-center">
								<item.icon className="w-10 h-10 text-accent-400 mb-3"/>
								<h3 className="font-medium text-white mb-2 text-xl">{item.name}</h3>
								{/* <div></div>
								<span className="text-xs text-dark-500 mt-1 block">{item.percentLearning}%</span> */}
							</div>
						)
					})}
				</div>
			</section>

			{/* Projects */}
			<section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
				<div className="flex justify-between mb-12 items-end">
					<div className="">
						<h2 className="text-3xl font-bold text-white mb-2">Избранные проекты</h2>
						<p className="text-dark-400">Наиболее значимые работы</p>
					</div>
					<Link to="/projects" className="text-gray-300 hover:text-white flex items-center gap-1 text-sm px-6 py-2 bg-transparent font-medium rounded-xl transition-all duration-200 hover:bg-white/10">
						{/**px-4 py-2.5 bg-transparent hover:bg-white/5 text-gray-300 hover:text-white font-medium rounded-xl transition-all duration-200; */}
						Все проекты <ArrowRight className="w-5 h-5" /></Link>
				</div>
				<div className="flex gap-6">
					{projectsList.filter(item => item.favorite === false).map(item => {
						return <Link key={item.id}
							className="card group glass-card overflow-hidden hover:border-white/20 transition-all flex-1 p-6 flex flex-col">
							<div className="h-48 relative overflow-hidden mb-5">
								<img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={item.title} src={item.image}></img>
							</div>
							<h3 className="mb-3 text-white font-bold text-lg group-hover:text-blue-400">{item.title}</h3>
							<p className="text-gray-400 mb-5 flex-1">{item.description}</p>
							<div className="flex flex-wrap gap-2">
								{item.tech.map((techSkills, i) => {
									return <span className="tag tag-blue text-xs" key={i}>{techSkills}</span>
								})}

							</div>
						</Link>
					})}
				</div>
			</section>

			{/* Call To action */}
			<section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 pb-25">
				<div className="glass-card p-8 md:p-12 text-center relative overflow-hidden">
					<div className="flex flex-col gap-3 items-center">
						<h2 className="text-3xl font-bold text-white mb-4">Готов сотрудничать?</h2>
						<p className="text-dark-400 mb-8 max-w-lg">
							Я всегда открыт для новых проектов и интересных предложений.
							Давайте обсудим вашу идею!
						</p>
						<Link to="/contact" className="flex primary-button text-base px-8 py-3">
							Связаться со мной
							<ArrowRight />
						</Link>
					</div>
				</div>
			</section>
		</>

	)
}