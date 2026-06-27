import {
	Code2,
	Heart,
	Coffee,
	Rocket,
	Award,
	BookOpen,
	Users,
	Zap,
	Briefcase,
	Target,
	TrendingUp,
	Code,
} from 'lucide-react';

const values = [
	{
		icon: Code2,
		title: 'Чистый код',
		description: 'Пишу понятный, поддерживаемый и масштабируемый код',
	},
	{
		icon: Rocket,
		title: 'Быстрая разработка',
		description: 'Эффективно использую время для достижения результатов',
	},
	{
		icon: Heart,
		title: 'Внимание к деталям',
		description: 'Каждый пиксель и анимация продуманы',
	},
	{
		icon: Users,
		title: 'Командная работа',
		description: 'Умею работать в команде и делиться опытом',
	},
];

const tech_skills = {
	Frontend: {
		color: 'blue',
		skills: ['JavaScript (ES6+)', 'HTML5', 'CSS3', 'Tailwind CSS', 'Vite', 'React', 'React router', 'Redux Toolkit', 'Axios', 'React Hook Form'],
	},
	'Backend Basics': {
		color: 'green',
		skills: ['Node.js', 'Express', 'REST API', 'JWT Authentication']
	},
	DataBase: {
		color: 'yellow',
		skills: ['PostgreSQL', 'MongoDB']
	},
	Infrastructure: {
		color: 'gray',
		skills: ['Linux', 'Docker', 'Nginx', 'VPS']
	},
	'Systems & Networking': {
		color: 'cyan',
		skills: ['VPN', 'Linux Kernel', 'Hardware Troubleshooting']
	}
};

const goals = [
	{
		icon: Briefcase,
		color: "text-blue-400",
		title: "Позиция",
		description: "Junior Frontend Developer",
	},
	{
		icon: Code2,
		color: "text-emerald-400",
		title: "Стек",
		description: "React, JavaScript и современные веб-технологии",
	},
	{
		icon: Users,
		color: "text-yellow-400",
		title: "Формат",
		description: "Работа в команде, наставничество, Code Review",
	},
	{
		icon: TrendingUp,
		color: "text-purple-400",
		title: "Цель",
		description: "Рост до Middle Frontend, затем Full Stack",
	},
];

export function AboutPage() {
	return (
		<div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16 py-12">
			{/* Header */}
			<div className="text-center">
				<h1 className="text-4xl font-bold text-white mb-4">Обо мне</h1>
				<p className="text-dark-400 text-lg">Немного о том, кто я и чем занимаюсь</p>
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/** left/photo section */}
				<div className="left-photo-inf lg:col-span-1 glass-card p-6 lg:sticky self-start top-24 items-center">
					<div className="w-26 h-26 mx-auto rounded-full flex items-center justify-center mb-6 overflow-hidden object-cover">
						<img src="/176997-zhivotnoe_chernyj-kot-datskij_dog-koshachih-chernaya_koshka-360x640.jpg"></img>
					</div>
					<h2 className="text-xl font-semibold text-white text-center mb-2">CrawFish666</h2>
					<p className="text-dark-400 text-center text-sm mb-6">React FrontEnd Deveolper</p>
					<div className="space-y-3 text-base">
						<div className="flex justify-between gap-5 border-b border-dark-700 py-2">
							<span className="text-dark-500">Опыт</span>
							<span className="text-white">1+ год</span>
						</div>
						<div className="flex justify-between gap-5 border-b border-dark-700 py-2">
							<span className="text-dark-500">Локация</span>
							<span className="text-white">Самара, Россия</span>
						</div>
						<div className="flex justify-between gap-5 border-b border-dark-700 py-2 text-right">
							<span className="text-dark-500">Специализация</span>
							<span className="text-white">Web Development</span>
						</div>

						<div className="flex justify-between gap-5 py-2">
							<span className="text-dark-500">Статус</span>
							<span className="text-emerald-400 flex items-center gap-2">
								<span className="w-2 h-2 rounded-full bg-emerald-400" />
								Доступен
							</span>
						</div>
					</div>
				</div>

				<div className="right lg:col-span-2 space-y-12">
					{/** bio/right sections */}
					<section>
						<h2 className="text-2xl font-semibold text-white mb-6">Привет!</h2>
						<div className="space-y-4 text-dark-300 leading-relaxed">
							<p>
								Я Full Stack разработчик с более чем 5-летним опытом создания веб-приложений.
								Начинал с фронтенда, но быстро понял, что бэкенд так же интересен,
								и с тех пор работаю на обеих сторонах стека.
							</p>
							<p>
								Мне нравится создавать красивые и функциональные интерфейсы,
								которые решают реальные задачи пользователей. За кулисами я уделяю
								много внимания архитектуре, оптимизации и безопасности.
							</p>
							<p>
								В свободное время я изучаю новые технологии, читаю техническую литературу
								и contributed в open-source проекты. Верю, что лучший способ учиться —
								это применять знания на практике.
							</p>
						</div>
					</section>
					{/** Принципы моей работы */}
					<section>
						<h3 className="text-2xl font-semibold text-white mb-6">Принципы работы</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{values.map(item => {
								return <div key={item.title} className="glass-card p-6">
									<item.icon className="text-accent-400 mb-3 w-6 h-6" />
									<h4 className="font-medium text-white mb-2">{item.title}</h4>
									<p className="text-dark-500">{item.description}</p>
								</div>
							})}
						</div>
					</section>
					{/** Tech Skills */}
					<section>
						<h3 className="text-2xl font-semibold text-white mb-6">Технический стек</h3>
						<div className="space-y-6">
							{console.log(Object.entries(tech_skills))}
							{Object.entries(tech_skills).map(([category, { color, skills }]) => (
								<div className="" key={category}>
									<h4 className="text-dark-400 text-base font-medium mb-3">{category}</h4>
									<ul className="flex gap-2 flex-wrap gap-y-4">
										{skills.map(skill => (
											<li key={skill} className={`tag tag-${color}`}>{skill}</li>
										))}
									</ul>
								</div>
							))}
						</div>
					</section>

					{/** What I'm Looking For */}
					<section className="">
						<h3 className="text-2xl font-semibold text-white mb-6 text-center">Что я ищу?</h3>
						<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 text-center">
							{goals.map(item => (
								<div className="flex flex-col items-center glass-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent-500/20">
									<item.icon className={`w-8 h-8 mb-2 ${item.color}`} />
									<p className="text-xl font-bold text-white mb-2">{item.title}</p>
									<p className="text-dark-400 text-sm">{item.description}</p>
								</div>
							))}
						</div>
					</section>
					{/* <div className="h-[2000px]">Тут много контента для скролла...</div> */}
				</div>
			</div>
		</div>
	)
}