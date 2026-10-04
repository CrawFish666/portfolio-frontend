import { describe, expect, it } from "vitest";
import { categorySchema } from "./category.schema";

describe("categorySchema", () => {
	const validCategory = {
		name: "Frontend",
		slug: "frontend",
		color: "#10b981",
		icon: "Code",
		order: 1,
		isActive: true,
	};

	it("принимает корректные данные", () => {
		const result = categorySchema.safeParse(validCategory);

		expect(result.success).toBe(true);
	});

	it("обрезает пробелы у строковых полей", () => {
		const result = categorySchema.safeParse({
			...validCategory,
			name: "  Frontend  ",
			slug: "  frontend  ",
			color: "  #10b981  ",
			icon: "  Code  ",
		});

		expect(result.success).toBe(true);

		expect(result.data).toEqual({
			...validCategory,
			name: "Frontend",
			slug: "frontend",
			color: "#10b981",
			icon: "Code",
		});
	});

	it("отклоняет пустое название", () => {
		const result = categorySchema.safeParse({
			...validCategory,
			name: "",
		});

		expect(result.success).toBe(false);
		expect(result.error.issues[0].message).toBe(
			"Название категории обязательно"
		);
	});

	it("отклоняет слишком длинное название", () => {
		const result = categorySchema.safeParse({
			...validCategory,
			name: "a".repeat(51),
		});

		expect(result.success).toBe(false);
		expect(result.error.issues[0].message).toBe(
			"Название не может быть длиннее 50 символов"
		);
	});

	it("отклоняет некорректный slug", () => {
		const invalidSlugs = [
			"Front-end",
			"frontend_",
			"frontend slug",
			"фронтенд",
		];

		invalidSlugs.forEach((slug) => {
			const result = categorySchema.safeParse({
				...validCategory,
				slug,
			});

			expect(result.success).toBe(false);
		});
	});

	it("принимает slug с латинскими буквами, цифрами и дефисом", () => {
		const result = categorySchema.safeParse({
			...validCategory,
			slug: "frontend-2",
		});

		expect(result.success).toBe(true);
	});

	it("отклоняет отрицательный order", () => {
		const result = categorySchema.safeParse({
			...validCategory,
			order: -1,
		});

		expect(result.success).toBe(false);
		expect(result.error.issues[0].message).toBe(
			"Порядок не может быть отрицательным"
		);
	});

	it("отклоняет дробный order", () => {
		const result = categorySchema.safeParse({
			...validCategory,
			order: 1.5,
		});

		expect(result.success).toBe(false);
		expect(result.error.issues[0].message).toBe(
			"Порядок должен быть целым числом"
		);
	});

	it("преобразует строковый order в число", () => {
		const result = categorySchema.safeParse({
			...validCategory,
			order: "5",
		});

		expect(result.success).toBe(true);
		expect(result.data.order).toBe(5);
	});

	it("отклоняет некорректный тип isActive", () => {
		const result = categorySchema.safeParse({
			...validCategory,
			isActive: "true",
		});

		expect(result.success).toBe(false);
	});
});