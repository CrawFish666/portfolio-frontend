const CHANNEL_NAME = "auth";

const channel = typeof window !== "undefined" && "BroadcastChannel" in window
		? new BroadcastChannel(CHANNEL_NAME)
		: null;

export const authChannel = {
	emit(event, data) {
		channel?.postMessage({ event, data });
	},

	subscribe(callback) {
		if (!channel) return () => { };

		const handler = (message) => {
			callback(message.data.event, message.data.data);
		};

		channel.addEventListener("message", handler);

		return () => {
			channel.removeEventListener("message", handler);
		};
	},

	close() {
		channel?.close();
	},
};