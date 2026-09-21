import axios from "axios";
import qs from "qs";
import { tokenManager } from "../auth/token.manager";
import { authEvents } from "../auth/auth.events";
import { normalizeError } from "./apiError";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
	baseURL: API_BASE_URL,
	withCredentials: true, // чтобы куки (refreshToken) отправлялись автоматически
	paramsSerializer: {
		serialize: (params) =>
			qs.stringify(params, {
				arrayFormat: "repeat",
			}),
	},
});

let refreshPromise = null;

api.interceptors.request.use((config) => {
	const token = tokenManager.getToken();

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

api.interceptors.response.use(
	(response) => response,

	async (error) => {
		const originalRequest = error.config;
		
		if (
			error.response?.status !== 401 ||
			!originalRequest ||
			originalRequest._retry
		) {
			return Promise.reject(error);
		}

		originalRequest._retry = true;

		if (!refreshPromise) {
			refreshPromise = axios
				.post(
					`${API_BASE_URL}/auth/refresh`,
					{},
					{ withCredentials: true }
				)
				.then((response) => {
					const newToken = response.data.data.accessToken;

					tokenManager.setToken(newToken);
					authEvents.emit("TOKEN_UPDATED", newToken);

					return newToken;
				})
				.catch((refreshError) => {
					tokenManager.clearToken();
					authEvents.emit("LOGOUT");
					throw refreshError;
				})
				.finally(() => {
					refreshPromise = null;
				});
		}

		try {
			const newToken = await refreshPromise;

			originalRequest.headers.Authorization = `Bearer ${newToken}`;

			return api(originalRequest);
		} catch (refreshError) {
			return Promise.reject(refreshError);
		}
	}
);

api.interceptors.response.use(
	(response) => response,
	(error) => {
		return Promise.reject(normalizeError(error))
	}
);

export default api;