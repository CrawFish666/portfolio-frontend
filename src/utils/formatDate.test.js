import { describe, expect, it } from "vitest";
import { formatMonthYear } from "./formatDate";

describe("Форматирование даты фида YYYY-MM-DD to янв. 2024", () => {
	it("возвращает месяц и год", () => {
		expect(formatMonthYear("2024-01-15"))
			.toBe("янв. 2024");
	});

	it("возвращает пустую строку, если дата не передана", () => {
		expect(formatMonthYear())
			.toBe("");
	});

	it("возвращает пустую строку для некорректной даты", () => {
		expect(formatMonthYear("это не дата"))
			.toBe("");
	});
});