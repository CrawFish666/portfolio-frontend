import { Info, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { TechTags } from "../../../../components/ui/TechTags";
import { memo } from "react";



const ProjectCard = memo(function ProjectCard({ project }) {

	if (!project) return null;

	const {
		title,
		slug,
		short_description,
		image_url,
		liveDemo_url,
		tech = [],
	} = project;

	const hasDemo = Boolean(liveDemo_url);

	const isExternalDemo = hasDemo && /^https?:\/\//.test(liveDemo_url);

	return (
		<div
			className="card group glass-card overflow-hidden hover:border-subtle-hover hover:-translate-y-2 transition-all p-4 flex-1 flex flex-col">
			<div className="h-48 relative overflow-hidden mb-5">
				<img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
					alt={title}
					src={image_url || "/placeholder.webp"}></img>
			</div>
			<h3 className="mb-3 text-primary font-bold text-lg ">{title}</h3>
			{/* line-clamp-2 сделает 2 строки максимум и далее... min-h-[3rem] размер описание минимум 3rem, чтобы карточки не прыгали*/}
			<p className="text-secondary	 mb-5 line-clamp-2 h-12">{short_description}</p>
			<TechTags tech={tech} />

			<div className="flex gap-5">
				<Link to={`/projects/${slug}`} className="glass-button text-sm flex-1 text-center">
					<Info className="w-4 h-4" />
					Подробнее
				</Link>

				{hasDemo &&
					(isExternalDemo ? (
						<a
							href={liveDemo_url}
							target="_blank"
							rel="noopener noreferrer"
							className="primary-button !shadow-none"
						>
							<Play className="w-4 h-4 fill-current" />
						</a>
					) : (
						<Link
							to={liveDemo_url}
							className="primary-button !shadow-none"
						>
							<Play className="w-4 h-4 fill-current" />
						</Link>
					))}

			</div>
		</div>

	)
})

export default ProjectCard;