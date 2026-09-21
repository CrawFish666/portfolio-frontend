import { z } from "zod";

export const technologySchema = z.object({
	name: z.string().trim().min(1, "Название обязательно"),
	slug: z
		.string()
		.trim()
		.min(1, "Slug обязателен")
		.regex(
			/^[a-z0-9-]+$/,
			"Slug может содержать только латинские буквы, цифры и дефис"
		),
	icon: z.string().trim().optional(),
	category: z.string().min(1, "Выберите категорию"),
	website: z.string().url("Некорректный URL").or(z.literal("")),
	order: z.number().int().min(0),
	isActive: z.boolean(),
});