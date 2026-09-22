import api from "./client";

export const feedbackApi = {
	async send(data, config = {}) {
		const response = await api.post(
			"/feedback",
			data,
			config
		);

		return response.data.data;
	},

	async getAll(params, config = {}) {
		const response = await api.get("/admin/feedback", {
			params,
			...config,
		});

		return response.data.data;
	},

	async getById(id, config = {}) {
		const response = await api.get(
			`/admin/feedback/${id}`,
			config
		);

		return response.data.data;
	},

	async updateStatus(id, status, config = {}) {
		const response = await api.patch(
			`/admin/feedback/${id}/status`,
			{ status },
			config
		);

		return response.data.data;
	},

	async reply(id, data, config = {}) {
		const response = await api.post(
			`/admin/feedback/${id}/reply`,
			data,
			config
		);

		return response.data.data;
	},

	async remove(id, config = {}) {
		const response = await api.delete(
			`/admin/feedback/${id}`,
			config
		);

		return response.data.data;
	},
};