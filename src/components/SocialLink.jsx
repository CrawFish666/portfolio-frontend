import { Link } from "react-router-dom";

export function SocialLink({ item, customSize }) {
	const Icon = item.iconComponent;
	// const iconClassName = `w-${h} h-${h}`;
	const baseClassName = "p-2.5 rounded-xl glass text-dark-400 hover:text-white transition-colors";
	const size = customSize ?? item.size ?? 20;

	return (
		item.isExternal ?
			<a key={item.path}
				href={item.path}
				rel="noopener noreferrer"
				className={baseClassName}>
				<Icon style={{ width: size, height: size }} />
			</a> :
			<Link key={item.path}
				to={item.path}
				className={baseClassName}>
				<Icon style={{ width: size, height: size }} />
			</Link>
	)
}