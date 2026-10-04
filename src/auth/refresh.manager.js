import axios from "axios";

import { tokenManager } from "./token.manager";
import { authEvents } from "./auth.events";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const refreshClient = axios.create({
	baseURL: API_BASE_URL,
	withCredentials: true,
});

const REFRESH_LOCK = "auth-refresh";

let refreshPromise = null;

const refreshDirectly = async () => {

	try {
		const response = await refreshClient.post("/auth/refresh");

		const newToken = response.data.data.accessToken;


		authEvents.emit("TOKEN_UPDATED", newToken);

		return newToken;
	} catch (error) {

		if (error.response?.status === 401) {
			authEvents.emit("LOGOUT");
		}
		throw error;
	}
};

const refreshWithLock = async (previousToken) => {
	if (!navigator.locks) {
		return refreshDirectly();
	}

	return navigator.locks.request(
		REFRESH_LOCK,
		{ mode: "exclusive" },
		async () => {

			const currentToken = tokenManager.getToken();

			/*
			 * Пока эта вкладка ждала lock,
			 * другая вкладка могла уже обновить токен.
			 */
			if (currentToken && currentToken !== previousToken) {
				return currentToken;
			}

			return refreshDirectly();
		}
	);
};

export const refreshAccessToken = async () => {

	if (refreshPromise) {
		return refreshPromise;
	}

	const previousToken = tokenManager.getToken();

	refreshPromise = refreshWithLock(previousToken).finally(() => {

		refreshPromise = null;
	});

	return refreshPromise;
};
