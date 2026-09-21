import { useQuery } from "@tanstack/react-query";
import { projectsApi } from "../../api/projects.api";

export function useAdminProjects(search) {
	return useQuery({
		queryKey: ["projects", "admin-list", { search }],
		queryFn: ({ signal }) =>
			projectsApi.getAdminAll(
				{ search },
				{ signal }
			),
	});
}