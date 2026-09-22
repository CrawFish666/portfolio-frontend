import { ArrowRight } from "lucide-react"
import { ROUTES } from "../../../../routes/pathsConstants";
import ProjectCard from "../../projects/components/ProjectCard"
import { Link } from "react-router-dom"

export function HomeFeaturedProjectsSection({
	projects,
	loading
}) {
	return (
		<section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
			<div className="flex flex-col sm:flex-row justify-between gap-5 mb-12 items-start sm:items-center">
				<div className="">
					<h2 className="text-3xl font-bold text-primary mb-2">Избранные проекты</h2>
					<p className="text-secondary">Наиболее значимые работы</p>
				</div>
				
				<Link to={ROUTES.PROJECTS} className="self-end text-secondary hover:text-primary flex items-center gap-1 text-sm px-6 py-2 bg-transparent font-medium rounded-xl transition-all duration-200 hover:bg-active">
					{/**px-4 py-2.5 bg-transparent hover:bg-white/5 text-gray-300 hover:text-white font-medium rounded-xl transition-all duration-200; */}
					Все проекты <ArrowRight className="w-5 h-5" /></Link>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
				{loading ? (
					<div className="col-span-full text-center text-secondary py-10">
						Загрузка проектов...
					</div>
				) : projects.length > 0 ? (
					projects.map((project) => (
						<ProjectCard key={project._id} project={project} />
					))
				) : (
					<div className="col-span-full text-center text-secondary py-10">
						Нет избранных проектов
					</div>
				)}
			</div>
		</section>
	)
}