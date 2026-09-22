import { useQuery } from "@tanstack/react-query";
import { projectsApi } from "../../api/projects.api";

export function useProjects(params) {
	return useQuery({
		queryKey: ["projects", "list", params],
		queryFn: () => projectsApi.getAll(params),
	});
}

export function useProjectBySlug(slug) {
	return useQuery({
		queryKey: ["projects", "detail", slug],
		queryFn: () => projectsApi.getBySlug(slug),
		enabled: Boolean(slug),
	});
}

export function useProjectFilters() {
	return useQuery({
		queryKey: ["projects", "filters"],
		queryFn: () => projectsApi.getFilters(),
		staleTime: 5 * 60 * 1000,
	});
}

export function useProjectStatuses() {
	return useQuery({
		queryKey: ["projects", "statuses"],
		queryFn: ({ signal }) =>
			projectsApi.getStatuses({ signal }),
		staleTime: 5 * 60 * 1000,
	});
}