import { describe, expect, it } from "vitest";
import {
	usernameSchema,
	nameSchema,
	emailSchema,
	passwordSchema,
	registerSchema,
	loginSchema,
	forgotPasswordSchema,
	resetPasswordSchema,
} from "./authValidationScheme";

describe("Схемы валидации авторизации", () => {
	describe("usernameSchema", () => {
		it("принимает корректный логин", () => {
			expect(usernameSchema.safeParse("user123").success).toBe(true);
		});

		it("отклоняет логин короче 3 символов", () => {
			expect(usernameSchema.safeParse("ab").success).toBe(false);
		});

		it("отклоняет логин длиннее 16 символов", () => {
			expect(usernameSchema.safeParse("fasfasfgdfgsfasfafaf").success).toBe(false);
		});

		it("отклоняет логин с недопустимыми символами", () => {
			expect(usernameSchema.safeParse("user_123").success).toBe(false);
		});

		it("принимает логин из латинских букв и цифр", () => {
			expect(usernameSchema.safeParse("User123").success).toBe(true);
		});
	});

	describe("nameSchema", () => {
		it("принимает корректное имя", () => {
			expect(nameSchema.safeParse("Емельян").success).toBe(true);
		});

		it("принимает пустую строку", () => {
			expect(nameSchema.safeParse("").success).toBe(true);
		});

		it("принимает отсутствие имени", () => {
			expect(nameSchema.safeParse(undefined).success).toBe(true);
		});

		it("отклоняет имя длиннее 50 символов", () => {
			expect(nameSchema.safeParse("а".repeat(51)).success).toBe(false);
		});
	});

	describe("emailSchema", () => {
		it("принимает корректный email", () => {
			expect(emailSchema.safeParse("test@example.com").success).toBe(true);
		});

		it("отклоняет пустой email", () => {
			expect(emailSchema.safeParse("").success).toBe(false);
		});

		it("отклоняет некорректный email", () => {
			expect(emailSchema.safeParse("test").success).toBe(false);
		});
	});

	describe("passwordSchema", () => {
		it("принимает корректный пароль", () => {
			expect(passwordSchema.safeParse("Password1!").success).toBe(true);
		});

		it("отклоняет пароль короче 8 символов", () => {
			expect(passwordSchema.safeParse("Pass1!").success).toBe(false);
		});

		it("отклоняет пароль без заглавной буквы", () => {
			expect(passwordSchema.safeParse("password1!").success).toBe(false);
		});

		it("отклоняет пароль без цифры", () => {
			expect(passwordSchema.safeParse("Password!").success).toBe(false);
		});

		it("отклоняет пароль без специального символа", () => {
			expect(passwordSchema.safeParse("Password1").success).toBe(false);
		});
	});

	describe("registerSchema", () => {
		it("принимает корректные данные регистрации", () => {
			const data = {
				username: "user123",
				name: "Емельян",
				email: "test@example.com",
				password: "Password1!",
				repeatPassword: "Password1!",
			};

			expect(registerSchema.safeParse(data).success).toBe(true);
		});

		it("отклоняет регистрацию при несовпадающих паролях", () => {
			const data = {
				username: "user123",
				name: "Емельян",
				email: "test@example.com",
				password: "Password1!",
				repeatPassword: "Password2!",
			};

			expect(registerSchema.safeParse(data).success).toBe(false);
		});

		it("отклоняет регистрацию без обязательного email", () => {
			const data = {
				username: "user123",
				name: "Емельян",
				email: "",
				password: "Password1!",
				repeatPassword: "Password1!",
			};

			expect(registerSchema.safeParse(data).success).toBe(false);
		});
	});

	describe("loginSchema", () => {
		it("принимает корректные данные входа", () => {
			const data = {
				email: "test@example.com",
				password: "Password1!",
			};

			expect(loginSchema.safeParse(data).success).toBe(true);
		});

		it("отклоняет вход без email", () => {
			const data = {
				email: "",
				password: "Password1!",
			};

			expect(loginSchema.safeParse(data).success).toBe(false);
		});

		it("отклоняет вход без пароля", () => {
			const data = {
				email: "test@example.com",
				password: "",
			};

			expect(loginSchema.safeParse(data).success).toBe(false);
		});
	});

	describe("forgotPasswordSchema", () => {
		it("принимает корректный email", () => {
			expect(
				forgotPasswordSchema.safeParse({
					email: "test@example.com",
				}).success
			).toBe(true);
		});

		it("отклоняет некорректный email", () => {
			expect(
				forgotPasswordSchema.safeParse({
					email: "test",
				}).success
			).toBe(false);
		});

		it("отклоняет отсутствие email", () => {
			expect(
				forgotPasswordSchema.safeParse({
					email: "",
				}).success
			).toBe(false);
		});
	});

	describe("resetPasswordSchema", () => {
		it("принимает корректные данные сброса пароля", () => {
			const data = {
				password: "Password1!",
				repeatPassword: "Password1!",
			};

			expect(resetPasswordSchema.safeParse(data).success).toBe(true);
		});

		it("отклоняет несовпадающие пароли", () => {
			const data = {
				password: "Password1!",
				repeatPassword: "Password2!",
			};

			expect(resetPasswordSchema.safeParse(data).success).toBe(false);
		});

		it("отклоняет пустой повторный пароль", () => {
			const data = {
				password: "Password1!",
				repeatPassword: "",
			};

			expect(resetPasswordSchema.safeParse(data).success).toBe(false);
		});

		it("отклоняет некорректный пароль", () => {
			const data = {
				password: "password",
				repeatPassword: "password",
			};

			expect(resetPasswordSchema.safeParse(data).success).toBe(false);
		});
	});
});