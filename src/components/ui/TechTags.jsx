import { useState } from "react";

export function TechTags({ tech = [] }) {
	const [expanded, setExpanded] = useState(false);
	const maxVisible = 4;

	const visibleTech = expanded
		? tech
		: tech.slice(0, maxVisible);

	return (
		<div className="mb-5 flex-1">
			<div className="flex flex-wrap gap-2">
				{!tech.length ? (
					<div className="text-gray-500">
						Технологии не указаны
					</div>
				) : (
					<>
						{visibleTech.map((item) => (
							<span
								key={item._id}
								className="tag tag-blue text-xs"
							>
								{item.name}
							</span>
						))}
						{!expanded && tech.length > maxVisible && (
							<button
								type="button"
								onClick={() => setExpanded(true)}
								className="tag tag-blue text-xs opacity-70 hover:opacity-100">
								+{tech.length - maxVisible}
							</button>
						)}
						{expanded && tech.length > maxVisible && (
							<button
								type="button"
								onClick={() => setExpanded(false)}
								className="tag tag-blue text-xs opacity-70 hover:opacity-100">
								Скрыть
							</button>
						)}
					</>
				)}

			</div>
		</div>
	);
}