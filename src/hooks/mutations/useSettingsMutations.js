import {
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { settingsApi } from "../../api/settings.api";

export function useSettingsMutations() {
	const queryClient = useQueryClient();

	const updateSettings = useMutation({
		mutationFn: settingsApi.update,
		onSuccess: (settings) => {
			queryClient.setQueryData(
				["settings"],
				settings
			);
		},
	});

	const uploadCV = useMutation({
		mutationFn: settingsApi.uploadCV,
		onSuccess: (settings) => {
			queryClient.setQueryData(
				["settings"],
				settings
			);
		},
	});

	const removeCV = useMutation({
		mutationFn: settingsApi.removeCV,
		onSuccess: (settings) => {
			queryClient.setQueryData(
				["settings"],
				settings
			);
		},
	});

	return {
		updateSettings,
		uploadCV,
		removeCV,
	};
}