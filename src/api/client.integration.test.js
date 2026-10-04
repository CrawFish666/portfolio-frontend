import {
	afterEach,
	beforeAll,
	beforeEach,
	describe,
	expect,
	it,
	vi,
} from "vitest";
import axios from "axios";

import {
	createFakeServer,
	json,
	networkError,
} from "../tests/fakeServer";

vi.mock("../auth/auth.channel", () => ({
	authChannel: {
		emit: vi.fn(),
		subscribe: vi.fn(() => () => { }),
	},
}));

const server = createFakeServer();

let api;
let authApi;
let authEvents;
let tokenManager;
let authChannel;

let events;
let unsubscribe;

beforeAll(async () => {
	// Подменяем только транспорт Axios.
	// Interceptors и остальная auth-логика остаются настоящими.
	axios.defaults.adapter = server.adapter;

	({ default: api } = await import("./client"));
	({ authApi } = await import("./auth.api"));
	({ authEvents } = await import("../auth/auth.events"));
	({ tokenManager } = await import("../auth/token.manager"));
	({ authChannel } = await import("../auth/auth.channel"));
});

beforeEach(() => {
	server.reset();
	tokenManager.clearToken();
	vi.clearAllMocks();

	events = [];

	unsubscribe = authEvents.subscribe((event) => {
		events.push(event);
	});
});

afterEach(() => {
	unsubscribe();
});

const expired = () =>
	json(401, {
		message: "Срок действия токена истёк",
		error: {
			code: "TOKEN_EXPIRED",
		},
	});

const refreshOk = (accessToken = "fresh-token") => () =>
	json(200, {
		data: {
			accessToken,
		},
	});

const logoutWasBroadcast = () =>
	authChannel.emit.mock.calls.some(
		([event]) => event === "LOGOUT"
	);

describe("Refresh при протухшем access token", () => {
	it("обновляет токен и повторяет исходный запрос с новым токеном", async () => {
		tokenManager.setToken("old-token");

		server.on("GET", "/projects", ({ auth }) =>
			auth === "Bearer fresh-token"
				? json(200, {
					data: ["project"],
				})
				: expired()
		);

		server.on(
			"POST",
			"/auth/refresh",
			refreshOk()
		);

		const response = await api.get("/projects");

		expect(response.data).toEqual({
			data: ["project"],
		});

		expect(
			server.calls.map((call) => call.key)
		).toEqual([
			"GET /projects",
			"POST /auth/refresh",
			"GET /projects",
		]);

		expect(
			server
				.callsTo("GET /projects")
				.map((call) => call.auth)
		).toEqual([
			"Bearer old-token",
			"Bearer fresh-token",
		]);

		expect(tokenManager.getToken()).toBe(
			"fresh-token"
		);

		expect(events).toContain("TOKEN_UPDATED");
	});

	it("параллельные запросы с 401 делают ровно один refresh", async () => {
		server.on("GET", "/projects", ({ auth }) =>
			auth === "Bearer fresh-token"
				? json(200, { data: "ok" })
				: expired()
		);

		server.on(
			"POST",
			"/auth/refresh",
			async () => {
				await new Promise((resolve) =>
					setTimeout(resolve, 10)
				);

				return json(200, {
					data: {
						accessToken: "fresh-token",
					},
				});
			}
		);

		const responses = await Promise.all([
			api.get("/projects"),
			api.get("/projects"),
			api.get("/projects"),
		]);

		expect(
			responses.map((response) => response.status)
		).toEqual([200, 200, 200]);

		expect(
			server.callsTo("POST /auth/refresh")
		).toHaveLength(1);
	});

	it("401 на /auth/me тоже запускает refresh", async () => {
		server.on("GET", "/auth/me", ({ auth }) =>
			auth === "Bearer fresh-token"
				? json(200, {
					data: { id: 1 },
				})
				: expired()
		);

		server.on(
			"POST",
			"/auth/refresh",
			refreshOk()
		);

		await expect(
			api.get("/auth/me")
		).resolves.toMatchObject({
			status: 200,
		});

		expect(
			server.callsTo("POST /auth/refresh")
		).toHaveLength(1);
	});
});

describe("Ошибка повторного запроса после успешного refresh", () => {
	it("возвращает ApiError с ошибкой сервера, а не NETWORK_ERROR", async () => {
		tokenManager.setToken("old-token");

		server.on(
			"PUT",
			"/admin/projects/1",
			({ auth }) =>
				auth === "Bearer fresh-token"
					? json(400, {
						message: "Ошибка валидации",
						error: {
							code: "VALIDATION_ERROR",
							details: [
								{
									field: "slug",
									message: "Slug уже занят",
								},
							],
						},
					})
					: expired()
		);

		server.on(
			"POST",
			"/auth/refresh",
			refreshOk()
		);

		await expect(
			api.put("/admin/projects/1", {})
		).rejects.toMatchObject({
			name: "ApiError",
			status: 400,
			code: "VALIDATION_ERROR",
			fieldErrors: {
				slug: "Slug уже занят",
			},
		});
	});
});

