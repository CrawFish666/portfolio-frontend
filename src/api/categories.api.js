import api from "./client";

export const categoriesApi = {
	async getAll(config = {}) {
		const response = await api.get(
			"/categoriesOfTechnology",
			config
		);

		return response.data.data;
	},

	async getById(id, config = {}) {
		const response = await api.get(
			`/admin/categoriesOfTechnology/${id}`,
			config
		);

		return response.data.data;
	},

	async create(data, config = {}) {
		const response = await api.post(
			"/admin/categoriesOfTechnology",
			data,
			config
		);

		return response.data.data;
	},

	async update(id, data, config = {}) {
		const response = await api.put(
			`/admin/categoriesOfTechnology/${id}`,
			data,
			config
		);

		return response.data.data;
	},

	async remove(id, config = {}) {
		const response = await api.delete(
			`/admin/categoriesOfTechnology/${id}`,
			config
		);

		return response.data.data;
	},
};