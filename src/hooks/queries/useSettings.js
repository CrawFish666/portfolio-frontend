import { useQuery } from "@tanstack/react-query";
import { settingsApi } from "../../api/settings.api";

export function useSettings() {
	return useQuery({
		queryKey: ["settings"],
		queryFn: ({ signal }) =>
			settingsApi.get({ signal }),
		staleTime: 5 * 60 * 1000,
	});
}