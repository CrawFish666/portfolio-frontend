import {
	describe,
	expect,
	it,
} from "vitest";

import {
	ApiError,
	normalizeError,
} from "./apiError";

describe("ApiError", () => {
	it("создаёт ошибку с переданными данными", () => {
		const error = new ApiError({
			message: "Ошибка запроса",
			code: "VALIDATION_ERROR",
			status: 400,
			fieldErrors: {
				email: "Неверный email",
			},
		});

		expect(error).toBeInstanceOf(Error);
		expect(error).toBeInstanceOf(ApiError);

		expect(error.message).toBe("Ошибка запроса");
		expect(error.name).toBe("ApiError");
		expect(error.code).toBe("VALIDATION_ERROR");
		expect(error.status).toBe(400);
		expect(error.fieldErrors).toEqual({
			email: "Неверный email",
		});
	});

	it("устанавливает fieldErrors в null, если они не переданы", () => {
		const error = new ApiError({
			message: "Ошибка",
			code: "ERROR",
			status: 500,
		});

		expect(error.fieldErrors).toBeNull();
	});
});

describe("normalizeError", () => {
	describe("Сетевая ошибка", () => {
		it("возвращает NETWORK_ERROR, если сервер не ответил", () => {
			const error = normalizeError(
				new Error("Network Error")
			);

			expect(error).toBeInstanceOf(ApiError);
			expect(error.message).toBe(
				"Не удалось связаться с сервером. Проверьте подключение."
			);
			expect(error.code).toBe("NETWORK_ERROR");
			expect(error.status).toBeNull();
			expect(error.fieldErrors).toBeNull();
		});
	});

	describe("Ошибка API", () => {
		it("преобразует ответ сервера в ApiError", () => {
			const error = normalizeError({
				response: {
					status: 400,
					data: {
						message: "Некорректные данные",
						error: {
							code: "VALIDATION_ERROR",
						},
					},
				},
			});

			expect(error).toBeInstanceOf(ApiError);
			expect(error.message).toBe("Некорректные данные");
			expect(error.code).toBe("VALIDATION_ERROR");
			expect(error.status).toBe(400);
			expect(error.fieldErrors).toBeNull();
		});

		it("использует стандартное сообщение, если сервер его не передал", () => {
			const error = normalizeError({
				response: {
					status: 500,
					data: {},
				},
			});

			expect(error.message).toBe(
				"Что-то пошло не так"
			);
		});

		it("использует UNKNOWN_ERROR, если код ошибки отсутствует", () => {
			const error = normalizeError({
				response: {
					status: 500,
					data: {
						message: "Ошибка сервера",
					},
				},
			});

			expect(error.code).toBe("UNKNOWN_ERROR");
		});

		it("преобразует ошибки полей из массива в объект", () => {
			const error = normalizeError({
				response: {
					status: 400,
					data: {
						message: "Ошибка валидации",
						error: {
							code: "VALIDATION_ERROR",
							details: [
								{
									field: "email",
									message: "Неверный email",
								},
								{
									field: "password",
									message: "Слишком короткий пароль",
								},
							],
						},
					},
				},
			});

			expect(error.fieldErrors).toEqual({
				email: "Неверный email",
				password: "Слишком короткий пароль",
			});
		});

		it("игнорирует элементы details без field", () => {
			const error = normalizeError({
				response: {
					status: 400,
					data: {
						error: {
							details: [
								{
									field: "email",
									message: "Неверный email",
								},
								{
									message: "Общая ошибка",
								},
								{
									field: "",
									message: "Ошибка без поля",
								},
							],
						},
					},
				},
			});

			expect(error.fieldErrors).toEqual({
				email: "Неверный email",
			});
		});

		it("возвращает null для fieldErrors, если details не является массивом", () => {
			const error = normalizeError({
				response: {
					status: 400,
					data: {
						error: {
							details: {
								email: "Неверный email",
							},
						},
					},
				},
			});

			expect(error.fieldErrors).toBeNull();
		});

		it("корректно обрабатывает отсутствующие data и error", () => {
			const error = normalizeError({
				response: {
					status: 404,
				},
			});

			expect(error.message).toBe(
				"Что-то пошло не так"
			);
			expect(error.code).toBe("UNKNOWN_ERROR");
			expect(error.status).toBe(404);
			expect(error.fieldErrors).toBeNull();
		});
	});
});