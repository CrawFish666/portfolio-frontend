

export function AboutTechStack({
	technologies
}) {
	return (
		<section>
			<h3 className="text-2xl font-semibold text-primary mb-6">Технический стек</h3>
			<div className="space-y-6">
				{technologies.length > 0 ? (
					technologies.map(category => (
						<div key={category._id}>
							<h4 className="text-secondary text-base font-medium mb-3">{category.name}</h4>
							<ul className="flex gap-2 flex-wrap gap-y-4 items-center">
								{category.technologies.map(tech => (
									<li className={`tag border`} style={{
										color: category.color,
										borderColor: `${category.color}30`,
										backgroundColor: `${category.color}20`,
									}} key={tech._id}>
										{tech.name}
									</li>
								))}
							</ul>
						</div>
					))
				) :
					<p className="text-muted">Технологии не добавлены</p>
				}
			</div>
		</section>
	)
}