import { useQuery } from "@tanstack/react-query";
import { categoriesApi } from "../../api/categories.api";

export function useCategories() {
	return useQuery({
		queryKey: ["categories", "list"],
		queryFn: ({ signal }) =>
			categoriesApi.getAll({ signal }),
		staleTime: 5 * 60 * 1000,
	});
}