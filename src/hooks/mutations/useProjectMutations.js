import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectsApi } from "../../api/projects.api";

export function useProjectMutations() {
	const queryClient = useQueryClient();
	const invalidateProjects = () => queryClient.invalidateQueries({ queryKey: ["projects"] });

	const createProject = useMutation({
		mutationFn: (data) => projectsApi.create(data),
		onSuccess: invalidateProjects,
	});

	const updateProject = useMutation({
		mutationFn: ({ id, data }) => projectsApi.update(id, data),
		onSuccess: invalidateProjects,
	});

	const deleteProject = useMutation({
		mutationFn: (id) => projectsApi.remove(id),
		onSuccess: invalidateProjects,
	});

	return { createProject, updateProject, deleteProject };
}