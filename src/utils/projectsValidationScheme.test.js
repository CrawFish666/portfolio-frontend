import { describe, expect, it } from "vitest";
import { projectSchema } from "./projectsValidationScheme";

describe("Схема валидации проекта", () => {
	const validProject = {
		title: "Мой проект",
		slug: "my-project",
		liveDemo_url: "https://example.com",
		is_public: true,
		status: "completed",
		short_description: "Краткое описание проекта",
		full_description: "Полное описание проекта",
		tech: ["React", "TypeScript"],
		image: null,
		source_url: "https://github.com/example/project",
		favorite: false,
	};

	describe("Корректные данные", () => {
		it("принимает корректный проект", () => {
			expect(projectSchema.safeParse(validProject).success).toBe(true);
		});

		it("принимает проект без необязательных ссылок", () => {
			const project = {
				...validProject,
				liveDemo_url: "",
				source_url: "",
			};

			expect(projectSchema.safeParse(project).success).toBe(true);
		});

		it("принимает tech в виде строки", () => {
			const project = {
				...validProject,
				tech: "React, TypeScript, Vite",
			};

			expect(projectSchema.safeParse(project).success).toBe(true);
		});

		it("принимает пустую строку tech", () => {
			const project = {
				...validProject,
				tech: "",
			};

			expect(projectSchema.safeParse(project).success).toBe(true);
		});

		it("принимает отсутствие изображения", () => {
			const project = {
				...validProject,
				image: undefined,
			};

			expect(projectSchema.safeParse(project).success).toBe(true);
		});
	});

	describe("Название проекта", () => {
		it("отклоняет пустое название", () => {
			const project = {
				...validProject,
				title: "",
			};

			expect(projectSchema.safeParse(project).success).toBe(false);
		});

		it("отклоняет название длиннее 100 символов", () => {
			const project = {
				...validProject,
				title: "а".repeat(101),
			};

			expect(projectSchema.safeParse(project).success).toBe(false);
		});
	});

	describe("Slug", () => {
		it("принимает slug из латинских букв, цифр и дефиса", () => {
			const project = {
				...validProject,
				slug: "my-project-123",
			};

			expect(projectSchema.safeParse(project).success).toBe(true);
		});

		it("отклоняет пустой slug", () => {
			const project = {
				...validProject,
				slug: "",
			};

			expect(projectSchema.safeParse(project).success).toBe(false);
		});

		it("отклоняет slug с заглавными буквами", () => {
			const project = {
				...validProject,
				slug: "My-project",
			};

			expect(projectSchema.safeParse(project).success).toBe(false);
		});

		it("отклоняет slug с недопустимыми символами", () => {
			const project = {
				...validProject,
				slug: "my_project",
			};

			expect(projectSchema.safeParse(project).success).toBe(false);
		});
	});

	describe("Ссылки", () => {
		it("отклоняет некорректную ссылку на демо", () => {
			const project = {
				...validProject,
				liveDemo_url: "not-a-url",
			};

			expect(projectSchema.safeParse(project).success).toBe(false);
		});

		it("отклоняет некорректную ссылку на исходный код", () => {
			const project = {
				...validProject,
				source_url: "not-a-url",
			};

			expect(projectSchema.safeParse(project).success).toBe(false);
		});
	});

	describe("Статус", () => {
		it("отклоняет пустой статус", () => {
			const project = {
				...validProject,
				status: "",
			};

			expect(projectSchema.safeParse(project).success).toBe(false);
		});

		it("отклоняет статус, состоящий только из пробелов", () => {
			const project = {
				...validProject,
				status: "   ",
			};

			expect(projectSchema.safeParse(project).success).toBe(false);
		});
	});

	describe("Краткое описание", () => {
		it("принимает отсутствие краткого описания", () => {
			const { short_description, ...project } = validProject;

			expect(projectSchema.safeParse(project).success).toBe(true);
		});

		it("отклоняет краткое описание длиннее 200 символов", () => {
			const project = {
				...validProject,
				short_description: "а".repeat(201),
			};

			expect(projectSchema.safeParse(project).success).toBe(false);
		});
	});

	describe("Полное описание", () => {
		it("принимает отсутствие полного описания", () => {
			const { full_description, ...project } = validProject;

			expect(projectSchema.safeParse(project).success).toBe(true);
		});

		it("принимает пустое полное описание", () => {
			const project = {
				...validProject,
				full_description: "",
			};

			expect(projectSchema.safeParse(project).success).toBe(true);
		});
	});

	describe("Технологии", () => {
		it("принимает массив технологий", () => {
			const project = {
				...validProject,
				tech: ["React", "TypeScript", "Vite"],
			};

			expect(projectSchema.safeParse(project).success).toBe(true);
		});

		it("преобразует строку технологий в массив", () => {
			const project = {
				...validProject,
				tech: "React, TypeScript, Vite",
			};

			const result = projectSchema.safeParse(project);

			expect(result.success).toBe(true);
			expect(result.data.tech).toEqual([
				"React",
				"TypeScript",
				"Vite",
			]);
		});

		it("удаляет пробелы вокруг технологий", () => {
			const project = {
				...validProject,
				tech: "React, TypeScript , Vite",
			};

			const result = projectSchema.safeParse(project);

			expect(result.success).toBe(true);
			expect(result.data.tech).toEqual([
				"React",
				"TypeScript",
				"Vite",
			]);
		});

		it("удаляет пустые значения из строки технологий", () => {
			const project = {
				...validProject,
				tech: "React, , TypeScript, ",
			};

			const result = projectSchema.safeParse(project);

			expect(result.success).toBe(true);
			expect(result.data.tech).toEqual([
				"React",
				"TypeScript",
			]);
		});

		it("преобразует пустую строку технологий в пустой массив", () => {
			const project = {
				...validProject,
				tech: "",
			};

			const result = projectSchema.safeParse(project);

			expect(result.success).toBe(true);
			expect(result.data.tech).toEqual([]);
		});
	});

	describe("Изображение", () => {
		it("принимает отсутствие изображения", () => {
			const project = {
				...validProject,
				image: undefined,
			};

			expect(projectSchema.safeParse(project).success).toBe(true);
		});

		it("принимает null вместо изображения", () => {
			const project = {
				...validProject,
				image: null,
			};

			expect(projectSchema.safeParse(project).success).toBe(true);
		});

		it("принимает JPG изображение", () => {
			const project = {
				...validProject,
				image: new File(["image"], "image.jpg", {
					type: "image/jpeg",
				}),
			};

			expect(projectSchema.safeParse(project).success).toBe(true);
		});

		it("отклоняет неподдерживаемый формат изображения", () => {
			const project = {
				...validProject,
				image: new File(["image"], "image.svg", {
					type: "image/svg+xml",
				}),
			};

			expect(projectSchema.safeParse(project).success).toBe(false);
		});

		it("отклоняет изображение размером больше 10 МБ", () => {
			const project = {
				...validProject,
				image: new File(
					[new Uint8Array(10 * 1024 * 1024 + 1)],
					"image.jpg",
					{
						type: "image/jpeg",
					}
				),
			};

			expect(projectSchema.safeParse(project).success).toBe(false);
		});
	});

	describe("Булевы поля", () => {
		it("отклоняет строку вместо is_public", () => {
			const project = {
				...validProject,
				is_public: "true",
			};

			expect(projectSchema.safeParse(project).success).toBe(false);
		});

		it("отклоняет строку вместо favorite", () => {
			const project = {
				...validProject,
				favorite: "false",
			};

			expect(projectSchema.safeParse(project).success).toBe(false);
		});
	});
});