import { Link } from "react-router-dom";
import { iconMap, defaultIcon } from "../constants/iconMap";

export function SocialLink({ item, customSize }) {
	const Icon = iconMap[item.icon] ?? defaultIcon;

	if (!iconMap[item.icon]) {
		console.warn(
			`Не найдена иконка "${item.icon}" для контакта "${item.label}"`
		);
	}
	const baseClassName = "p-2.5 rounded-xl glass text-secondary hover:text-primary hover:scale-110 transition-colors";
	const size = customSize ?? item.size ?? 20;

	const getHref = () => {
		switch (item.type) {
			case "email":
				return `mailto:${item.url}`;
			case "tel":
				return `tel:${item.url}`;
		
			default:
				return item.url;
		}}
	const href = getHref();

	// Внутренняя ссылка
	if (!item.isExternal) {
		return (
			<Link
				to={href}
				className={baseClassName}
			>
				<Icon style={{ width: size, height: size }} />
			</Link>
		);
	}

	return (
		<a
			href={href}
			target={item.isExternal ? "_blank" : undefined}
			rel={item.isExternal ? "noopener noreferrer" : undefined}
			className={baseClassName}>
			<Icon style={{ width: size, height: size }} />
		</a>
	)
}