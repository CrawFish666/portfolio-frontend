import {
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { categoriesApi } from "../../api/categories.api";

export function useCategoryMutations() {
	const queryClient = useQueryClient();

	const createCategory = useMutation({
		mutationFn: categoriesApi.create,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["categories"],
			});
		},
	});

	const updateCategory = useMutation({
		mutationFn: ({ id, data }) =>
			categoriesApi.update(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["categories"],
			});
		},
	});

	const deleteCategory = useMutation({
		mutationFn: categoriesApi.remove,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["categories"],
			});
		},
	});

	return {
		createCategory,
		updateCategory,
		deleteCategory,
	};
}