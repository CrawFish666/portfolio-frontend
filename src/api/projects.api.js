import api from "./client";

export const projectsApi = {
	async getAll(params, config = {}) {
		const response = await api.get("/projects", {
			params,
			...config,
		});

		return response.data.data;
	},

	async getFilters(config = {}) {
		const response = await api.get("/projects/filters", config);
		return response.data.data;
	},

	async getStatuses(config = {}) {
		const response = await api.get(
			"/projects/statuses",
			config
		);

		return response.data.data;
	},

	async getBySlug(slug, config = {}) {
		const response = await api.get(`/projects/${slug}`, config);
		return response.data.data;
	},

	async getAdminAll(params, config = {}) {
		const response = await api.get("/admin/projects", {
			params,
			...config,
		});

		return response.data.data;
	},

	async getAdminById(id, config = {}) {
		const response = await api.get(`/admin/projects/${id}`, config);
		return response.data.data;
	},

	async create(data, config = {}) {
		const response = await api.post("/admin/projects", data, config);
		return response.data.data;
	},

	async update(id, data, config = {}) {
		const response = await api.put(`/admin/projects/${id}`, data, config);
		return response.data.data;
	},

	async remove(id, config = {}) {
		const response = await api.delete(`/admin/projects/${id}`, config);
		return response.data.data;
	},
};