import { memo } from "react"
import ProjectCard from "./ProjectCard"


export const ProjectsList = memo(function ProjectsList({
	projects = []
}) {

	if (!projects.length) {
		return (
			<div className="text-center py-12">
				<p className="text-secondary">Проекты не найдены</p>
			</div>
		)
	}

	return (
		<section>
			<h2 className="text-primary text-xl font-bold mb-5">
				Все проекты
			</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{projects.map(project => (
					<ProjectCard key={project._id} project={project} />
				))}
			</div>
		</section>
	)
}
)
