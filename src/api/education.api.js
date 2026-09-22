import api from "./client";

export const educationApi = {
	async getAll(config = {}) {
		const response = await api.get("/education", config);
		return response.data.data;
	},

	async getAdminAll(config = {}) {
		const response = await api.get("/admin/education", config);
		return response.data.data;
	},

	async create(data, config = {}) {
		const response = await api.post(
			"/admin/education",
			data,
			config
		);

		return response.data.data;
	},

	async update(id, data, config = {}) {
		const response = await api.put(
			`/admin/education/${id}`,
			data,
			config
		);

		return response.data.data;
	},

	async remove(id, config = {}) {
		const response = await api.delete(
			`/admin/education/${id}`,
			config
		);

		return response.data.data;
	},
};