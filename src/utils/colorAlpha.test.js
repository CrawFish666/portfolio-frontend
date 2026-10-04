import { describe, expect, it } from "vitest";
import { withAlpha } from "./colorAlpha";

describe("withAlpha", () => {
	it("добавляет alpha к корректному hex-цвету", () => {
		expect(withAlpha("#10b981", "80")).toBe("#10b98180");
	});

	it("работает с hex в верхнем регистре", () => {
		expect(withAlpha("#ABCDEF", "40")).toBe("#ABCDEF40");
	});

	it("использует fallback для некорректного цвета", () => {
		expect(withAlpha("red", "80")).toBe("#10b98180");
	});

	it("использует переданный fallback", () => {
		expect(withAlpha("invalid", "50", "#ffffff")).toBe(
			"#ffffff50"
		);
	});

	it("отклоняет hex неправильной длины", () => {
		expect(withAlpha("#fff", "80")).toBe("#10b98180");
	});

	it("отклоняет hex без #", () => {
		expect(withAlpha("10b981", "80")).toBe("#10b98180");
	});
});