import { z } from "zod";

const optionalUrlSchema = z
	.string()
	.trim()
	.url("Неверный формат ссылки")
	.optional()
	.or(z.literal(""));

const statusSchema = z.string().trim().min(1, "Статус обязателен");

// tech: если пришла строка → разбиваем в массив. Если уже массив → оставляем
const techSchema = z
	.string()
	.array()
	.or(
		z.string().transform((val) => {
			if (!val || val.trim() === "") return [];
			return val
				.split(",")
				.map((t) => t.trim())
				.filter((t) => t.length > 0);
		})
	);

export const projectSchema = z.object({
	title: z.string().trim().min(1, "Название проекта обязательно").max(100, "Название не может быть длиннее 100 символов"),
	slug: z.string().trim().min(1, "Slug обязателен").regex(/^[a-z0-9-]+$/, "Slug может содержать только латинские буквы, цифры и дефис"),
	liveDemo_url: optionalUrlSchema,
	is_public: z.boolean(),
	status: statusSchema,
	short_description: z.string().trim().max(200, "Краткое описание не может быть длиннее 200 символов").optional(),
	full_description: z.string().trim().optional(),
	tech: techSchema,
	image_url: optionalUrlSchema,
	source_url: optionalUrlSchema,
	favorite: z.boolean(),
})

