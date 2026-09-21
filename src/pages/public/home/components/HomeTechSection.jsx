import { BsTypescript } from "react-icons/bs"
import { DiPostgresql } from "react-icons/di"
import { FaNodeJs, FaReact } from "react-icons/fa"
import { TbWorld } from "react-icons/tb"



const techList = [
	{ name: "React", icon: FaReact },
	{ name: "TypeScript", icon: BsTypescript },
	{ name: "Node.js", icon: FaNodeJs},
	{ name: "PostgreSQL", icon: DiPostgresql },
	{ name: "Three.js", icon: TbWorld},
]

export function HomeTechSection() {
	return (
		<section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
			<div className="mb-12 text-center">
				<h2 className="text-3xl font-bold text-primary mb-4">Технологии</h2>
				<p className="text-secondary">Основной стек, с которым работаю</p>
			</div>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
				{techList.map((item) => {
					return (
						<div key={item.name} className="glass-card p-6 text-center hover:border-subtle-hover transition-all flex flex-col items-center">
							<item.icon className="w-10 h-10 text-accent-400 mb-3" />
							<h3 className="font-medium text-primary mb-2 text-xl">{item.name}</h3>
					
						</div>
					)
				})}
			</div>
		</section>
	)
}