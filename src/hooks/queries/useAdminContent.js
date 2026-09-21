import { useQuery } from "@tanstack/react-query";
import { experienceApi } from "../../api/experience.api";
import { educationApi } from "../../api/education.api";
import { languagesApi } from "../../api/languages.api";

const apiByTab = {
	experience: experienceApi,
	education: educationApi,
	languages: languagesApi,
};

export function useAdminContent(tab) {
	return useQuery({
		queryKey: ["admin-content", tab],
		queryFn: ({ signal }) =>
			apiByTab[tab].getAdminAll({ signal }),
		enabled: Boolean(apiByTab[tab]),
	});
}