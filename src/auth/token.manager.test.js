import { describe, expect, it, beforeEach } from "vitest";
import { tokenManager } from "./token.manager";

describe("Менеджер access token", () => {
	beforeEach(() => {
		tokenManager.clearToken();
	});

	describe("getToken", () => {
		it("возвращает null, если токен не установлен", () => {
			expect(tokenManager.getToken()).toBe(null);
		});

		it("возвращает установленный токен", () => {
			tokenManager.setToken("test-token");

			expect(tokenManager.getToken()).toBe("test-token");
		});
	});

	describe("setToken", () => {
		it("устанавливает токен", () => {
			tokenManager.setToken("access-token");

			expect(tokenManager.getToken()).toBe("access-token");
		});

		it("заменяет существующий токен", () => {
			tokenManager.setToken("old-token");
			tokenManager.setToken("new-token");

			expect(tokenManager.getToken()).toBe("new-token");
		});
	});

	describe("clearToken", () => {
		it("удаляет установленный токен", () => {
			tokenManager.setToken("access-token");

			tokenManager.clearToken();

			expect(tokenManager.getToken()).toBe(null);
		});
	});
});