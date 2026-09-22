import { Languages } from "lucide-react";
import { RU, US } from "country-flag-icons/react/3x2";

const FLAGS = {
	RU,
	US,
};

export function LanguageCard({ language }) {
	const Flag = FLAGS[language.code];

	return (
		<div className="glass-card p-5 flex-1 basis-60 md:basis-80 sm:flex-none sm:basis-60">
			<h3 className="text-primary font-semibold flex gap-2 items-center">
				{Flag ? (
						<Flag className="w-4 h-4" />
					) : (
						<Languages className="w-4 h-4 text-accent-400" />
					)}
				{language.name}
			</h3>

			<p className="text-base text-muted">
				Уровень владения: {language.level}
			</p>
		</div>
	)
}