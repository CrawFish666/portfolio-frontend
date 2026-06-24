import { Link } from "react-router-dom";

export function SocialLink({ item }) {
	const Icon = item.iconComponent;
	const iconClassName = "w-5 h-5";
	const baseClassName = "p-2.5 rounded-xl glass text-dark-400 hover:text-white transition-colors";

	return (
		item.isExternal ?
			<a key={item.path}
				href={item.path}
				rel="noopener noreferrer"
				className={baseClassName}>
				<Icon className={iconClassName} />
			</a> :
			<Link key={item.path}
				to={item.path}
				className={baseClassName}>
				<Icon className={iconClassName} />
			</Link>
	)
}