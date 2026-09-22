import { formatMonthYear } from "../../utils/formatDate";
import { TechTags } from "./TechTags";
import { Calendar, MapPin, Building, Briefcase } from "lucide-react"

export function ExperienceTrackerCard({ experience }) {

	return (
		<div className="relative pl-8 md:pl-12">
			{/* Dot */}
			<div className={`absolute left-0 top-1 w-6 h-6 md:w-8 md:h-8 rounded-full border-2 ${experience.isCurrent
				? 'bg-emerald-500/20 border-emerald-500'
				: 'bg-timeline-surface border-subtle-hover'
				} flex items-center justify-center`}>
				<Briefcase className={`w-3 h-3 md:w-4 md:h-4 ${experience.isCurrent ? 'text-emerald-400' : 'text-timeline-icon'}`} />
			</div>

			{/* Card */}
			<div className="glass-card p-6 ml-2 hover:border-subtle-hover transition-all">
				{/* Header */}
				<div className="flex flex-col items-start md:flex-row md:justify-between gap-2 mb-4">
					<div>
						<h3 className="text-lg font-semibold text-primary">{experience.position}</h3>
						<div className="flex flex-wrap items-center gap-3 text-sm text-secondary mt-1">
							<span className="flex items-center gap-1.5">
								<Building className="w-4 h-4" />
								{experience.company}
							</span>
							{experience.location && (
								<span className="flex items-center gap-1.5">
									<MapPin className="w-4 h-4" />
									{experience.location}
								</span>
							)}
						</div>
					</div>
					<div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-input border border-subtle text-sm">
						<Calendar className="w-4 h-4 text-accent-400" />
						<span className={`text-secondary`}>
							{formatMonthYear(experience.startDate)}
							{" — "}
							{experience.isCurrent ? (<span className="text-emerald-400">
								• Настоящее время
							</span>) : (formatMonthYear(experience.endDate))}
						</span>
					</div>
				</div>
				{/* Description */}
				<p className="text-secondary text-sm mb-4 whitespace-pre-line">
					{experience.description}
				</p>
				{/* Technologies */}
				{experience.tech?.length > 0 && (
					<div className="mb-5">
						<TechTags tech={experience.tech} />
					</div>
				)}
				{/* Achievements */}
				{experience.achievements?.length > 0 && (
					<div className="border-t border-subtle pt-4">
						<h4 className="text-sm font-medium text-thirdly mb-3">
							Достижения:
						</h4>
						<ul className="space-y-2">
							{experience.achievements.map(
								(achievement, index) => (
									<li
										key={index}
										className="flex items-start gap-2 text-sm	text-secondary">
										<span className="w-1.5 h-1.5 rounded-full bg-accent-400 mt-1.5 flex-shrink-0" />
										{achievement}
									</li>))
							}
						</ul>
					</div>
				)}
			</div>
		</div>
	)

}