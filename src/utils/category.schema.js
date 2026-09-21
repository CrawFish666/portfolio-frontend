import { z } from "zod";

export const categorySchema = z.object({
	name: z
		.string()
		.trim()
		.min(1, "Название категории обязательно")
		.max(50, "Название не может быть длиннее 50 символов"),

	slug: z
		.string()
		.trim()
		.min(1, "Slug обязателен")
		.regex(
			/^[a-z0-9-]+$/,
			"Slug может содержать только латинские буквы, цифры и дефис"
		),

	color: z
		.string()
		.trim()
		.min(1, "Цвет обязателен"),

	icon: z
		.string()
		.trim(),

	order: z.coerce
		.number({
			invalid_type_error: "Порядок должен быть числом",
		})
		.int("Порядок должен быть целым числом")
		.min(0, "Порядок не может быть отрицательным"),

	isActive: z.boolean(),
});