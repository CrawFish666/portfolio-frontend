import { Info, Play } from "lucide-react";
import { Link } from "react-router-dom";


export default function ProjectCard({ project }) {

	if (!project) return null;

	const {
		title = "Без названия",
		slug = '',
		liveDemo_url = '',
		is_public = false,
		status = '',
		short_description = "",
		full_description = '',
		tech = [],
		image_url = '/placeholder.webp',
		source_url = '',
		favorite = true,
	} = project;
	console.log(title)

	return (
		<div
			className="card group glass-card overflow-hidden hover:border-white/20 transition-all p-6 flex-1 flex flex-col">
			<div className="h-48 relative overflow-hidden mb-5">
				<img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
					alt={title}
					src={image_url}></img>
			</div>
			<h3 className="mb-3 text-white font-bold text-lg ">{title}</h3>
			{/* line-clamp-2 сделает 2 строки максимум и далее... min-h-[3rem] размер описание минимум 3rem, чтобы карточки не прыгали*/}
			<p className="text-gray-400 mb-5 flex-1 line-clamp-2 min-h-12">{short_description}</p>
			<div className="flex flex-wrap gap-2 mb-5">
				{tech && tech.map((techSkills, i) => {
					return <span className="tag tag-blue text-xs" key={i}>{techSkills}</span>
				})}

			</div>
			<div className="flex gap-5">
				<Link to={`/projects/${project.slug}`} className="glass-button text-sm flex-1 text-center">
					<Info className="w-4 h-4" />
					Подробнее
				</Link>
				<Link to={`/projects/${project.slug}/demo`} className="primary-button !shadow-none">
					<Play className="w-4 h-4 fill-current" />

				</Link>

			</div>
		</div>

	)
}

{/* <div className="flex flex-wrap gap-2">
	{item.tech.map((techSkills, i) => {
		return <span className="tag tag-blue text-xs" key={techSkills}>{techSkills}</span>
	})}

</div> */}