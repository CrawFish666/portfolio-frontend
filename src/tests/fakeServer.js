import { AxiosError } from "axios";

export const json = (status, body = {}) => ({
	status,
	data: body,
});

export const networkError = () => ({
	networkError: true,
});

export function createFakeServer() {
	let handlers = new Map();
	let calls = [];

	const adapter = async (config) => {
		const key = `${config.method.toUpperCase()} ${config.url}`;
		const auth = config.headers?.get?.("Authorization") ?? null;

		calls.push({ key, auth });

		const handler = handlers.get(key);

		if (!handler) {
			throw new Error(
				`FakeServer: нет обработчика для "${key}"`
			);
		}

		const result = await handler({ config, auth });

		if (result.networkError) {
			throw new AxiosError(
				"Network Error",
				AxiosError.ERR_NETWORK,
				config
			);
		}

		const response = {
			status: result.status,
			statusText: "",
			headers: {},
			config,
			request: {},
			data: result.data,
		};

		if (config.validateStatus(result.status)) {
			return response;
		}

		throw new AxiosError(
			`Request failed with status code ${result.status}`,
			AxiosError.ERR_BAD_RESPONSE,
			config,
			response.request,
			response
		);
	};

	return {
		adapter,

		on(method, url, handler) {
			handlers.set(`${method} ${url}`, handler);
		},

		reset() {
			handlers = new Map();
			calls = [];
		},

		callsTo(key) {
			return calls.filter((call) => call.key === key);
		},

		get calls() {
			return calls;
		},
	};
}