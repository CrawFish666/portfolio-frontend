import { describe, expect, it } from "vitest";
import { cn } from "./cn";

describe("cn", () => {
	it("объединяет классы", () => {
		expect(cn("text-red-500", "font-bold")).toBe(
			"text-red-500 font-bold"
		);
	});

	it("удаляет конфликтующий Tailwind-класс", () => {
		expect(cn("text-red-500", "text-blue-500")).toBe(
			"text-blue-500"
		);
	});

	it("обрабатывает условные классы", () => {
		expect(
			cn(
				"base",
				true && "active",
				false && "hidden"
			)
		).toBe("base active");
	});

	it("обрабатывает объекты классов", () => {
		expect(
			cn({
				active: true,
				disabled: false,
			})
		).toBe("active");
	});

	it("возвращает пустую строку без классов", () => {
		expect(cn()).toBe("");
	});
});