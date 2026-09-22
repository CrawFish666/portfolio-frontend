export const formatMonthYear = (date) => {
	if (!date) return "";

	const parsedDate = new Date(date);

	if (Number.isNaN(parsedDate.getTime())) {
		return "";
	}

	const parts = new Intl.DateTimeFormat("ru-RU", {
		month: "short",
		year: "numeric",
	}).formatToParts(parsedDate);

	const month = parts.find(part => part.type === "month")?.value;
	const year = parts.find(part => part.type === "year")?.value;

	return `${month} ${year}`;
};