import { useQuery } from "@tanstack/react-query";
import { feedbackApi } from "../../api/feedback.api";

export function useFeedbackList(params) {
	return useQuery({
		queryKey: ["feedback", "list", params],
		queryFn: ({ signal }) =>
			feedbackApi.getAll(params, { signal }),
		placeholderData: (previousData) => previousData,
	});
}

export function useFeedback(id) {
	return useQuery({
		queryKey: ["feedback", "detail", id],
		queryFn: ({ signal }) =>
			feedbackApi.getById(id, { signal }),
		enabled: Boolean(id),
	});
}