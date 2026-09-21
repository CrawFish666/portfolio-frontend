import { useQuery } from "@tanstack/react-query";
import { technologiesApi } from "../../api/technologies.api";

export function useTechnologies() {
	return useQuery({
		queryKey: ["technologies", "list"],
		queryFn: ({ signal }) =>
			technologiesApi.getAll({ signal }),
		staleTime: 5 * 60 * 1000,
	});
}

export function useAdminTechnologies() {
	return useQuery({
		queryKey: ["technologies", "admin-list"],
		queryFn: ({ signal }) =>
			technologiesApi.getAdminAll({ signal }),
	});
}