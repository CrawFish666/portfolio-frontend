import {
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { feedbackApi } from "../../api/feedback.api";

export function useFeedbackMutations() {
	const queryClient = useQueryClient();

	const invalidateFeedback = () => {
		queryClient.invalidateQueries({
			queryKey: ["feedback"],
		});
	};

	const updateStatus = useMutation({
		mutationFn: ({ id, status }) =>
			feedbackApi.updateStatus(id, status),
		onSuccess: invalidateFeedback,
	});

	const reply = useMutation({
		mutationFn: ({ id, data }) =>
			feedbackApi.reply(id, data),
		onSuccess: invalidateFeedback,
	});

	const remove = useMutation({
		mutationFn: (id) => feedbackApi.remove(id),
		onSuccess: (_, deletedId) => {
			queryClient.removeQueries({
				queryKey: ["feedback", "detail", deletedId],
			});

			invalidateFeedback();
		},
	});

	const send = useMutation({
		mutationFn: feedbackApi.send,
	});

	return {
		updateStatus,
		reply,
		remove,
		send
	};
}