describe("401 на auth-эндпоинтах", () => {
	it("неверный пароль не запускает refresh", async () => {
		server.on(
			"POST",
			"/auth/login",
			() =>
				json(401, {
					message: "Неверный email или пароль.",
					error: {
						code: "INVALID_CREDENTIALS",
					},
				})
		);

		server.on(
			"POST",
			"/auth/refresh",
			() =>
				json(401, {
					message: "Refresh-токен отсутствует.",
					error: {
						code: "REFRESH_TOKEN_REQUIRED",
					},
				})
		);

		await expect(
			authApi.signIn(
				"user@example.com",
				"wrong"
			)
		).rejects.toMatchObject({
			name: "ApiError",
			status: 401,
			code: "INVALID_CREDENTIALS",
			message: "Неверный email или пароль.",
		});

		expect(
			server.callsTo("POST /auth/refresh")
		).toHaveLength(0);
	});

	it("неверный пароль не вызывает LOGOUT", async () => {
		server.on(
			"POST",
			"/auth/login",
			() =>
				json(401, {
					message: "Неверный email или пароль.",
					error: {
						code: "INVALID_CREDENTIALS",
					},
				})
		);

		await expect(
			authApi.signIn(
				"user@example.com",
				"wrong"
			)
		).rejects.toBeDefined();

		expect(events).not.toContain("LOGOUT");

		expect(logoutWasBroadcast()).toBe(false);
	});

	it.each([
		"/auth/register",
		"/auth/logout",
	])(
		"401 на %s не запускает refresh",
		async (url) => {
			server.on(
				"POST",
				url,
				() =>
					json(401, {
						message: "Нет доступа",
					})
			);

			server.on(
				"POST",
				"/auth/refresh",
				refreshOk()
			);

			await expect(
				api.post(url)
			).rejects.toMatchObject({
				status: 401,
			});

			expect(
				server.callsTo("POST /auth/refresh")
			).toHaveLength(0);
		}
	);

	it("401 на /auth/logout не воскрешает сессию", async () => {
		server.on(
			"POST",
			"/auth/logout",
			() =>
				json(401, {
					message: "Нет доступа",
				})
		);

		server.on(
			"POST",
			"/auth/refresh",
			refreshOk("resurrected-token")
		);

		tokenManager.setToken("old-token");

		authEvents.emit("LOGOUT");

		await expect(
			authApi.signOut()
		).rejects.toMatchObject({
			status: 401,
		});

		expect(tokenManager.getToken()).toBeNull();

		expect(
			server.callsTo("POST /auth/refresh")
		).toHaveLength(0);
	});
});

describe("Сбой refresh и LOGOUT", () => {
	const setupExpiredSession = (
		refreshHandler
	) => {
		tokenManager.setToken("old-token");

		server.on(
			"GET",
			"/projects",
			expired
		);

		server.on(
			"POST",
			"/auth/refresh",
			refreshHandler
		);
	};

	it("refresh 401 вызывает LOGOUT и очищает токен", async () => {
		setupExpiredSession(() =>
			json(401, {
				message:
					"Сессия не найдена или истекла.",
				error: {
					code: "SESSION_EXPIRED",
				},
			})
		);

		await expect(
			api.get("/projects")
		).rejects.toMatchObject({
			status: 401,
			code: "SESSION_EXPIRED",
		});

		expect(events).toContain("LOGOUT");

		expect(tokenManager.getToken()).toBeNull();

		expect(logoutWasBroadcast()).toBe(true);
	});

	it("ошибка сети при refresh не вызывает LOGOUT", async () => {
		setupExpiredSession(() =>
			networkError()
		);

		await expect(
			api.get("/projects")
		).rejects.toMatchObject({
			code: "NETWORK_ERROR",
		});

		expect(events).not.toContain("LOGOUT");

		expect(tokenManager.getToken()).toBe(
			"old-token"
		);

		expect(logoutWasBroadcast()).toBe(false);
	});

	it.each([500, 503, 403])(
		"refresh %i не вызывает LOGOUT",
		async (status) => {
			setupExpiredSession(() =>
				json(status, {
					message: "Ошибка",
				})
			);

			await expect(
				api.get("/projects")
			).rejects.toMatchObject({
				status,
			});

			expect(events).not.toContain("LOGOUT");

			expect(tokenManager.getToken()).toBe(
				"old-token"
			);

			expect(logoutWasBroadcast()).toBe(false);
		}
	);
});