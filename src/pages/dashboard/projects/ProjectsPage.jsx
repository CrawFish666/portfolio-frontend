// Добавить валидационную схему в модалку/или сюда.
// Отрефакторить код, мб что-то вынести. Возможно разделить загрузку данных при поиске
// TechnologyModal, TechnologySelect
// Добавить сервис api для projects
// Реализовать загрузку изображения с компа. Чтобы хранило на беке
import { useState } from "react";
import { ProjectModal } from "./components/ProjectModal";
import { Star, Pencil, Trash2 } from "lucide-react";
import { useDebounce } from "../../../hooks/useDebounce";
import { useAdminProjects } from "../../../hooks/queries/useAdminProjects";
import { useProjectStatuses } from "../../../hooks/queries/useProjects";
import { useTechnologies } from "../../../hooks/queries/useTechnologies";
import { useProjectMutations } from "../../../hooks/mutations/useProjectMutations";

export function ProjectsPage() {
	const [search, setSearch] = useState("");
	const [isProjectModalOpen, setProjectModalOpen] = useState(false);
	const [editingProject, setEditingProject] = useState(null);

	const debouncedSearch = useDebounce(search, 500);

	const {
		data: projects = [],
		isLoading: projectsLoading,
		isError: projectsError,
	} = useAdminProjects(debouncedSearch);

	const {
		data: statuses = [],
	} = useProjectStatuses();

	const {
		data: technologies = [],
	} = useTechnologies();

	const { createProject, updateProject, deleteProject } = useProjectMutations();

	const handleCreateProject = () => {
		setEditingProject(null);
		setProjectModalOpen(true);
	};

	const handleEditProject = (project) => {
		setEditingProject(project);
		setProjectModalOpen(true);
	};

	const handleCloseProject = () => {
		setEditingProject(null);
		setProjectModalOpen(false);
	};

	const handleProjectSubmit = async (data) => {
		if (editingProject) {
			await updateProject.mutateAsync({
				id: editingProject._id,
				data,
			});
		} else {
			await createProject.mutateAsync(data);
		}

		handleCloseProject();
	};

	const handleDeleteProject = async (project) => {
		const confirmed = window.confirm(`Удалить проект "${project.title}"?`);
		if (!confirmed) {
			return;
		}
		await deleteProject.mutateAsync(project._id);
	};

	return (
		<div>
			<div className="flex justify-between items-center mb-6">
				<div>
					<h1 className="text-2xl font-bold text-white mb-1">
						Проекты
					</h1>
					<p className="text-dark-400">
						Управление проектами
					</p>
				</div>

				<button
					onClick={handleCreateProject}
					className="primary-button">
					+ Добавить проект
				</button>

			</div>
			<div className="glass rounded-2xl p-4 mb-6">
				<input
					className="input-field"
					placeholder="Поиск проекта..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</div>

			<div className="glass rounded-2xl border border-white/5 overflow-hidden">
				<table className="w-full">
					<thead>
						<tr className="border-b border-white/10">
							<th className="text-left p-4 w-[38%]">
								Проект
							</th>
							<th className="text-left p-4 w-[16%]">
								Статус
							</th>
							<th className="text-left p-4 w-[16%]">
								Доступность
							</th>
							<th className="text-left p-4 w-[26%]">
								Технологии
							</th>
							<th className="text-center p-4 w-[10%]">
								<Star
									className="w-5 h-5 fill-yellow-400 text-yellow-400 mx-auto"
								/>
							</th>
							<th className="text-right p-4 w-[10%]">
								Действия
							</th>
						</tr>
					</thead>
					<tbody>
						{projects.length === 0 ? (
							<tr>
								<td
									colSpan={5}
									className="text-center py-10 text-dark-400">
									Проекты отсутствуют
								</td>
							</tr>
						) : (
							projects.map(project => (
								<tr
									key={project._id}
									className="border-b border-white/5 hover:bg-white/[0.03]">
									<td className="p-4">
										<div className="flex items-center gap-4">
											{project.image_url ? (
												<img
													src={project.image_url}
													alt={project.title}
													className="w-14 h-14 rounded-xl object-cover bg-dark-700" />
											) : (
												<div className="w-14 h-14 rounded-xl bg-dark-700 flex items-center justify-center text-dark-400">
													Нет фото
												</div>
											)}

											<div>
												<p className="font-semibold text-white">
													{project.title}
												</p>
												<p className="text-dark-400 text-sm line-clamp-2">
													{project.short_description}
												</p>
											</div>
										</div>
									</td>
									<td className="p-4">
										<span
											className="px-3 py-1 rounded-full text-xs"
											style={{
												backgroundColor: `${project.status.color}22`,
												color: project.status.color,
											}}>
											{project.status.title}
										</span>
									</td>

									<td className="p-4">
										<span
											className="px-3 py-1 rounded-full text-xs">
											{project.is_public ? "Public" : "Private"}
										</span>
									</td>

									<td className="p-4">
										<div className="flex flex-wrap gap-2">
											{project?.tech?.length > 0 ? project.tech.map(tech => (
												<span
													key={tech._id}
													className="px-2 py-1 rounded-lg bg-white/5 text-xs">
													{tech.name}
												</span>
											)) :
												<span>Нет технологй</span>}
										</div>
									</td>
									<td className="p-4 text-center">
										{project.favorite ? (
											<Star
												className="w-5 h-5 fill-yellow-400 text-yellow-400 mx-auto" />
										) : (
											<Star
												className="w-5 h-5 text-dark-500 mx-auto" />
										)}
									</td>
									<td className="p-4">
										<div className="flex justify-end gap-3">
											<button
												type="button"
												className="cursor-pointer text-dark-300 hover:text-white transition"
												onClick={() => handleEditProject(project)}>
												<Pencil className="w-5 h-5" />
											</button>

											<button
												type="button"
												className="cursor-pointer text-dark-300 hover:text-red-400 transition"
												onClick={() => handleDeleteProject(project)}>
												<Trash2 className="w-5 h-5" />
											</button>

										</div>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>

			</div>
			<ProjectModal
				isOpen={isProjectModalOpen}
				project={editingProject}
				statuses={statuses}
				technologies={technologies}
				onClose={handleCloseProject}
				onSave={handleProjectSubmit}
			/>
		</div>
	);
}

