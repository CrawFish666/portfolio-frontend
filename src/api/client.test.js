import {
	beforeEach,
	describe,
	expect,
	it,
	vi,
} from "vitest";

const {
	apiMock,
	requestUseMock,
	responseUseMock,
	getTokenMock,
	refreshAccessTokenMock,
	normalizeErrorMock,
} = vi.hoisted(() => {
	const requestUse = vi.fn();
	const responseUse = vi.fn();

	const api = vi.fn();

	api.interceptors = {
		request: {
			use: requestUse,
		},

		response: {
			use: responseUse,
		},
	};

	return {
		apiMock: api,

		requestUseMock: requestUse,
		responseUseMock: responseUse,

		getTokenMock: vi.fn(),

		refreshAccessTokenMock: vi.fn(),

		normalizeErrorMock: vi.fn(),
	};
});

vi.mock("axios", () => ({
	default: {
		create: vi.fn(() => apiMock),
	},
}));

vi.mock("../auth/token.manager", () => ({
	tokenManager: {
		getToken: getTokenMock,
	},
}));

vi.mock("../auth/refresh.manager", () => ({
	refreshAccessToken: refreshAccessTokenMock,
}));

vi.mock("./apiError", () => ({
	normalizeError: normalizeErrorMock,
}));

import "./client";

const requestSuccessHandler =
	requestUseMock.mock.calls[0][0];

const responseSuccessHandler =
	responseUseMock.mock.calls[0][0];

const responseErrorHandler =
	responseUseMock.mock.calls[0][1];

const normalizeErrorHandler =
	responseUseMock.mock.calls[1][1];

describe("API client", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("Request interceptor", () => {
		it("добавляет access token в Authorization", () => {
			getTokenMock.mockReturnValue("access-token");

			const config = {
				headers: {},
			};

			const result =
				requestSuccessHandler(config);

			expect(result.headers.Authorization)
				.toBe("Bearer access-token");
		});

		it("не добавляет Authorization без access token", () => {
			getTokenMock.mockReturnValue(null);

			const config = {
				headers: {},
			};

			const result =
				requestSuccessHandler(config);

			expect(result.headers.Authorization)
				.toBeUndefined();
		});

		it("возвращает исходный config", () => {
			getTokenMock.mockReturnValue("access-token");

			const config = {
				headers: {},
				url: "/projects",
			};

			const result =
				requestSuccessHandler(config);

			expect(result).toBe(config);
		});
	});

	describe("Response interceptor", () => {
		it("возвращает успешный response без изменений", () => {
			const response = {
				status: 200,
				data: {
					success: true,
				},
			};

			expect(responseSuccessHandler(response))
				.toBe(response);
		});

		it("отклоняет ошибку, если статус не 401", async () => {
			const error = {
				response: {
					status: 500,
				},
				config: {
					url: "/projects",
				},
			};

			await expect(
				responseErrorHandler(error)
			).rejects.toBe(error);

			expect(refreshAccessTokenMock)
				.not.toHaveBeenCalled();
		});

		it("отклоняет ошибку, если отсутствует config запроса", async () => {
			const error = {
				response: {
					status: 401,
				},
			};

			await expect(
				responseErrorHandler(error)
			).rejects.toBe(error);

			expect(refreshAccessTokenMock)
				.not.toHaveBeenCalled();
		});

		it("не выполняет refresh повторно для запроса с _retry", async () => {
			const error = {
				response: {
					status: 401,
				},
				config: {
					url: "/projects",
					_retry: true,
				},
			};

			await expect(
				responseErrorHandler(error)
			).rejects.toBe(error);

			expect(refreshAccessTokenMock)
				.not.toHaveBeenCalled();
		});

		it("обновляет токен и повторяет исходный запрос после 401", async () => {
			refreshAccessTokenMock.mockResolvedValue(
				"new-access-token"
			);

			apiMock.mockResolvedValue({
				status: 200,
				data: {
					success: true,
				},
			});

			const originalRequest = {
				url: "/projects",
				headers: {},
			};

			const error = {
				response: {
					status: 401,
				},
				config: originalRequest,
			};

			const result =
				await responseErrorHandler(error);

			expect(refreshAccessTokenMock)
				.toHaveBeenCalledTimes(1);

			expect(originalRequest._retry)
				.toBe(true);

			expect(
				originalRequest.headers.Authorization
			).toBe("Bearer new-access-token");

			expect(apiMock)
				.toHaveBeenCalledWith(originalRequest);

			expect(result).toEqual({
				status: 200,
				data: {
					success: true,
				},
			});
		});

		it("отклоняет ошибку refresh", async () => {
			const refreshError =
				new Error("Refresh failed");

			refreshAccessTokenMock.mockRejectedValue(
				refreshError
			);

			const originalRequest = {
				url: "/projects",
				headers: {},
			};

			const error = {
				response: {
					status: 401,
				},
				config: originalRequest,
			};

			await expect(
				responseErrorHandler(error)
			).rejects.toBe(refreshError);

			expect(apiMock)
				.not.toHaveBeenCalled();
		});
	});

	describe("Нормализация ошибок", () => {
		it("преобразует ошибку через normalizeError", async () => {
			const originalError = {
				response: {
					status: 400,
				},
			};

			const normalizedError =
				new Error("Нормализованная ошибка");

			normalizeErrorMock.mockReturnValue(
				normalizedError
			);

			const result =
				normalizeErrorHandler(originalError);

			await expect(result)
				.rejects.toBe(normalizedError);

			expect(normalizeErrorMock)
				.toHaveBeenCalledWith(originalError);
		});
	});
});