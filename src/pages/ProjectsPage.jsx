import { Search } from "lucide-react";
import { useMemo, useState } from "react"
import { PROJECTS_LIST } from '../constants/projectList'
import ProjectCard from "../components/ProjectCard";

export function ProjectsPage() {
	const [searchQeury, setSearchQuery] = useState('');
	const [statusFilter, setStatusFilter] = useState('all');
	const [selectedTech, setSelectedTech] = useState([]);

	const filteredProjects = PROJECTS_LIST.filter((project) => {
		const matchesSearch = project.title.toLowerCase().includes(searchQeury.toLowerCase()) ||
			project.short_description.toLowerCase().includes(searchQeury.toLowerCase())
		const matchesStatus = statusFilter === 'all' || project.status.toLowerCase() == statusFilter.toLowerCase();

		const matchesTech =
			selectedTech.length === 0 ||
			selectedTech.every(tech => project.tech.includes(tech));

		return matchesSearch && matchesStatus && matchesTech;
	})

	const favoritesProjects = filteredProjects.filter(project => project.favorite);
	const otherProjects = filteredProjects.filter(project => !project.favorite);

	const STATUS_FILTERS = [
		{ value: "all", label: "All" },
		{ value: "completed", label: "Completed" },
		{ value: "in_progress", label: "In Progress" },
		{ value: "coming_soon", label: "Coming Soon" },
	]

	const techFilters = useMemo(() => {
		return [...new Set(PROJECTS_LIST.flatMap(project => project.tech))];
	}, [PROJECTS_LIST]);

	const handleTechClick = (tech) => {
		setSelectedTech(prev =>
			prev.includes(tech)
				? prev.filter(item => item !== tech) // убрать
				: [...prev, tech] // добавить
		);
	};

	return (
		<div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 space-y-12 min-h-dvh">
			<div className="top text-center">
				<h1 className="text-white text-2xl font-bold mb-5">Проекты</h1>
				<p className="text-dark-400 text-lg max-w-2xl mx-auto">Подборка моих работ. Каждый проект можно протестировать прямо на сайте</p>
			</div>
			<div className="flex gap-4 items-center relative">
				<Search className="w-4 h-4 absolute text-dark-500 left-3" />
				<input placeholder='Поиск проектов...'
					className="flex-1 input-field pl-10"
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
			</div>
			<div className="bot">

				<div className="mb-15 flex flex-col gap-4">
					<div className="flex gap-3">
						{STATUS_FILTERS.map(filter => (
							<button
								key={filter.value}
								onClick={() => setStatusFilter(filter.value.toLowerCase())}
								className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${statusFilter.toLowerCase() === filter.value.toLowerCase() ? 'bg-blue-500/20 text-blue-400 border border-white/10' : 'text-dark-400 hover:text-white hover:bg-white/5'}`}
							>
								{filter.label}
							</button>
						))}
					</div>

					<div className="flex gap-3">
						{techFilters.map((tech, index) => (
							<button
								key={index}
								onClick={() => handleTechClick(tech)}
								className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${selectedTech.includes(tech) ? 'bg-blue-500/20 text-blue-400' : 'text-dark-400 hover:text-white hover:bg-white/5'}`}
							>
								{tech}
							</button>
						))}
					</div>
				</div>

				{favoritesProjects.length > 0 && (
					<section className="mb-15">
						<h2 className="text-white text-xl flex flex-1 items-center gap-2 font-bold mb-5">
							<span className="border-2 bg-emerald-400 border-emerald-400 rounded-full w-2 h-2 fill-current" />
							Избранные проекты
						</h2>
						<div className="grid grid-cols-3 gap-4">
							{favoritesProjects.map(project => (
								<ProjectCard key={project.id} project={project} />
							))}
						</div>
					</section>
				)}

				{otherProjects.length > 0 && (
					<section>
						<h2 className="text-white text-xl font-bold mb-5">
							Все проекты
						</h2>
						<div className="grid grid-cols-3 gap-4">
							{otherProjects.map(project => (
								<ProjectCard key={project.id} project={project} />
							))}
						</div>
					</section>
				)}

				{filteredProjects.length === 0 && (
					<div className="text-center py-12">
						<p className="text-dark-400">Проекты не найдены</p>
					</div>
				)}
			</div>

		</div >
	)
}