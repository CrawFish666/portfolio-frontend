import { Code2, Heart, Rocket, Lightbulb } from 'lucide-react';

const values = [
	{
		icon: Code2,
		title: 'Чистый код',
		description: 'Пишу понятный, поддерживаемый и масштабируемый код',
	},
	{
		icon: Rocket,
		title: 'Развитие',
		description: 'Постоянно изучаю новые технологии и применяю знания на практике',
	},
	{
		icon: Heart,
		title: 'Внимание к деталям',
		description: 'Уделяю внимание удобству использования и качеству интерфейсов',
	},
	{
		icon: Lightbulb,
		title: 'Поиск решений',
		description: 'Люблю разбираться в новых задачах и находить практичные решения',
	},
];

export function AboutWorkPrinciples() {
	return (
		<section>
			<h3 className="text-2xl font-semibold text-primary mb-6">Принципы работы</h3>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{values.map(item => {
					return <div key={item.title} className="glass-card p-6">
						<item.icon className="text-accent-400 mb-3 w-6 h-6" />
						<h4 className="font-medium text-primary mb-2">{item.title}</h4>
						<p className="text-muted">{item.description}</p>
					</div>
				})}
			</div>
		</section>
	)
}