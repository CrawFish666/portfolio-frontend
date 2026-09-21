import api from "./client";

export const languagesApi = {
	async getAll(config = {}) {
		const response = await api.get("/languages", config);
		return response.data.data;
	},

	async getAdminAll(config = {}) {
		const response = await api.get("/admin/languages", config);
		return response.data.data;
	},

	async create(data, config = {}) {
		const response = await api.post(
			"/admin/languages",
			data,
			config
		);

		return response.data.data;
	},

	async update(id, data, config = {}) {
		const response = await api.put(
			`/admin/languages/${id}`,
			data,
			config
		);

		return response.data.data;
	},

	async remove(id, config = {}) {
		const response = await api.delete(
			`/admin/languages/${id}`,
			config
		);

		return response.data.data;
	},
};