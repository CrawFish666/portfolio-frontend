import { useQuery } from "@tanstack/react-query";
import { projectsApi } from "../../api/projects.api";

export function useProjects(params) {
	return useQuery({
		queryKey: ["projects", "list", params],
		queryFn: ({ signal }) => projectsApi.getAll(params, { signal }),
		placeholderData: (previousData) => previousData,
	});
}

export function useProjectBySlug(slug) {
	return useQuery({
		queryKey: ["projects", "detail", slug],
		queryFn: ({ signal }) => projectsApi.getBySlug(slug, { signal }),
		enabled: Boolean(slug),
	});
}

export function useProjectFilters() {
	return useQuery({
		queryKey: ["projects", "filters"],
		queryFn: ({ signal }) => projectsApi.getFilters({ signal }),
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