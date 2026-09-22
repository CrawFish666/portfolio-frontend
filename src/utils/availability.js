export const AVAILABILITY_LABELS = {
	open: "Открыт к предложениям",
	busy: "Занят, но рассматриваю предложения",
	not_available: "Сейчас не рассматриваю предложения"
};

export const getAvailabilityLabel = (code) => {
	if (!code) return "";
	return AVAILABILITY_LABELS[code] ?? "Неизвестно";
};