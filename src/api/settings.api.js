import api from "./client";

export const settingsApi = {
	async get(config = {}) {
		const response = await api.get("/settings", config);
		return response.data.data;
	},
	async update(payload, config = {}) {
		const response = await api.put("/admin/settings", payload, config);
		return response.data.data;
	},

	async uploadCV(file, config = {}) {
		const formData = new FormData();
		formData.append("cv", file);

		const response = await api.post(
			"admin/upload/cv",
			formData,
			config
		);

		return response.data.data;
	},

	async removeCV(config = {}) {
		const response = await api.delete("admin/upload/cv", config);
		return response.data.data;
	},
};