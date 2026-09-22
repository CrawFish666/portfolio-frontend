import { useMemo, useState } from "react"
import { ProjectsSearch } from "./components/ProjectsSearch";
import { ProjectsFilter } from "./components/ProjectsFilters";
import { ProjectsList } from "./components/ProjectsList";
import { useDebounce } from "../../../hooks/useDebounce";
import { useProjectFilters, useProjects } from "../../../hooks/queries/useProjects";


export function ProjectsPage() {
	const [searchQuery, setSearchQuery] = useState('');
	const search = useDebounce(searchQuery, 500);

	const [statusFilter, setStatusFilter] = useState('all');
	const [selectedTech, setSelectedTech] = useState([]);

	const queryParams = useMemo(() => (
		{
			search: search || undefined,
			status: statusFilter === "all" ? undefined : statusFilter,
			tech: selectedTech.length ? selectedTech : undefined,
		}
	), [search, statusFilter, selectedTech])

	const {
		data: projects = [],
		isLoading: projectsLoading,
		isError: projectsError,
	} = useProjects(queryParams);

	const {
		data: filters = {
			statuses: [],
			technologies: [],
		},
		isLoading: filtersLoading,
	} = useProjectFilters();

	const statuses = filters.statuses;
	const technologies = filters.technologies;

	const handleTechClick = (techId) => {
		setSelectedTech((previousTech) =>
			previousTech.includes(techId)
				? previousTech.filter((id) => id !== techId)
				: [...previousTech, techId]
		);
	};

	return (
		<div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 space-y-12 min-h-dvh">
			<div className="top text-center">
				<h1 className="text-primary text-2xl font-bold mb-5">Проекты</h1>
				<p className="text-secondary text-lg max-w-2xl mx-auto">Подборка моих работ. Почти каждый проект можно протестировать.</p>
			</div>

			<ProjectsSearch
				value={searchQuery}
				onChange={setSearchQuery} />

			<ProjectsFilter
				onChange={setStatusFilter}
				statuses={filters.statuses}
				statusFilter={statusFilter}
				technologies={filters.technologies}
				onTechToggle={handleTechClick}
				selectedTech={selectedTech}
			/>

			<ProjectsList
				projects={projects}
				loading={projectsLoading}
				error={projectsError}
			/>

		</div>
	)
}