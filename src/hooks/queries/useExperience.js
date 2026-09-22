import { useQueries } from "@tanstack/react-query";
import { experienceApi } from "../../api/experience.api";
import { educationApi } from "../../api/education.api";
import { languagesApi } from "../../api/languages.api";

export function useExperience() {
	const results = useQueries({
		queries: [
			{
				queryKey: ["experience", "public-list"],
				queryFn: ({ signal }) =>
					experienceApi.getAll({ signal }),
				staleTime: 5 * 60 * 1000,
			},
			{
				queryKey: ["education", "public-list"],
				queryFn: ({ signal }) =>
					educationApi.getAll({ signal }),
				staleTime: 5 * 60 * 1000,
			},
			{
				queryKey: ["languages", "public-list"],
				queryFn: ({ signal }) =>
					languagesApi.getAll({ signal }),
				staleTime: 5 * 60 * 1000,
			},
		],
	});

	return {
		experiences: results[0].data ?? [],
		educations: results[1].data ?? [],
		languages: results[2].data ?? [],
		isLoading: results.some((result) => result.isLoading),
		isError: results.some((result) => result.isError),
	};
}