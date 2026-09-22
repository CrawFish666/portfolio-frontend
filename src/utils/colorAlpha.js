export function withAlpha(hexColor, alphaHex, fallback = "#10b981") {
	const isValidHex = /^#[0-9a-fA-F]{6}$/.test(hexColor);
	const color = isValidHex ? hexColor : fallback;
	return `${color}${alphaHex}`;
}