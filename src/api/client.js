import axios from "axios";
import qs from "qs";
import { tokenManager } from "../auth/token.manager";
import { normalizeError } from "./apiError";
import { refreshAccessToken } from "../auth/refresh.manager";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const NO_REFRESH_URLS = [
	"/auth/login",
	"/auth/register",
	"/auth/refresh",
	"/auth/logout",
];
const shouldSkipRefresh = (url = "") => NO_REFRESH_URLS.some((path) => url.startsWith(path));

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
			originalRequest._retry ||
			shouldSkipRefresh(originalRequest.url)
		) {
			return Promise.reject(error);
		}

		originalRequest._retry = true;

		try {
			const newToken = await refreshAccessToken();

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