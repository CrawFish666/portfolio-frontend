import api from "./client";

export const technologiesApi = {
	async getAll(config = {}) {
		const response = await api.get("/technology", config);
		return response.data.data;
	},

	async getAdminAll(config = {}) {
		const response = await api.get("/admin/technology", config);
		return response.data.data;
	},

	async getById(id, config = {}) {
		const response = await api.get(`/technology/${id}`, config);
		return response.data.data;
	},

	async create(data, config = {}) {
		const response = await api.post("/admin/technology", data, config);
		return response.data.data;
	},

	async update(id, data, config = {}) {
		const response = await api.put(
			`/admin/technology/${id}`,
			data,
			config
		);

		return response.data.data;
	},

	async remove(id, config = {}) {
		const response = await api.delete(
			`/admin/technology/${id}`,
			config
		);

		return response.data.data;
	},
};