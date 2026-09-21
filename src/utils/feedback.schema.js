import { z } from "zod";

export const feedbackSchema = z.object({
	name: z.string()
		.trim()
		.min(2, "Минимум 2 символа")
		.max(18, "Максимум 18 символов"),

	email: z.string()
		.trim()
		.min(1, "Email обязателен")
		.max(45, "Максимум 45 символов")
		.email("Неверный формат email"),

	subject: z.string()
		.trim()
		.min(3, "Минимум 3 символа")
		.max(20, "Максимум 20 символов"),

	message: z.string()
		.trim()
		.min(3, "Минимум 3 символа")
		.max(3000, "Максимум 3000 символов"),

	website: z.string().optional(),
});