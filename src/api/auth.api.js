import api from "./client";

export const authApi = {
	async signIn(email, password) {
		const response = await api.post("/auth/login", {
			email,
			password,
		});

		return response.data.data;
	},

	async signUp(data) {
		const response = await api.post("/auth/register", data);
		return response.data.data;
	},

	async signOut() {
		const response = await api.post("/auth/logout");
		return response.data.data;
	},

	async forgotPassword(email) {
		const response = await api.post(
			"/auth/forgot-password",
			{ email }
		);

		return response.data.data;
	},

	async verifyResetPasswordToken(token) {
		const response = await api.get(
			`/auth/reset-password/${token}/verify`
		);

		return response.data.data;
	},

	async resetPassword(token, password) {
		const response = await api.post(
			"/auth/reset-password",
			{ token, password }
		);

		return response.data.data;
	},
};