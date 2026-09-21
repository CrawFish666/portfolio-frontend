import { Languages } from "lucide-react"
import { LanguageCard } from "../../../../components/ui/LanguageCard"


export function ExperienceLanguages({
	languages
}) {

	if (!languages?.length) return null;

	return (
		<section>
			<h2 className="flex items-center gap-3 text-2xl font-semibold text-primary mb-8">
				<Languages className="text-accent-400 w-6 h-6" />
				Владение языками
			</h2>
			<div className="flex gap-6 flex-wrap">
				{languages.map(language => (
					<LanguageCard key={language._id} language={language} />
				))}
			</div>
		</section>
	)
}