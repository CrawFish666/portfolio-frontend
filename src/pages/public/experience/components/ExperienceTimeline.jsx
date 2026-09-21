import { ExperienceTrackerCard } from "../../../../components/ui/ExperienceTrackerCard";


export function ExperienceTimeline({
	experiences
}) {

	if (!experiences?.length) return null;

	return (
		<section className="relative">
			<div className="absolute left-[11px] md:left-[15px] top-7 md:top-9 bottom-0 w-0.5 bg-subtle" />

			<div className="space-y-6">
				{experiences.map((exp) => (
					<ExperienceTrackerCard
						key={exp._id}
						experience={exp}
					/>
				))}

			</div>
		</section>
	)
}