import {
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { experienceApi } from "../../api/experience.api";
import { educationApi } from "../../api/education.api";
import { languagesApi } from "../../api/languages.api";

const apiByTab = {
	experience: experienceApi,
	education: educationApi,
	languages: languagesApi,
};

export function useAdminContentMutations(tab) {
	const queryClient = useQueryClient();
	const currentApi = apiByTab[tab];

	const invalidate = () => {
		queryClient.invalidateQueries({
			queryKey: ["admin-content", tab],
		});
	};

	const createItem = useMutation({
		mutationFn: (data) => currentApi.create(data),
		onSuccess: invalidate,
	});

	const updateItem = useMutation({
		mutationFn: ({ id, data }) =>
			currentApi.update(id, data),
		onSuccess: invalidate,
	});

	const deleteItem = useMutation({
		mutationFn: (id) => currentApi.remove(id),
		onSuccess: invalidate,
	});

	return {
		createItem,
		updateItem,
		deleteItem,
	};
}