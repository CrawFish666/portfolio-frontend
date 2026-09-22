

export function ProjectsFilter({
	onChange,
	statuses,
	statusFilter,
	technologies,
	onTechToggle,
	selectedTech
}) {
	return (
		<div className="mb-15 flex flex-col">
			<div className="flex flex-wrap gap-3 border-b md:border-0 py-4">

				<button
					onClick={() => onChange("all")}
					className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${statusFilter === "all"
						? "bg-blue-500/20 text-blue-400 border border-subtle"
						: "text-secondary hover:text-primary hover:bg-active"}`}
				>
					Всё
				</button>
				{statuses.map((status) => (
					<button
						key={status._id}
						onClick={() => onChange(status.code)}
						className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${statusFilter === status.code
							? "bg-blue-500/20 text-blue-400 border border-subtle"
							: "text-secondary hover:text-primary hover:bg-active"
							}`}
					>
						{status.title}
					</button>
				))}
			</div>

			<div className="flex flex-wrap gap-3 py-4">
				{technologies.map((tech) => (
					<button
						key={tech._id}
						onClick={() => onTechToggle(tech._id)}
						className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${selectedTech.includes(tech._id)
							? "bg-blue-500/20 text-blue-400 border border-subtle"
							: "text-secondary hover:text-primary hover:bg-active"
							}`}
					>
						{tech.name}
					</button>
				))}
			</div>
		</div>
	)
}