import { Search } from "lucide-react";

export function ProjectsSearch({
	value,
	onChange
}) {

	return (
		<div className="relative">

			<Search className="absolute left-4 w-4 h-4 text-muted top-1/2 -translate-y-1/2" />

			<input
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder="Поиск проектов..."
				className="input-field pl-10"
			/>

		</div>
	)
}