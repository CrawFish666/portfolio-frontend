import { Award } from "lucide-react";
import { EducationCard } from "../../../../components/ui/EducationCard";


export function ExperienceEducation({
	educations
}) {

	if (!educations?.length) return null;

	return (
		<section>
			<h2 className="flex items-center gap-3 text-2xl font-semibold text-primary mb-8">
				<Award className="text-accent-400 w-6 h-6" />
				Образование
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
				{educations.map(education => (
					<EducationCard key={education._id} education={education} />
				))}
			</div>
		</section>
	)
}