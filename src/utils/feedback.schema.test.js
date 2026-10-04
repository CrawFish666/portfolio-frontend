import { describe, expect, it } from "vitest";
import { feedbackSchema } from "./feedback.schema";

describe("Схема валидации обратной связи", () => {
	const validFeedback = {
		name: "Емельян",
		email: "test@example.com",
		subject: "Предложение",
		message: "Здравствуйте!",
		website: "",
	};

	describe("Корректные данные", () => {
		it("принимает корректные данные обратной связи", () => {
			expect(feedbackSchema.safeParse(validFeedback).success).toBe(true);
		});

		it("принимает отсутствие website", () => {
			const { website, ...feedback } = validFeedback;

			expect(feedbackSchema.safeParse(feedback).success).toBe(true);
		});
	});

	describe("Имя", () => {
		it("отклоняет имя короче 2 символов", () => {
			const feedback = {
				...validFeedback,
				name: "А",
			};

			expect(feedbackSchema.safeParse(feedback).success).toBe(false);
		});

		it("отклоняет имя длиннее 18 символов", () => {
			const feedback = {
				...validFeedback,
				name: "а".repeat(19),
			};

			expect(feedbackSchema.safeParse(feedback).success).toBe(false);
		});

		it("отклоняет пустое имя", () => {
			const feedback = {
				...validFeedback,
				name: "",
			};

			expect(feedbackSchema.safeParse(feedback).success).toBe(false);
		});
	});

	describe("Email", () => {
		it("принимает корректный email", () => {
			expect(
				feedbackSchema.safeParse({
					...validFeedback,
					email: "user@example.com",
				}).success
			).toBe(true);
		});

		it("отклоняет пустой email", () => {
			expect(
				feedbackSchema.safeParse({
					...validFeedback,
					email: "",
				}).success
			).toBe(false);
		});

		it("отклоняет некорректный email", () => {
			expect(
				feedbackSchema.safeParse({
					...validFeedback,
					email: "not-an-email",
				}).success
			).toBe(false);
		});

		it("отклоняет email длиннее 45 символов", () => {
			const feedback = {
				...validFeedback,
				email: `${"a".repeat(40)}@test.com`,
			};

			expect(feedbackSchema.safeParse(feedback).success).toBe(false);
		});
	});

	describe("Тема", () => {
		it("отклоняет тему короче 3 символов", () => {
			const feedback = {
				...validFeedback,
				subject: "А",
			};

			expect(feedbackSchema.safeParse(feedback).success).toBe(false);
		});

		it("отклоняет тему длиннее 20 символов", () => {
			const feedback = {
				...validFeedback,
				subject: "а".repeat(21),
			};

			expect(feedbackSchema.safeParse(feedback).success).toBe(false);
		});
	});

	describe("Сообщение", () => {
		it("отклоняет сообщение короче 3 символов", () => {
			const feedback = {
				...validFeedback,
				message: "А",
			};

			expect(feedbackSchema.safeParse(feedback).success).toBe(false);
		});

		it("отклоняет сообщение длиннее 3000 символов", () => {
			const feedback = {
				...validFeedback,
				message: "а".repeat(3001),
			};

			expect(feedbackSchema.safeParse(feedback).success).toBe(false);
		});

		it("принимает сообщение длиной 3000 символов", () => {
			const feedback = {
				...validFeedback,
				message: "а".repeat(3000),
			};

			expect(feedbackSchema.safeParse(feedback).success).toBe(true);
		});
	});

	describe("Дополнительное поле website", () => {
		it("принимает заполненное поле website", () => {
			const feedback = {
				...validFeedback,
				website: "some-value",
			};

			expect(feedbackSchema.safeParse(feedback).success).toBe(true);
		});
	});
});