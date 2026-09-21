export function Skeleton({ className = "", ...rest }) {
	return (
		<div className={`shimmer ${className}`} {...rest} />
	);
}