import api from "./client";

export const availabilityStatusesApi = {
	async getAll(config = {}) {
		const response = await api.get(
			"/availabilityStatuses",
			config
		);

		return response.data.data;
	},
};