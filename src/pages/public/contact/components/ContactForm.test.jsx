import {
	afterEach,
	describe,
	expect,
	it,
	vi,
} from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ContactForm } from "./ContactForm";

const { mutateMock, toastSuccessMock, mockState } = vi.hoisted(() => ({
	mutateMock: vi.fn(),
	toastSuccessMock: vi.fn(),
	mockState: {
		isPending: false,
	},
}));

vi.mock("../../../../hooks/mutations/useFeedbackMutations", () => ({
	useFeedbackMutations: () => ({
		send: {
			mutate: (data, options) => {
				mutateMock(data, options);
				options?.onSuccess?.();
			},
			get isPending() {
				return mockState.isPending;
			},
		},
	}),
}));

vi.mock("sonner", () => ({
	toast: {
		success: toastSuccessMock,
	},
}));

afterEach(() => {
	mockState.isPending = false;
	mutateMock.mockClear();
	toastSuccessMock.mockClear();
});

describe("ContactForm", () => {
	it("рендерит форму и основные поля", () => {
		render(<ContactForm />);

		expect(
			screen.getByRole("heading", {
				name: "Отправить сообщение",
			})
		).toBeInTheDocument();

		expect(
			screen.getByRole("textbox", {
				name: "Имя",
			})
		).toBeInTheDocument();

		expect(
			screen.getByRole("textbox", {
				name: "Email",
			})
		).toBeInTheDocument();

		expect(
			screen.getByRole("textbox", {
				name: "Тема",
			})
		).toBeInTheDocument();

		expect(
			screen.getByRole("textbox", {
				name: "Сообщение",
			})
		).toBeInTheDocument();

		expect(
			screen.getByRole("button", {
				name: "Отправить сообщение",
			})
		).toBeInTheDocument();
	});

	it("делает кнопку отправки недоступной изначально", () => {
		render(<ContactForm />);

		expect(
			screen.getByRole("button", {
				name: "Отправить сообщение",
			})
		).toBeDisabled();
	});

	it("показывает ошибку валидации при некорректном имени", async () => {
		const user = userEvent.setup();

		render(<ContactForm />);

		const nameInput = screen.getByRole("textbox", {
			name: "Имя",
		});

		await user.type(nameInput, "И");
		await user.tab();

		expect(
			await screen.findByText("Минимум 2 символа")
		).toBeInTheDocument();

		expect(mutateMock).not.toHaveBeenCalled();
	});

	it("отправляет валидные данные", async () => {
		const user = userEvent.setup();

		render(<ContactForm />);

		await user.type(
			screen.getByRole("textbox", { name: "Имя" }),
			"Емельян"
		);

		await user.type(
			screen.getByRole("textbox", { name: "Email" }),
			"test@example.com"
		);

		await user.type(
			screen.getByRole("textbox", { name: "Тема" }),
			"Тестовая тема"
		);

		await user.type(
			screen.getByRole("textbox", { name: "Сообщение" }),
			"Тестовое сообщение"
		);

		await user.click(
			screen.getByRole("button", {
				name: "Отправить сообщение",
			})
		);

		expect(mutateMock).toHaveBeenCalledTimes(1);

		expect(mutateMock).toHaveBeenCalledWith(
			expect.objectContaining({
				name: "Емельян",
				email: "test@example.com",
				subject: "Тестовая тема",
				message: "Тестовое сообщение",
				website: "",
				formOpenedAt: expect.any(Number),
			}),
			expect.any(Object)
		);
	});

	it("блокирует кнопку и показывает загрузку во время отправки", async () => {
		const user = userEvent.setup();

		mockState.isPending = true;

		render(<ContactForm />);

		const nameInput = screen.getByRole("textbox", {
			name: "Имя",
		});

		await user.type(nameInput, "Емельян");

		const button = screen.getByRole("button");

		expect(button).toBeDisabled();

		expect(button).not.toHaveTextContent(
			"Отправить сообщение"
		);

		mockState.isPending = false;
	});

	it("показывает уведомление и очищает форму после успешной отправки", async () => {
		const user = userEvent.setup();

		render(<ContactForm />);

		const nameInput = screen.getByRole("textbox", {
			name: "Имя",
		});

		const emailInput = screen.getByRole("textbox", {
			name: "Email",
		});

		const subjectInput = screen.getByRole("textbox", {
			name: "Тема",
		});

		const messageInput = screen.getByRole("textbox", {
			name: "Сообщение",
		});

		await user.type(nameInput, "Емельян");
		await user.type(emailInput, "test@example.com");
		await user.type(subjectInput, "Тестовая тема");
		await user.type(messageInput, "Тестовое сообщение");

		await user.click(
			screen.getByRole("button", {
				name: "Отправить сообщение",
			})
		);

		expect(toastSuccessMock).toHaveBeenCalledWith(
			"Сообщение успешно отправлено"
		);

		expect(nameInput).toHaveValue("");
		expect(emailInput).toHaveValue("");
		expect(subjectInput).toHaveValue("");
		expect(messageInput).toHaveValue("");
	});
});