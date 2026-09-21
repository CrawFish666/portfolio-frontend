import { useQuery } from "@tanstack/react-query";
import { availabilityStatusesApi } from "../../api/availabilityStatuses.api";

export function useAvailabilityStatuses() {
	return useQuery({
		queryKey: ["availabilityStatuses"],
		queryFn: ({ signal }) =>
			availabilityStatusesApi.getAll({ signal }),
		staleTime: 5 * 60 * 1000,
	});
}