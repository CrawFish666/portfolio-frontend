import {
	Briefcase, Code2, Users, TrendingUp
} from 'lucide-react';

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
		description: "React, JavaScript, TypeScript и современные веб-технологии",
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
		title: "Развитие",
		description: "Рост как Frontend Developer и изучение новых технологий",
	},
];

export function AboutCareerGoal() {

	return (
		<section className="">
			<h3 className="text-2xl font-semibold text-primary mb-6 text-center">Что я ищу?</h3>
			<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 text-center">
				{goals.map(item => (
					<div key={item.title} className="flex flex-col items-center glass-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent-500/20">
						<item.icon className={`w-8 h-8 mb-2 ${item.color}`} />
						<p className="text-xl font-bold text-primary mb-2">{item.title}</p>
						<p className="text-secondary text-sm">{item.description}</p>
					</div>
				))}
			</div>
		</section>
	)
}