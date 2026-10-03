import { authChannel } from "./auth.channel";
import { tokenManager } from "./token.manager";

const listeners = new Set();

const notifyListeners = (event, data) => {
	listeners.forEach((callback) => {
		callback(event, data);
	});
};

export const authEvents = {
	subscribe(callback) {
		listeners.add(callback);

		return () => {
			listeners.delete(callback);
		};
	},

	emit(event, data) {
		if (event === "TOKEN_UPDATED") {
			tokenManager.setToken(data);
		}

		if (event === "LOGOUT") {
			tokenManager.clearToken();
		}

		notifyListeners(event, data);
		authChannel.emit(event, data);
	},
};

authChannel.subscribe((event, data) => {
	if (event === "TOKEN_UPDATED") {
		tokenManager.setToken(data);
	}

	if (event === "LOGOUT") {
		tokenManager.clearToken();
	}

	notifyListeners(event, data);
});