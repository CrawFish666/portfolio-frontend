const listeners = new Set();

export const authEvents = {

	// Подписка на событие
	subscribe(callback) {
		listeners.add(callback);

		return () => {
			listeners.delete(callback);
		}
	},

	// Отправка события всем кто подписан
	emit(event, data) {
		listeners.forEach((callback) => {
			callback(event, data);
		})
	}
}