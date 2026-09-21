export class ApiError extends Error {
	constructor({ message, code, status, fieldErrors }) {
		super(message);
		this.name = "ApiError";
		this.code = code;
		this.status = status;
		this.fieldErrors = fieldErrors ?? null;
	}
}

export function normalizeError(error) {
	if (!error.response) {
		return new ApiError({
			message: "Не удалось связаться с сервером. Проверьте подключение.",
			code: "NETWORK_ERROR",
			status: null,
		});
	}

	const { status, data } = error.response;
	const details = data?.error?.details;

	// details с бэка — массив [{field, message}], у реакт хук форм setError
	// удобнее закидывать объектом {field: message}, делаем конвертацию
	const fieldErrors = Array.isArray(details)
		? details.reduce((acc, { field, message }) => {
			if (field) acc[field] = message;
			return acc;
		}, {})
		: null;

	return new ApiError({
		message: data?.message || "Что-то пошло не так",
		code: data?.error?.code || "UNKNOWN_ERROR",
		status,
		fieldErrors
	});
}