import { Calendar } from "lucide-react";
import { formatMonthYear } from "../../utils/formatDate";


export function EducationCard({ education }) {

	return (
		<div className="glass-card p-6 flex flex-col h-full">
			<div>
				<h3 className="text-primary font-semibold">
					{education.institution}
				</h3>
				<p className="text-secondary text-sm mt-1">
					{education.degree}
				</p>
				{education.description && (
					<p className="text-secondary text-sm mt-4">
						{education.description}
					</p>
				)}
			</div>

			<div className="mt-auto	pt-5 flex items-center gap-2 text-sm text-muted">
				<Calendar className="w-4 h-4" />
				<span>
					{formatMonthYear(education.startDate)}
					{" — "}
					{education.isCurrent ? (
						<span className="text-emerald-400">
							настоящее время
						</span>)
						:
						formatMonthYear(education.endDate)
					}
				</span>
			</div>
		</div>
	);
}