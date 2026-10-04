import {
	beforeEach,
	describe,
	expect,
	it,
	vi,
} from "vitest";

const { authChannelMock, tokenManagerMock } = vi.hoisted(() => ({
	authChannelMock: {
		emit: vi.fn(),
		subscribe: vi.fn(),
	},

	tokenManagerMock: {
		setToken: vi.fn(),
		clearToken: vi.fn(),
	},
}));

vi.mock("./auth.channel", () => ({
	authChannel: authChannelMock,
}));

vi.mock("./token.manager", () => ({
	tokenManager: tokenManagerMock,
}));

import { authEvents } from "./auth.events";

const channelListener =
	authChannelMock.subscribe.mock.calls[0][0];

describe("События авторизации", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("Подписка на события", () => {
		it("вызывает подписчика при emit", () => {
			const listener = vi.fn();

			authEvents.subscribe(listener);

			authEvents.emit("TEST_EVENT", "data");

			expect(listener).toHaveBeenCalledWith(
				"TEST_EVENT",
				"data"
			);
		});

		it("поддерживает несколько подписчиков", () => {
			const firstListener = vi.fn();
			const secondListener = vi.fn();

			authEvents.subscribe(firstListener);
			authEvents.subscribe(secondListener);

			authEvents.emit("TEST_EVENT", "data");

			expect(firstListener).toHaveBeenCalledWith(
				"TEST_EVENT",
				"data"
			);

			expect(secondListener).toHaveBeenCalledWith(
				"TEST_EVENT",
				"data"
			);
		});

		it("перестаёт вызывать подписчика после отписки", () => {
			const listener = vi.fn();

			const unsubscribe = authEvents.subscribe(listener);

			unsubscribe();

			authEvents.emit("TEST_EVENT", "data");

			expect(listener).not.toHaveBeenCalled();
		});
	});

	describe("Событие TOKEN_UPDATED", () => {
		it("сохраняет новый токен через tokenManager", () => {
			authEvents.emit("TOKEN_UPDATED", "new-token");

			expect(tokenManagerMock.setToken)
				.toHaveBeenCalledWith("new-token");
		});

		it("передаёт событие в authChannel", () => {
			authEvents.emit("TOKEN_UPDATED", "new-token");

			expect(authChannelMock.emit)
				.toHaveBeenCalledWith(
					"TOKEN_UPDATED",
					"new-token"
				);
		});

		it("уведомляет подписчиков о новом токене", () => {
			const listener = vi.fn();

			authEvents.subscribe(listener);

			authEvents.emit("TOKEN_UPDATED", "new-token");

			expect(listener).toHaveBeenCalledWith(
				"TOKEN_UPDATED",
				"new-token"
			);
		});
	});

	describe("Событие LOGOUT", () => {
		it("очищает токен через tokenManager", () => {
			authEvents.emit("LOGOUT");

			expect(tokenManagerMock.clearToken)
				.toHaveBeenCalled();
		});

		it("передаёт событие выхода в authChannel", () => {
			authEvents.emit("LOGOUT");

			expect(authChannelMock.emit)
				.toHaveBeenCalledWith(
					"LOGOUT",
					undefined
				);
		});

		it("уведомляет подписчиков о выходе", () => {
			const listener = vi.fn();

			authEvents.subscribe(listener);

			authEvents.emit("LOGOUT");

			expect(listener).toHaveBeenCalledWith(
				"LOGOUT",
				undefined
			);
		});
	});

	describe("События от других вкладок", () => {
		it("сохраняет токен, полученный через authChannel", () => {
			channelListener(
				"TOKEN_UPDATED",
				"other-tab-token"
			);

			expect(tokenManagerMock.setToken)
				.toHaveBeenCalledWith("other-tab-token");
		});

		it("очищает токен при LOGOUT из другой вкладки", () => {
			channelListener("LOGOUT");

			expect(tokenManagerMock.clearToken)
				.toHaveBeenCalled();
		});

		it("уведомляет подписчиков о событии из другой вкладки", () => {
			const listener = vi.fn();

			authEvents.subscribe(listener);

			channelListener(
				"TOKEN_UPDATED",
				"other-tab-token"
			);

			expect(listener).toHaveBeenCalledWith(
				"TOKEN_UPDATED",
				"other-tab-token"
			);
		});
	});
});