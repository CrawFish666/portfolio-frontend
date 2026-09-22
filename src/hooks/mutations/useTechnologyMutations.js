import {
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { technologiesApi } from "../../api/technologies.api";

export function useTechnologyMutations() {
	const queryClient = useQueryClient();

	const createTechnology = useMutation({
		mutationFn: technologiesApi.create,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["technologies"],
			});
			queryClient.invalidateQueries({
				queryKey: ["categories"],
			});
		},
	});

	const updateTechnology = useMutation({
		mutationFn: ({ id, data }) =>
			technologiesApi.update(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["technologies"],
			});
			queryClient.invalidateQueries({
				queryKey: ["categories"],
			});
		},
	});

	const deleteTechnology = useMutation({
		mutationFn: technologiesApi.remove,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["technologies"],
			});
			queryClient.invalidateQueries({
				queryKey: ["categories"],
			});
		},
	});

	return {
		createTechnology,
		updateTechnology,
		deleteTechnology,
	};
}