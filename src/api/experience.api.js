import api from "./client";

export const experienceApi = {
	async getAll(config = {}) {
		const response = await api.get("/experience", config);
		return response.data.data;
	},

	async getAdminAll(config = {}) {
		const response = await api.get("/admin/experience", config);
		return response.data.data;
	},

	async create(data, config = {}) {
		const response = await api.post(
			"/admin/experience",
			data,
			config
		);

		return response.data.data;
	},

	async update(id, data, config = {}) {
		const response = await api.put(
			`/admin/experience/${id}`,
			data,
			config
		);

		return response.data.data;
	},

	async remove(id, config = {}) {
		const response = await api.delete(
			`/admin/experience/${id}`,
			config
		);

		return response.data.data;
	},
};