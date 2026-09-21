import { Search } from "lucide-react";

export function MessagesSearch({
	value,
	onChange,
	onSearch,
}) {
	return (
		<div className="relative mb-4">
			<Search className="absolute w-6 h-6 top-1/2 -translate-y-1/2 left-3 text-dark-400" />

			<input
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder="Поиск..."
				className="input-field pl-11"
			/>
		</div>
	);
}