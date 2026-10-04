import { describe, expect, it } from "vitest";
import { getAvailabilityLabel } from "./availability";

describe("Конвертация статуса code доступности от backend to label", () => {
	test("возвращает label для open", () => {
		expect(getAvailabilityLabel("open"))
			.toBe("Открыт к предложениям");
	});

	test("возвращает пустую строку, если code не передан", () => {
		expect(getAvailabilityLabel())
			.toBe("");
	});

	test("возвращает 'Неизвестно' для неизвестного code", () => {
		expect(getAvailabilityLabel("unknown"))
			.toBe("Неизвестно");
	});
});