import { Link } from "react-router-dom";

export function SocialLink({ item, customSize }) {
	const Icon = item.iconComponent;
	// const iconClassName = `w-${h} h-${h}`;
	const baseClassName = "p-2.5 rounded-xl glass text-dark-400 hover:text-white transition-colors";
	const size = customSize ?? item.size ?? 20;

	return (
		item.isExternal ?
			<a
				href={item.path}
				rel="noopener noreferrer"
				target="_blank"
				className={baseClassName}>
				<Icon style={{ width: size, height: size }} />
			</a> :
			<Link
				to={item.path}
				className={baseClassName}>
				<Icon style={{ width: size, height: size }} />
			</Link>
	)
}