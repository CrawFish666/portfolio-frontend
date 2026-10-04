import { describe, expect, it } from "vitest";
import { technologySchema } from "./technology.schema";

describe("technologySchema", () => {
	const validTechnology = {
		name: "React",
		slug: "react",
		icon: "React",
		category: "frontend",
		website: "https://react.dev",
		order: 1,
		isActive: true,
	};

	it("принимает корректные данные", () => {
		const result = technologySchema.safeParse(validTechnology);

		expect(result.success).toBe(true);
	});

	it("обрезает пробелы у name и slug", () => {
		const result = technologySchema.safeParse({
			...validTechnology,
			name: "  React  ",
			slug: "  react  ",
		});

		expect(result.success).toBe(true);

		expect(result.data.name).toBe("React");
		expect(result.data.slug).toBe("react");
	});

	it("отклоняет пустое название", () => {
		const result = technologySchema.safeParse({
			...validTechnology,
			name: "",
		});

		expect(result.success).toBe(false);
		expect(result.error.issues[0].message).toBe(
			"Название обязательно"
		);
	});

	it("отклоняет пустой slug", () => {
		const result = technologySchema.safeParse({
			...validTechnology,
			slug: "",
		});

		expect(result.success).toBe(false);
		expect(result.error.issues[0].message).toBe(
			"Slug обязателен"
		);
	});

	it("отклоняет некорректный slug", () => {
		const result = technologySchema.safeParse({
			...validTechnology,
			slug: "React JS",
		});

		expect(result.success).toBe(false);
	});

	it("принимает технологию без icon", () => {
		const result = technologySchema.safeParse({
			...validTechnology,
			icon: undefined,
		});

		expect(result.success).toBe(true);
	});

	it("отклоняет пустую category", () => {
		const result = technologySchema.safeParse({
			...validTechnology,
			category: "",
		});

		expect(result.success).toBe(false);
		expect(result.error.issues[0].message).toBe(
			"Выберите категорию"
		);
	});

	it("принимает пустой website", () => {
		const result = technologySchema.safeParse({
			...validTechnology,
			website: "",
		});

		expect(result.success).toBe(true);
	});

	it("принимает корректный website", () => {
		const result = technologySchema.safeParse({
			...validTechnology,
			website: "https://github.com",
		});

		expect(result.success).toBe(true);
	});

	it("отклоняет некорректный website", () => {
		const result = technologySchema.safeParse({
			...validTechnology,
			website: "github.com",
		});

		expect(result.success).toBe(false);
		expect(result.error.issues[0].message).toBe(
			"Некорректный URL"
		);
	});

	it("отклоняет отрицательный order", () => {
		const result = technologySchema.safeParse({
			...validTechnology,
			order: -1,
		});

		expect(result.success).toBe(false);
	});

	it("отклоняет дробный order", () => {
		const result = technologySchema.safeParse({
			...validTechnology,
			order: 1.5,
		});

		expect(result.success).toBe(false);
	});
});