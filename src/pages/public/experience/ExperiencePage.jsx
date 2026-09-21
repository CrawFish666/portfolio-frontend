import { useEffect, useState } from "react"

import { ExperienceLanguages } from "./components/ExperienceLanguages"
import { ExperienceEducation } from "./components/ExperienceEducation"
import { ExperienceTimeline } from "./components/ExperienceTimeline"
import { useExperience } from "../../../hooks/queries/useExperience";


export function ExperiencePage() {
	const {
		experiences,
		educations,
		languages,
		isLoading,
		isError,
	} = useExperience();


	return (
		<div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-16">
			<div className="text-center">
				<h1 className="text-4xl font-bold text-primary mb-4">Опыт работы</h1>
				<p className="text-secondary text-lg">Мой профессиональный путь</p>
			</div>
			{/**Experience Timeline */}
			<ExperienceTimeline experiences={experiences} />

			{/**Education */}
			<ExperienceEducation educations={educations} />

			{/**Секция владения языками */}
			<ExperienceLanguages languages={languages} />

		</div>
	)
}

