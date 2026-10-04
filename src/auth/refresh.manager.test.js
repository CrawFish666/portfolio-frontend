import { afterEach, beforeEach, describe, expect, it, vi, } from "vitest";
import { refreshAccessToken } from "./refresh.manager";
import { tokenManager } from "./token.manager";

const { postMock, emitMock } = vi.hoisted(() => ({
	postMock: vi.fn(),
	emitMock: vi.fn(),
}));

vi.mock("axios", () => ({
	default: {
		create: vi.fn(() => ({
			post: postMock,
		})),
	},
}));

vi.mock("./auth.events", () => ({
	authEvents: {
		emit: emitMock,
	},
}));

describe("Обновление access token", () => {
	beforeEach(() => {
		vi.clearAllMocks();

		tokenManager.clearToken();

		vi.stubGlobal("navigator", {
			locks: undefined,
		});
	});

	afterEach(() => {
		vi.unstubAllGlobals();
	});

	describe("Успешное обновление токена", () => {
		it("отправляет запрос на обновление токена", async () => {
			postMock.mockResolvedValue({
				data: {
					data: {
						accessToken: "new-token",
					},
				},
			});

			await refreshAccessToken();

			expect(postMock).toHaveBeenCalledWith("/auth/refresh");
		});

		it("возвращает новый access token", async () => {
			postMock.mockResolvedValue({
				data: {
					data: {
						accessToken: "new-token",
					},
				},
			});

			const token = await refreshAccessToken();

			expect(token).toBe("new-token");
		});

		it("отправляет событие TOKEN_UPDATED с новым токеном", async () => {
			postMock.mockResolvedValue({
				data: {
					data: {
						accessToken: "new-token",
					},
				},
			});

			await refreshAccessToken();

			expect(emitMock).toHaveBeenCalledWith(
				"TOKEN_UPDATED",
				"new-token"
			);
		});
	});

	describe("Ошибка обновления токена", () => {
		it("вызывает событие LOGOUT при ошибке refresh", async () => {
			const error = new Error("Refresh failed");

			postMock.mockRejectedValue(error);

			await expect(refreshAccessToken()).rejects.toBe(error);

			expect(emitMock).toHaveBeenCalledWith("LOGOUT");
		});

		it("пробрасывает исходную ошибку refresh", async () => {
			const error = new Error("Refresh failed");

			postMock.mockRejectedValue(error);

			await expect(refreshAccessToken()).rejects.toBe(error);
		});
	});

	describe("Защита от параллельных refresh-запросов", () => {
		it("не отправляет несколько refresh-запросов одновременно", async () => {
			let resolveRequest;

			postMock.mockReturnValue(
				new Promise((resolve) => {
					resolveRequest = resolve;
				})
			);

			const firstRequest = refreshAccessToken();
			const secondRequest = refreshAccessToken();

			expect(postMock).toHaveBeenCalledTimes(1);

			resolveRequest({
				data: {
					data: {
						accessToken: "new-token",
					},
				},
			});

			await expect(firstRequest).resolves.toBe("new-token");
			await expect(secondRequest).resolves.toBe("new-token");
		});

		it("создает новый refresh-запрос после завершения предыдущего", async () => {
			postMock.mockResolvedValueOnce({
				data: {
					data: {
						accessToken: "first-token",
					},
				},
			});

			const firstToken = await refreshAccessToken();

			postMock.mockResolvedValueOnce({
				data: {
					data: {
						accessToken: "second-token",
					},
				},
			});

			const secondToken = await refreshAccessToken();

			expect(firstToken).toBe("first-token");
			expect(secondToken).toBe("second-token");
			expect(postMock).toHaveBeenCalledTimes(2);
		});
	});

	describe("Web Locks API", () => {
		it("делает refresh напрямую, если Web Locks API недоступен", async () => {
			postMock.mockResolvedValue({
				data: {
					data: {
						accessToken: "new-token",
					},
				},
			});

			vi.stubGlobal("navigator", {
				locks: undefined,
			});

			const token = await refreshAccessToken();

			expect(token).toBe("new-token");
			expect(postMock).toHaveBeenCalledTimes(1);
		});

		it("использует lock при наличии Web Locks API", async () => {
			const requestMock = vi.fn(
				async (name, options, callback) => {
					return callback();
				}
			);

			vi.stubGlobal("navigator", {
				locks: {
					request: requestMock,
				},
			});

			postMock.mockResolvedValue({
				data: {
					data: {
						accessToken: "new-token",
					},
				},
			});

			const token = await refreshAccessToken();

			expect(token).toBe("new-token");

			expect(requestMock).toHaveBeenCalledWith(
				"auth-refresh",
				{ mode: "exclusive" },
				expect.any(Function)
			);
		});

		it("возвращает уже обновленный токен, если он изменился во время ожидания lock", async () => {
			const requestMock = vi.fn(
				async (name, options, callback) => {
					tokenManager.setToken("token-from-another-tab");

					return callback();
				}
			);

			vi.stubGlobal("navigator", {
				locks: {
					request: requestMock,
				},
			});

			postMock.mockResolvedValue({
				data: {
					data: {
						accessToken: "new-token",
					},
				},
			});

			const token = await refreshAccessToken();

			expect(token).toBe("token-from-another-tab");
			expect(postMock).not.toHaveBeenCalled();
		});
	});
});